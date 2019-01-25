import { Injectable } from '@angular/core';

export const darkTheme = {
  'primary-color': '#9c27b0',
  'background-color': '#303030',
  'secondary-color': '#262626',
  'text-color': '#fff'
};

export const lightTheme = {
  'primary-color': '#3f51b5',
  'background-color': '#fafafa',
  'secondary-color': '#f2f2f2',
  'text-color': '#2d2d2d'
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this.init();
  }

  init() {
    const _theme = localStorage.getItem('theme');
    switch (_theme) {
      case 'dark': this.setDarkTheme(); break;
      case 'light': this.setLightTheme(); break;
      default: this.setLightTheme();
    }
  }

  setDarkTheme() {
    localStorage.setItem('theme', 'dark');
    this.setTheme(darkTheme);
  }

  setLightTheme() {
    localStorage.setItem('theme', 'light');
    this.setTheme(lightTheme);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
