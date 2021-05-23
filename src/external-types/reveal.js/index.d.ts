/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import {EasingFunction, Property} from 'csstype'

declare module 'reveal.js' {
  export type AutoAnimateStyles = 'background-color' | 'border-color' | 'border-radius' | 'border-width' | 'color' | 'font-size' | 'letter-spacing' | 'line-height' | 'opacity' | 'outline' | 'outline-offset' | 'padding'

  export type Transition = 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom'

  export type ControlsBackArrows = 'faded' | 'hidden' | 'visible'

  export type ControlsLayout = 'bottom-right' | 'edges'

  export type NavigationMode = 'default' | 'linear' | 'grid'

  export type ShowSlideNumber = 'all' | 'print' | 'speaker'

  export type SlideNumber = 'h.v' | 'h/v' | 'c' | 'c/t'

  export type TransitionSpeed = 'default' | 'slow' | 'fast'

  export interface RevealOptions {
    autoAnimate?: boolean,
    // Time between auto-animate transitions
    autoAnimateDuration?: number,
    // Auto-animate transition function
    autoAnimateEasing?: EasingFunction,
    // CSS properties that can be auto-animated. Position & scale
    // is matched separately so there's no need to include styles
    // like top/right/bottom/left, width/height or margin.
    autoAnimateStyles?: AutoAnimateStyles[],
    // Global override for autolaying embedded media (video/audio/iframe)
    // - null:   Media will only autoplay if data-autoplay is present
    // - true:   All media will autoplay, regardless of individual setting
    // - false:  No media will autoplay, regardless of individual setting
    autoPlayMedia?: boolean | null,
    // Controls automatic progression to the next slide
    // - 0:      Auto-sliding only happens if the data-autoslide HTML attribute
    //           is present on the current slide or fragment
    // - 1+:     All slides will progress automatically at the given interval
    // - false:  No auto-sliding, even if data-autoslide is present
    autoSlide?: 0 | 1 | false,
    // Stop auto-sliding after user input
    autoSlideStoppable?: boolean,
    // Transition style for full page slide backgrounds
    backgroundTransition?: Transition,
    // Vertical centering of slides
    center?: boolean,
    // Display presentation control arrows
    controls?: boolean,
    // Visibility rule for backwards navigation arrows
    controlsBackArrows?: ControlsBackArrows,
    // Determines where controls appear
    controlsLayout?: ControlsLayout,
    // Help the user learn the controls by providing hints, for example by
    // bouncing the down arrow when they first encounter a vertical slide
    controlsTutorial?: boolean,
    // Specify the average time in seconds that you think you will spend
    // presenting each slide. This is used to show a pacing timer in the
    // speaker view
    defaultTiming?: number | null,
    // Disables the default reveal.js slide layout (scaling and centering)
    // so that you can use custom CSS layout
    disableLayout?: boolean,
    // The display mode that will be used to show slides
    display?: Property.Display,
    // Flags if the presentation is running in an embedded mode,
    // i.e. contained within a limited portion of the screen
    embedded?: boolean,
    // Focuses body when page changes visibility to ensure keyboard shortcuts work
    focusBodyOnPageVisibilityChange?: boolean,
    // Flags whether to include the current fragment in the URL,
    // so that reloading brings you to the same fragment position
    fragmentInURL?: boolean, // ToDo: see [1]
    // Turns fragments on and off globally
    fragments?: boolean,
    // Add the current slide number to the URL hash so that reloading the
    // page/copying the URL will return you to the same slide
    hash?: boolean, // ToDo: see [1]
    // Use 1 based indexing for # links to match slide number (default is zero
    // based)
    hashOneBasedIndex?: boolean, // ToDo: see [1]
    // Flags if we should show a help overlay when the question-mark
    // key is pressed
    help?: boolean,
    // Time before the cursor is hidden (in ms)
    hideCursorTime?: number,
    // Hide cursor if inactive
    hideInactiveCursor?: boolean,
    // Enable keyboard shortcuts for navigation
    keyboard?: boolean,
    // Loop the presentation
    loop?: boolean,
    // Number of slides away from the current that are visible on mobile
    // devices. It is advisable to set this to a lower number than
    // viewDistance in order to save resources
    mobileViewDistance?: number,
    // Enable slide navigation via mouse wheel
    mouseWheel?: boolean,
    // Changes the behavior of our navigation directions.
    //
    // "default"
    // Left/right arrow keys step between horizontal slides, up/down
    // arrow keys step between vertical slides. Space key steps through
    // all slides (both horizontal and vertical).
    //
    // "linear"
    // Removes the up/down arrows. Left/right arrows step through all
    // slides (both horizontal and vertical).
    //
    // "grid"
    // When this is enabled, stepping left/right from a vertical stack
    // to an adjacent vertical stack will land you at the same vertical
    // index.
    //
    // Consider a deck with six slides ordered in two vertical stacks:
    // 1.1    2.1
    // 1.2    2.2
    // 1.3    2.3
    //
    // If you're on slide 1.3 and navigate right, you will normally move
    // from 1.3 -> 2.1. If "grid" is used, the same navigation takes you
    // from 1.3 -> 2.3.
    navigationMode?: NavigationMode,
    // Enable the slide overview mode
    overview?: boolean,
    // Flags if it should be possible to pause the presentation (blackout)
    pause?: boolean,
    // The maximum number of pages a single slide can expand onto when printing
    // to PDF, unlimited by default
    pdfMaxPagesPerSlide?: number,
    pdfPageHeightOffset: -1,
    pdfSeparateFragments: true,
    // Global override for preloading lazy-loaded iframes
    // - null:   Iframes with data-src AND data-preload will be loaded when within
    //           the viewDistance, iframes with only data-src will be loaded when visible
    // - true:   All iframes with data-src will be loaded when within the viewDistance
    // - false:  All iframes with data-src will be loaded only when visible
    preloadIframes?: boolean | null,
    // Opens links in an iframe preview overlay
    // Add `data-preview-link` and `data-preview-link="false"` to customise each link
    // individually
    previewLinks?: boolean,
    // Display a presentation progress bar
    progress?: boolean,
    // Flags if we should monitor the hash and change slides accordingly
    respondToHashChanges?: boolean, // ToDo: see [1]
    // Change the presentation direction to be RTL
    rtl?: boolean,
    // Flags if speaker notes should be visible to all viewers
    showNotes?: boolean,
    // Can be used to limit the contexts in which the slide number appears
    // - "all":      Always show the slide number
    // - "print":    Only when printing to PDF
    // - "speaker":  Only in the speaker view
    showSlideNumber?: ShowSlideNumber,
    // Randomizes the order of slides each time the presentation loads
    shuffle?: boolean,
    // Display the page number of the current slide
    // - true:    Show slide number
    // - false:   Hide slide number
    //
    // Can optionally be set as a string that specifies the number formatting:
    // - "h.v":   Horizontal . vertical slide number (default)
    // - "h/v":   Horizontal / vertical slide number
    // - "c":   Flattened slide number
    // - "c/t":   Flattened slide number / total slides
    slideNumber?: boolean | SlideNumber,
    // Enables touch navigation on devices with touch input
    touch?: boolean,
    // Transition style
    transition?: Transition,
    // Transition speed
    transitionSpeed?: TransitionSpeed,
    // Number of slides away from the current that are visible
    viewDistance?: number,
  }

  export default class Reveal {
    constructor(options: RevealOptions);

    public initialize(): void;

    public sync(): void;
  }
}

// [1]: Implement ourself can only modify the iframe url
