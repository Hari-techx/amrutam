# Amrutam — Senior React Native Assignment

A production-oriented Ayurvedic super app prototype with three independent modules: Consultation, Shop, and Health Records.

## Modules

### Consultation

- 5,000 generated doctors
- Search and multi-filter
- Doctor details
- Date and slot selection
- Booking persistence
- Upcoming consultations
- Cancellation
- Expired-slot validation
- Duplicate/double-booking validation
- Offline mutation queue

### Shop

- 20,000 generated products
- Infinite scroll / virtualized FlatList
- Search
- Category + rating + price filters
- Sorting
- Product details
- Cart with quantity updates
- Wishlist
- Persisted cart
- Checkout summary

### Health Records

- 10,000 generated records
- Timeline view
- Search
- Type filters
- Tags
- Month grouping
- Image/PDF attachment preview placeholder

## Architecture

Feature-based architecture keeps business modules isolated:

```text
src/
  app/providers/
  components/ui/
  config/
  constants/
  features/
    auth/
    consultations/
    shop/
    health-records/
  navigation/
  services/
    api/
    logger/
    storage/
    sync/
  store/
  theme/
```

Redux Toolkit + Redux Saga are used for global authentication workflow. Local screen state is used for transient UI state such as search/filter selections. AsyncStorage is used for offline cart, auth session, theme preference, and booking data.

## Performance

The assignment asks the app to support 5,000 doctors, 20,000 products, and 10,000 health records. The prototype uses generated data, FlatList virtualization, memoized doctor cards, derived filtering with useMemo, incremental product/record loading, and limited initial rendering.

## Offline strategy

- Cached storage abstraction for local data
- Offline cart persistence
- Booking and cart mutations are queued
- NetInfo listens for connectivity changes
- Queue retries with exponential backoff
- Queue is retained when synchronization fails

## Reliability

The service layer includes request timeout configuration, retry handling, safe JSON parsing, local fallback for cached requests, and UI handling for empty/error states. Booking logic validates expiry, duplicates, and conflicts before creating a booking.

## Production engineering

- Environment configuration
- API abstraction
- Logger utility
- Error Boundary
- Global Toast provider
- Theme support and dark mode
- Accessibility labels/roles/states on key controls
- Feature-based folder organization
- Strong TypeScript navigation and domain models

## Three bonus features

This implementation intentionally selects three bonuses that reinforce the core architecture:

1. **Feature Flags** — `src/config/featureFlags.ts`
2. **Deep Linking** — `amrutam://consultations`, plus screen routes in navigation configuration
3. **Background Synchronization** — NetInfo-driven mutation queue synchronization

## Testing

Tests cover generated slot behavior and the required large product dataset. Install the development dependencies and run:

```bash
npm install
npm test
```

For an Expo environment, if dependency versions need alignment after installation:

```bash
npx expo install --fix
```

## Android

```bash
npm install
npx expo start --android
```

For a development build/EAS build, use the Expo workflow appropriate for the installed SDK and Android environment.

## Trade-offs

This assignment permits public or mock APIs, so the repository uses deterministic generated data and a small service abstraction instead of depending on a live backend. The API client is ready for a real backend, while offline mutations currently use a mock synchronization boundary. Real server-side slot locking is required in production to guarantee distributed double-booking prevention.

## Future improvements

- Replace mock API calls with a real backend
- Server-side atomic slot reservation
- Secure credential/token storage
- Real PDF renderer and attachment downloads
- Full checkout/payment integration
- More comprehensive component and E2E tests
- Background sync using platform-specific background execution where required
