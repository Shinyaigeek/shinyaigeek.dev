/**
 * Currently, rspack's mini-css-extract-plugin will not output stylesheet file in node target.
 * So we need a file which includes only pages components to extract stylesheets.
 */

import { Layout } from "../ui/components/Layout/Layout";
import { Home } from "../ui/pages/Home/Home";
import { Post } from "../ui/pages/Post/Post";
import { PostIndex } from "../ui/pages/PostIndex/PostIndex";
import { Profile } from "../ui/pages/Profile/Profile";
import { FleetDetail } from "../ui/pages/fleet-detail";
import { FleetIndex } from "../ui/pages/fleet-index";

Layout;
Home;
Post;
Profile;
PostIndex;
FleetDetail;
FleetIndex;

// Theme management
class ThemeManager {
	private theme: "light" | "dark" | "system" = "system";

	constructor() {
		this.init();
	}

	private init() {
		// Load saved theme from localStorage
		const savedTheme = localStorage.getItem("theme") as
			| "light"
			| "dark"
			| "system";
		if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
			this.theme = savedTheme;
		}

		// Apply initial theme
		this.applyTheme();

		// Listen for system theme changes
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", () => {
				if (this.theme === "system") {
					this.applyTheme();
				}
			});

		// Setup theme toggle buttons
		this.setupToggleButtons();
	}

	private applyTheme() {
		const resolvedTheme = this.getResolvedTheme();
		document.documentElement.setAttribute("data-theme", resolvedTheme);

		// Update toggle button icons
		this.updateToggleButtons();
	}

	private getResolvedTheme(): "light" | "dark" {
		if (this.theme === "system") {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		return this.theme;
	}

	private setupToggleButtons() {
		document.addEventListener("click", (event) => {
			const target = event.target as HTMLElement;
			if (
				target.matches("[data-theme-toggle]") ||
				target.closest("[data-theme-toggle]")
			) {
				event.preventDefault();
				this.toggleTheme();
			}
		});
	}

	private updateToggleButtons() {
		const resolvedTheme = this.getResolvedTheme();
		const buttons = document.querySelectorAll("[data-theme-toggle]");

		for (const button of buttons) {
			const iconElement = button.querySelector("[data-theme-icon]");
			if (iconElement) {
				iconElement.textContent = resolvedTheme === "dark" ? "🌙" : "☀️";
			}

			const ariaLabel =
				resolvedTheme === "dark"
					? "Switch to light mode"
					: "Switch to dark mode";
			button.setAttribute("aria-label", ariaLabel);
			button.setAttribute("title", ariaLabel);
		}
	}

	private toggleTheme() {
		if (this.theme === "system") {
			const currentResolved = this.getResolvedTheme();
			this.theme = currentResolved === "dark" ? "light" : "dark";
		} else {
			this.theme = this.theme === "dark" ? "light" : "dark";
		}

		localStorage.setItem("theme", this.theme);
		this.applyTheme();
	}
}

// Mobile menu management
class MobileMenuManager {
	private hamburgerButton: HTMLElement | null = null;
	private mobileMenu: HTMLElement | null = null;
	private isOpen = false;

	constructor() {
		this.init();
	}

	private init() {
		// Find hamburger button and mobile menu using data attributes
		this.hamburgerButton = document.querySelector("[data-hamburger-menu]");
		this.mobileMenu = document.querySelector("[data-mobile-menu]");

		if (!this.hamburgerButton || !this.mobileMenu) {
			return;
		}

		// Setup click handler
		this.hamburgerButton.addEventListener("click", () => {
			this.toggleMenu();
		});

		// Close menu when clicking outside
		document.addEventListener("click", (event) => {
			if (
				this.isOpen &&
				!this.hamburgerButton?.contains(event.target as Node) &&
				!this.mobileMenu?.contains(event.target as Node)
			) {
				this.closeMenu();
			}
		});

		// Close menu on escape key
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && this.isOpen) {
				this.closeMenu();
			}
		});
	}

	private toggleMenu() {
		if (this.isOpen) {
			this.closeMenu();
		} else {
			this.openMenu();
		}
	}

	private openMenu() {
		this.isOpen = true;
		this.hamburgerButton?.classList.add("open");
		this.hamburgerButton?.setAttribute("aria-expanded", "true");
		this.hamburgerButton?.setAttribute("aria-label", "メニューを閉じる");
		if (this.mobileMenu) {
			this.mobileMenu.style.display = "block";
		}
	}

	private closeMenu() {
		this.isOpen = false;
		this.hamburgerButton?.classList.remove("open");
		this.hamburgerButton?.setAttribute("aria-expanded", "false");
		this.hamburgerButton?.setAttribute("aria-label", "メニューを開く");
		if (this.mobileMenu) {
			this.mobileMenu.style.display = "none";
		}
	}
}

// Language dropdown management
class LanguageDropdownManager {
	private trigger: HTMLElement | null = null;
	private dropdown: HTMLElement | null = null;
	private isOpen = false;

	constructor() {
		this.init();
	}

	private init() {
		// Find trigger button and dropdown
		this.trigger = document.querySelector("[data-language-trigger]");
		this.dropdown = document.querySelector("[data-language-dropdown]");

		if (!this.trigger || !this.dropdown) {
			return;
		}

		// Setup click handler
		this.trigger.addEventListener("click", (event) => {
			event.preventDefault();
			this.toggleDropdown();
		});

		// Close dropdown when clicking outside
		document.addEventListener("click", (event) => {
			if (
				this.isOpen &&
				!this.trigger?.contains(event.target as Node) &&
				!this.dropdown?.contains(event.target as Node)
			) {
				this.closeDropdown();
			}
		});

		// Close dropdown on escape key
		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && this.isOpen) {
				this.closeDropdown();
			}
		});
	}

	private toggleDropdown() {
		if (this.isOpen) {
			this.closeDropdown();
		} else {
			this.openDropdown();
		}
	}

	private openDropdown() {
		this.isOpen = true;
		this.trigger?.classList.add("open");
		this.trigger?.setAttribute("aria-expanded", "true");
		if (this.dropdown) {
			this.dropdown.style.display = "block";
		}
	}

	private closeDropdown() {
		this.isOpen = false;
		this.trigger?.classList.remove("open");
		this.trigger?.setAttribute("aria-expanded", "false");
		if (this.dropdown) {
			this.dropdown.style.display = "none";
		}
	}
}

// Reference scroll management
class ReferenceScrollManager {
	private readonly HEADER_HEIGHT = 72;
	private readonly ADDITIONAL_PADDING = 16;
	private readonly SCROLL_OFFSET = this.HEADER_HEIGHT + this.ADDITIONAL_PADDING;

	constructor() {
		this.init();
	}

	private init() {
		// Handle clicks on reference links and footnote links
		document.addEventListener("click", this.handleReferenceClick.bind(this));

		// Handle browser back/forward navigation
		window.addEventListener("hashchange", this.handleHashChange.bind(this));

		// Handle initial page load with hash
		if (document.readyState === "loading") {
			document.addEventListener(
				"DOMContentLoaded",
				this.handleHashChange.bind(this),
			);
		} else {
			this.handleHashChange();
		}
	}

	private scrollToElementWithOffset(target: Element) {
		if (!target) return;

		const targetPosition =
			target.getBoundingClientRect().top + window.pageYOffset;
		const offsetPosition = targetPosition - this.SCROLL_OFFSET;

		window.scrollTo({
			top: Math.max(0, offsetPosition),
			behavior: "smooth",
		});
	}

	private handleReferenceClick(event: Event) {
		const link = (event.target as Element)?.closest(
			'a[href^="#"]',
		) as HTMLAnchorElement;
		if (!link) return;

		const href = link.getAttribute("href");
		if (!href || !href.startsWith("#")) return;

		// Prevent default scroll behavior
		event.preventDefault();

		// Find target element
		const targetId = href.slice(1);
		const target = document.getElementById(targetId);

		if (target) {
			this.scrollToElementWithOffset(target);

			// Update URL hash without triggering scroll
			if (history.pushState) {
				history.pushState(null, null, href);
			} else {
				// Fallback for older browsers
				window.location.hash = href;
			}
		}
	}

	private handleHashChange() {
		const hash = window.location.hash;
		if (hash) {
			const target = document.getElementById(hash.slice(1));
			if (target) {
				// Small delay to ensure page is loaded
				setTimeout(() => {
					this.scrollToElementWithOffset(target);
				}, 100);
			}
		}
	}
}

// Fleet viewer management
class FleetManager {
	private currentSlide = 0;
	private totalSlides = 0;
	private viewer: HTMLElement | null = null;
	private prevButton: HTMLButtonElement | null = null;
	private nextButton: HTMLButtonElement | null = null;
	private slideIndicator: HTMLElement | null = null;
	private progressBar: HTMLElement | null = null;
	private slides: HTMLElement[] = [];

	constructor() {
		this.init();
	}

	private init() {
		// Find fleet viewer elements
		this.viewer = document.querySelector("[data-fleet-viewer]");
		if (!this.viewer) return;

		this.prevButton = this.viewer.querySelector("[data-fleet-prev]");
		this.nextButton = this.viewer.querySelector("[data-fleet-next]");
		this.slideIndicator = this.viewer.querySelector("[data-fleet-indicator]");
		this.progressBar = this.viewer.querySelector("[data-fleet-progress]");
		this.slides = Array.from(
			this.viewer.querySelectorAll("[data-fleet-slide]"),
		);

		if (this.slides.length === 0) return;

		this.totalSlides = this.slides.length;
		this.currentSlide = 0;

		// Setup event listeners
		this.prevButton?.addEventListener("click", () => this.prevSlide());
		this.nextButton?.addEventListener("click", () => this.nextSlide());

		// Setup keyboard navigation
		document.addEventListener("keydown", (event) => {
			if (!this.viewer?.contains(document.activeElement)) return;

			if (event.key === "ArrowLeft") {
				event.preventDefault();
				this.prevSlide();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				this.nextSlide();
			}
		});

		// Initialize view
		this.updateView();

		// Handle initial focus for keyboard navigation
		this.viewer.setAttribute("tabindex", "0");
	}

	private prevSlide() {
		if (this.currentSlide > 0) {
			this.currentSlide--;
			this.updateView();
		}
	}

	private nextSlide() {
		if (this.currentSlide < this.totalSlides - 1) {
			this.currentSlide++;
			this.updateView();
		}
	}

	private updateView() {
		// Update slide visibility
		this.slides.forEach((slide, index) => {
			if (index === this.currentSlide) {
				slide.classList.add("active");
			} else {
				slide.classList.remove("active");
			}
		});

		// Update navigation buttons
		if (this.prevButton) {
			this.prevButton.disabled = this.currentSlide === 0;
		}
		if (this.nextButton) {
			this.nextButton.disabled = this.currentSlide === this.totalSlides - 1;
		}

		// Update slide indicator
		if (this.slideIndicator) {
			this.slideIndicator.textContent = `${this.currentSlide + 1} / ${
				this.totalSlides
			}`;
		}

		// Update progress bar
		if (this.progressBar) {
			const progressPercentage =
				((this.currentSlide + 1) / this.totalSlides) * 100;
			this.progressBar.style.width = `${progressPercentage}%`;
		}
	}
}

// Initialize managers
new ThemeManager();
new MobileMenuManager();
new LanguageDropdownManager();
new ReferenceScrollManager();
new FleetManager();

console.log("hello! I am shinyaigeek");
