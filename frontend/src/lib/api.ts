import type { Member } from "@/data/members";
import { members as localMembers } from "@/data/members";
import type { Event } from "@/data/events";
import { events as localEvents } from "@/data/events";
import type { FundedProject, PhDProject, StudentProject } from "@/data/projects";
import { fundedProjects as localFunded, phdProjects as localPhd, studentProjects as localStudent } from "@/data/projects";
import type { Publication } from "@/data/publications";
import { publications as localPublications } from "@/data/publications";
import type { Device } from "@/data/devices";
import { devices as localDevices } from "@/data/devices";
import type { GalleryItem } from "@/data/gallery";
import { galleryItems as localGallery } from "@/data/gallery";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
const PAGE_SIZE = 200;

interface StrapiMedia {
  id: number;
  url: string;
  [key: string]: unknown;
}

interface StrapiResponseItem {
  id: number;
  documentId: string;
  [key: string]: unknown;
}

interface StrapiResponse {
  data: StrapiResponseItem[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

function extractMediaUrl(media: unknown): string | null {
  if (!media) return null;
  if (typeof media === "string") return media;
  if (typeof media === "object" && media !== null) {
    const m = media as StrapiMedia;
    if (m.url) return m.url.startsWith("http") ? m.url : `${STRAPI_URL}${m.url}`;
  }
  return null;
}

function extractMediaUrls(media: unknown): string[] {
  if (!media) return [];
  if (Array.isArray(media)) {
    return media.map((m) => extractMediaUrl(m)).filter(Boolean) as string[];
  }
  const url = extractMediaUrl(media);
  return url ? [url] : [];
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

function findLocalMember(name: string): Member | undefined {
  const norm = normalizeName(name);
  return localMembers.find((m) => {
    if (normalizeName(m.name) === norm) return true;
    const parts = m.name.split(" ").filter(Boolean);
    const firstTwo = parts.slice(0, 2).join(" ");
    if (firstTwo && normalizeName(firstTwo) === norm) return true;
    return false;
  });
}

function findLocalEvent(title: string): Event | undefined {
  return localEvents.find((e) => normalizeName(e.title) === normalizeName(title));
}

function findLocalProject(title: string): FundedProject | PhDProject | StudentProject | undefined {
  const norm = normalizeName(title);
  return [...localFunded, ...localPhd, ...localStudent].find((p) => {
    const t = "title" in p ? p.title : ("thesisTitle" in p ? p.thesisTitle : "");
    return normalizeName(t) === norm;
  });
}

function findLocalDevice(name: string): Device | undefined {
  return localDevices.find((d) => normalizeName(d.name) === normalizeName(name));
}

function findLocalGalleryItem(title: string): GalleryItem | undefined {
  return localGallery.find((g) => normalizeName(g.title) === normalizeName(title));
}

function mapMember(item: StrapiResponseItem): Member {
  const strapiPhoto = extractMediaUrl(item.photo);
  const local = findLocalMember(item.name as string);
  return {
    id: String(item.id),
    name: item.name as string,
    photo: strapiPhoto || local?.photo || "/placeholder.svg",
    imagePosition: (item.imagePosition as string) || local?.imagePosition,
    designation: (item.designation as string) || "",
    qualification: (item.qualification as string) || "",
    department: (item.department as string) || "",
    category: item.category as Member["category"],
    group: (item.group as Member["group"]) || "team",
    bio: (item.bio as string) || "",
    email: (item.email as string) || "",
    linkedin: (item.linkedin as string) || local?.linkedin,
    staticId: local?.id,
  };
}

function mapEvent(item: StrapiResponseItem): Event {
  const local = findLocalEvent(item.title as string);
  return {
    id: String(item.id),
    title: item.title as string,
    type: (item.eventType as Event["type"]) || local?.type || "Other",
    date: item.date as string,
    venue: (item.venue as string) || "",
    description: (item.description as string) || "",
    poster: extractMediaUrl(item.poster) || local?.poster || "",
    isUpcoming: (item.isUpcoming as boolean) ?? true,
  };
}

function mapProject(item: StrapiResponseItem): FundedProject | PhDProject | StudentProject {
  const projectType = item.projectType as string;
  const base = { id: String(item.id) };

  if (projectType === "Funded") {
    return {
      ...base,
      title: item.title as string,
      fundingAgency: (item.fundingAgency as string) || "",
      pi: (item.pi as string) || "",
      coPi: (item.coPi as string) || "",
      duration: (item.duration as string) || "",
      amount: (item.amount as string) || "",
      status: (item.status as FundedProject["status"]) || "Ongoing",
      description: (item.description as string) || "",
    } as FundedProject;
  }
  if (projectType === "PhD") {
    return {
      ...base,
      studentName: (item.studentName as string) || "",
      thesisTitle: (item.thesisTitle as string) || "",
      guide: (item.guide as string) || "",
      coGuide: (item.coGuide as string) || undefined,
      registrationYear: (item.registrationYear as string) || "",
      status: (item.status as PhDProject["status"]) || "Ongoing",
    } as PhDProject;
  }
  return {
    ...base,
    title: (item.title as string) || "",
    studentNames: (item.studentNames as string) || "",
    guide: (item.guide as string) || "",
    year: (item.registrationYear as string) || "",
    category: (item.studentCategory as StudentProject["category"]) || "PG",
    status: (item.status as StudentProject["status"]) || "Ongoing",
  } as StudentProject;
}

function mapPublication(item: StrapiResponseItem): Publication {
  return {
    id: String(item.id),
    title: item.title as string,
    authors: item.authors as string,
    journal: (item.journal as string) || "",
    year: item.year as number,
    type: (item.publicationType as Publication["type"]) || "Journal",
    category: (item.category as Publication["category"]) || "Article",
    doi: (item.doi as string) || "",
    link: (item.link as string) || "",
  };
}

function mapDevice(item: StrapiResponseItem): Device {
  const local = findLocalDevice(item.name as string);
  return {
    id: String(item.id),
    name: item.name as string,
    image: extractMediaUrl(item.image) || local?.image || "",
    description: (item.description as string) || "",
    specifications: (item.specifications as string) || "",
    status: (item.status as Device["status"]) || "Operational",
    location: (item.location as string) || "",
    contactPerson: (item.contactPerson as string) || "",
  };
}

function mapGalleryItem(item: StrapiResponseItem): GalleryItem {
  const strapiImages = extractMediaUrls(item.images);
  const local = findLocalGalleryItem(item.title as string);
  const images = strapiImages.length > 0
    ? strapiImages
    : local?.images
      ? local.images
      : local?.image
        ? [local.image]
        : [];
  return {
    id: String(item.id),
    title: item.title as string,
    image: images[0] || "/placeholder.svg",
    images: images.length > 1 ? images : undefined,
    category: item.category as GalleryItem["category"],
    description: (item.description as string) || "",
    videoEmbed: (item.videoEmbed as string) || local?.videoEmbed,
  };
}

let strapiError = false;

async function fetchAPI<T>(path: string, mapper: (item: StrapiResponseItem) => T): Promise<T[]> {
  const separator = path.includes("?") ? "&" : "?";
  const populate = path.includes("populate") ? "" : "&populate=*";
  const url = `${STRAPI_URL}/api${path}${separator}pagination[pageSize]=${PAGE_SIZE}${populate}`;
  const headers: HeadersInit = { "Content-Type": "application/json" };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const res = await fetch(url, { headers, next: { revalidate: 60 } });
    if (!res.ok) {
      console.error(`Strapi API error: ${res.status} ${res.statusText} for ${url}`);
      strapiError = true;
      return [];
    }
    strapiError = false;
    const json: StrapiResponse = await res.json();
    return (json.data || []).map(mapper);
  } catch (e) {
    console.error(`Strapi fetch failed for ${url}:`, e);
    strapiError = true;
    return [];
  }
}

export async function getMembers(): Promise<Member[]> {
  const data = await fetchAPI("/members?sort=order:asc", mapMember);
  if (data.length === 0 && strapiError) return localMembers;
  return data;
}

export async function getProjects(
  type?: string
): Promise<(FundedProject | PhDProject | StudentProject)[]> {
  let query = "/projects";
  if (type) query += `?filters[projectType][$eq]=${type}`;
  const data = await fetchAPI(query, mapProject);
  if (data.length === 0 && strapiError) return [...localFunded, ...localPhd, ...localStudent];
  return data;
}

export async function getAllProjects(): Promise<{
  fundedProjects: FundedProject[];
  phdProjects: PhDProject[];
  studentProjects: StudentProject[];
}> {
  const all = await fetchAPI("/projects?sort=id:asc", mapProject);
  if (all.length === 0 && strapiError) {
    return {
      fundedProjects: localFunded,
      phdProjects: localPhd,
      studentProjects: localStudent,
    };
  }
  return {
    fundedProjects: all.filter((p): p is FundedProject => "fundingAgency" in p),
    phdProjects: all.filter((p): p is PhDProject => "studentName" in p),
    studentProjects: all.filter((p): p is StudentProject => "studentNames" in p),
  };
}

export async function getDevices(): Promise<Device[]> {
  const data = await fetchAPI("/devices", mapDevice);
  if (data.length === 0 && strapiError) return localDevices;
  return data;
}

export async function getEvents(): Promise<Event[]> {
  const data = await fetchAPI("/events?sort=date:desc", mapEvent);
  if (data.length === 0 && strapiError) return localEvents;
  return data;
}

export async function getPublications(): Promise<Publication[]> {
  const data = await fetchAPI("/publications?sort=year:desc", mapPublication);
  if (data.length === 0 && strapiError) return localPublications;
  return data;
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const data = await fetchAPI("/gallery-items", mapGalleryItem);
  if (data.length === 0 && strapiError) return localGallery;
  return data;
}

export async function getPageContent(
  section: string
): Promise<{ section: string; title: string; content: string; contentList: string[] } | null> {
  const items = await fetchAPI(`/page-contents?filters[section][$eq]=${section}`, (item) => ({
    section: item.section as string,
    title: (item.title as string) || "",
    content: (item.content as string) || "",
    contentList: (item.contentList as string[]) || [],
  }));
  return items[0] || null;
}
