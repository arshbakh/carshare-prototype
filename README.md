# CarShare: High-Fidelity Prototype (ITEC 3230, ITEC3230GROUPA)

A clickable prototype of the CarShare campus car-sharing app, built in HTML, CSS and JavaScript.
It uses built-in sample data, with no backend or account.

## How to run
Open `index.html` in Chrome by double-clicking it. Nothing needs to be installed.
**Reload the page to reset** it to the Home map with no bookings (do this between test sessions).

## Screens (same structure as our low-fidelity prototype)
| Screen | File | Low-fi step |
|---|---|---|
| Home map (search, price pins) | `js/screens/home.js` | Home map |
| Filters (trip purpose, size, price) | `js/screens/filters.js` | Step 1 of 5 |
| Compare cars | `js/screens/compare.js` | Step 2 of 5 |
| Car details | `js/screens/details.js` | Step 3 of 5 |
| Booking time, Review booking | `js/screens/booking.js` | Steps 4–5 of 5 |
| My Trips, Change time | `js/screens/trips.js` | My Trips |
| Help, FAQs | `js/screens/help.js` | Help |
| Report a problem (+ confirmation) | `js/screens/report.js` | Help → Report a problem |
| Chat with support | `js/screens/chat.js` | Help → Chat |

## Project structure
```
index.html          page shell (phone frame) and script order
css/base.css        colours, fonts, phone frame, header, buttons, bottom bar
css/components.css  cards, feedback messages, form fields, dialogs
css/screens.css     styles for each screen
js/data.js          sample cars, prices, dates
js/state.js         app state and navigation (Back, tabs)
js/icons.js         icons, car drawings, campus map
js/ui.js            shared header (title, step label, progress bar)
js/screens/*.js     one file per screen
js/modals.js        confirm dialogs (change time, cancel, call)
js/app.js           button/form handling and rendering
```

## Sample data used in the usability test
- **SUV** (Toyota Highlander): Lot A, $15/hr, 7 seats, large trunk. Already booked Thu Dec 3, 3–5 PM, so a booking in that slot is blocked.
- **Sedan** (Toyota Corolla Hybrid): Library Lot, $12/hr, 5 seats
- **Cargo Van** (Ford Transit Connect): Stong Lot, $20/hr, 2 seats
- Dates: Mon Nov 30 to Sun Dec 6, 2026. Payment shown as Visa •••• 4821 (fake).

## Design principles applied
- **Consistency:** the same header, Back button, full-width main button and bottom bar (Home / My Trips / Help) on every screen.
- **Feedback:** "Step X of 5" with a progress bar, green ✓ confirmations, and a "Not booked yet" warning before confirming.
- **Constraints:** main buttons are disabled until a valid choice is made, the return time is always after pickup, and booked time slots are blocked.
- **Mapping / metaphors:** a map with price pins (like Google Maps), ticket-style booking (pick → review → confirm), and a help-desk style Help tab.
- **Recognition over recall:** choices are picked from chips, cards and dropdowns, not typed.
