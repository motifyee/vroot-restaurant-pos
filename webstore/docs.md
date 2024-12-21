<!--

DOCUMENTATION:
This file outlines the structure and components of the shop page. Use this guide to:
1. Understand the relationships between components.
2. Easily locate components in the codebase using search tools in your editor.
3. Identify components in the browser's developer tools to see their placement in the UI.

SHOP COMPONENT STRUCTURE:

component (root node)
  ├── header
  │   ├── order-time
  │   │   - A popup that appears when the "time-type-btn" is clicked.
  │   ├── order-option
  │   │   - A popup that appears when the "header-dropdown-container" is clicked.
  │   │   ├── delivery
  │   │   ├── phone-popup
  │   │   ├── code-verification
  │   │   ├── pickup
  │   │   └── drive
  │   │       └── branch-periods
  │   │           - A popup that appears when selecting a car and clicking the clock icon.
  │   └── banner
  │       - Contains the logo.
  │
  ├── navbar
  │   - A sidebar that opens when the burger menu is clicked.
  │
  ├── category-bar (mobile-category-bar)
  │   - Contains category tabs. Clicking a tab scrolls to its corresponding section.
  │
  ├── items
  │   - Displays the list of items.
  │
  ├── add-to-cart-modal
  │   - Shows item details in a popup when an item is clicked.
  │
  └── cart
      - Displays the shopping cart.

SERVICES (temporary):
  ├── scroll.service
      - Handles the logic for scrolling to specific sections .

ADDITIONAL INFORMATION:
- In addition to the components listed above, the shop page includes four primary components.
-->
