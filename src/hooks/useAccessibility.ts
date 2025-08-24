import { useState, useEffect } from 'react';
import type { ExecutionSpeed } from '@/types/execution';

export type Theme = 'default' | 'hc' | 'soft';

export interface AccessibilitySettings {
  theme: Theme;
  reducedMotion: boolean;
  largeText: boolean;
  previewPath: boolean;
  executionSpeed: ExecutionSpeed;
}

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fallback to defaults if parsing fails
        }
      }
    }
    
    return {
      theme: 'default',
      reducedMotion: false,
      largeText: false,
      previewPath: false,
      executionSpeed: 'medium',
    };
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    }
  }, [settings]);

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes first
    root.classList.remove('hc', 'soft');
    
    // Apply current theme
    if (settings.theme !== 'default') {
      root.classList.add(settings.theme);
    }
    
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
  }, [settings]);

  const updateSettings = (updates: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const setTheme = (theme: Theme) => {
    updateSettings({ theme });
  };

  const toggleReducedMotion = () => {
    updateSettings({ reducedMotion: !settings.reducedMotion });
  };

  const toggleLargeText = () => {
    updateSettings({ largeText: !settings.largeText });
  };

  const togglePreviewPath = () => {
    updateSettings({ previewPath: !settings.previewPath });
  };

  const setExecutionSpeed = (speed: ExecutionSpeed) => {
    updateSettings({ executionSpeed: speed });
  };

  return {
    settings,
    updateSettings,
    setTheme,
    toggleReducedMotion,
    toggleLargeText,
    togglePreviewPath,
    setExecutionSpeed,
  };
}

