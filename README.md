# CodeFlee Assessment

### Asif Nihal [(apar.asif.an@gmail.com)](mailto:apar.asif.an@gmail.com)

## Get started (How to run the project)

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

feat: Add Modal component with gesture support and accessibility features

- Implemented a new Modal component that supports swipe gestures for closing.
- Integrated accessibility context to manage theme and text properties.
- Added GradientView for background styling based on theme.
- Created ThemedText, ThemedButton, and ThemedView components for consistent styling.
- Introduced ModalItemCard for card representation within the modal.
- Established Accessibility context for managing application state and user preferences.
- Added utility constants for height calculations based on screen dimensions.
