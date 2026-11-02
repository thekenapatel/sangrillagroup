import noImagePlaceholder from '../assets/no-image.png';
import type { Project } from '../data/allProjects';

/**
 * Standard luxury 'No Image' PNG placeholder for Sangrilla Group.
 */
export const NO_IMAGE_PLACEHOLDER = noImagePlaceholder;

/**
 * Normalizes text for matching by trimming, lowercasing, and replacing hyphens/underscores with spaces.
 */
const normalizeText = (text?: string): string => {
  return (text || '')
    .toLowerCase()
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Checks if a project is a commercial project.
 * All commercial projects must display the No Image cover on cards and have
 * their Photos section completely removed on detail pages.
 */
export const isCommercialProject = (
  project?: Partial<Project> | null
): boolean => {
  if (!project) return false;
  return project.type === 'commercial';
};

const isSangrillaMeredianProject = (
  project?: Partial<Project> | null
): boolean => {
  if (!project) return false;
  return (
    normalizeText(project.id) === 'sangrilla meredian' ||
    normalizeText(project.name) === 'sangrilla meredian'
  );
};

/**
 * Exact set of canonical target residential project IDs for the 7 specified projects:
 * 1. Sangrilla Bungalows
 * 2. Sangrilla Township
 * 3. Sangrilla Society
 * 4. Sangrilla Park
 * 5. Sangrilla Residency
 * 6. Sangrilla Villa
 * 7. Sangrilla Homes
 */
const TARGET_RESIDENTIAL_IDS = new Set([
  'sangrilla-bunglows',
  'sangrilla-bungalows',
  'sangrilla-township',
  'sangrilla-society',
  'sangrilla-park',
  'sangrilla-residency',
  'sangrilla-villa',
  'sangrilla-homes',
]);

const TARGET_RESIDENTIAL_NAMES = [
  'sangrilla bungalows',
  'sangrilla bunglows',
  'sangrilla township',
  'sangrilla society',
  'sangrilla park',
  'sangrilla residency',
  'sangrilla villa',
  'sangrilla homes',
];

/**
 * Target regex patterns matching the 7 residential projects.
 */
const TARGET_RESIDENTIAL_PATTERNS: RegExp[] = [
  /\bsangrilla\s+bung[al]*ows?\b/i,
  /\bsangrilla\s+townships?\b/i,
  /\bsangrilla\s+societ(?:y|ies)\b/i,
  /\bsangrilla\s+parks?\b/i,
  /\bsangrilla\s+residenc(?:y|ies)\b/i,
  /\bsangrilla\s+villas?\b/i,
  /\bsangrilla\s+homes?\b/i,
];

/**
 * Determines whether a residential project is one of the seven specified target projects.
 * Explicitly guards against unrelated projects (e.g. Sangrilla Meadows,
 * Sangrilla Baghban, Neejdham, Sangrilla Meredian).
 */
export const isTargetResidentialProject = (
  project?: Partial<Project> | null
): boolean => {
  if (!project) return false;

  const rawId = project.id || '';
  const rawName = project.name || '';
  const slugId = rawId.toLowerCase().trim().replace(/_/g, '-');
  const normId = normalizeText(rawId);
  const normName = normalizeText(rawName);

  // Strict safety exclusion: Unrelated residential flagship developments
  const isUnrelatedProject =
    normId.includes('meadows') ||
    normName.includes('meadows') ||
    normId.includes('baghban') ||
    normName.includes('baghban') ||
    normId.includes('baghbaan') ||
    normName.includes('baghbaan') ||
    normId.includes('neejdham') ||
    normName.includes('neejdham') ||
    normId.includes('meredian') ||
    normName.includes('meredian') ||
    normId.includes('meridian') ||
    normName.includes('meridian');

  if (isUnrelatedProject) {
    return false;
  }

  // Check ID match
  if (
    TARGET_RESIDENTIAL_IDS.has(slugId) ||
    TARGET_RESIDENTIAL_IDS.has(normId.replace(/\s+/g, '-'))
  ) {
    return true;
  }

  // Check Name exact match
  if (
    TARGET_RESIDENTIAL_NAMES.some(
      (target) => normName === target || normName.startsWith(target)
    )
  ) {
    return true;
  }

  // Check regex patterns against name or id
  if (
    TARGET_RESIDENTIAL_PATTERNS.some(
      (pattern) => pattern.test(normName) || pattern.test(normId)
    )
  ) {
    return true;
  }

  return false;
};

/**
 * Determines whether a project must display the 'No Image' PNG placeholder.
 * Rules:
 * 1. Commercial Projects: All commercial projects use the placeholder.
 * 2. Residential Projects: The 7 specified projects and Sangrilla Meredian use the placeholder.
 * 3. All other projects retain their original images.
 */
export const isProjectUsingPlaceholder = (
  project?: Partial<Project> | null
): boolean => {
  if (!project) return false;

  if (isCommercialProject(project)) {
    return true;
  }

  if (isTargetResidentialProject(project) || isSangrillaMeredianProject(project)) {
    return true;
  }

  return false;
};

/**
 * Determines whether the Photos section should be rendered on a project detail page.
 * Rules:
 * 1. Commercial projects: Photos section is completely removed (returns false).
 * 2. Residential projects: Photos section is rendered (returns true). If it's one of the
 *    7 target projects, the photo gallery is replaced with a single No Image cover component.
 */
export const shouldShowProjectPhotosSection = (
  project?: Partial<Project> | null
): boolean => {
  if (!project) return false;
  if (isCommercialProject(project)) return false;
  return true;
};

/**
 * Helper to safely resolve any image path.
 */
export const resolveProjectImage = (path?: string | null): string => {
  if (!path) return NO_IMAGE_PLACEHOLDER;
  if (
    path.startsWith('http') ||
    path.startsWith('data:') ||
    path.startsWith('/') ||
    path.startsWith('blob:') ||
    path.includes('no-image')
  ) {
    return path;
  }
  try {
    return new URL(`../assets/${path}`, import.meta.url).href;
  } catch {
    return NO_IMAGE_PLACEHOLDER;
  }
};

/**
 * Returns the cover image source for a project.
 * Returns the 'No Image' PNG placeholder if the project requires it.
 */
export const getProjectCoverImage = (
  project?: Partial<Project> | null
): string => {
  if (!project) return NO_IMAGE_PLACEHOLDER;
  if (isProjectUsingPlaceholder(project)) {
    return NO_IMAGE_PLACEHOLDER;
  }
  return project.images && project.images.length > 0
    ? resolveProjectImage(project.images[0])
    : NO_IMAGE_PLACEHOLDER;
};

/**
 * Returns the gallery/photos image array for a project details page.
 */
export const getProjectGalleryImages = (
  project?: Partial<Project> | null
): string[] => {
  if (!project) return [NO_IMAGE_PLACEHOLDER];
  if (isProjectUsingPlaceholder(project)) {
    return [NO_IMAGE_PLACEHOLDER];
  }
  return project.images && project.images.length > 0
    ? project.images.map((img) => resolveProjectImage(img))
    : [NO_IMAGE_PLACEHOLDER];
};
