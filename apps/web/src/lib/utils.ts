import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

export function isLowPowerDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  const cores = navigator.hardwareConcurrency || 4;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Consider low power if less than 4 cores or user prefers reduced motion
  return cores < 4 || prefersReducedMotion;
}

export function getPerformanceLevel(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'medium';

  if (!isWebGLAvailable()) return 'low';

  const cores = navigator.hardwareConcurrency || 4;

  // Try to get GPU info
  let gpuTier = 'unknown';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        gpuTier = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    }
  } catch (e) {
    // Ignore errors
  }

  // Check for mobile or low-end indicators
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return 'low';
  if (isMobile || cores < 4) return 'low';
  if (cores < 8) return 'medium';

  return 'high';
}

export function formatConfidence(confidence: string): { label: string; className: string } {
  switch (confidence.toLowerCase()) {
    case 'high':
      return { label: 'High Confidence', className: 'badge-high' };
    case 'medium':
      return { label: 'Medium Confidence', className: 'badge-medium' };
    case 'low':
      return { label: 'Low Confidence', className: 'badge-low' };
    default:
      return { label: confidence, className: 'badge-medium' };
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
