# 📐 Architecture & Design Documentation

## Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         App.js                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           PaperProvider (UI Theme)                    │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │         AuthProvider (Context)                  │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │      BookingProvider (Context)            │  │  │  │
│  │  │  │  ┌────────────────────────────────────┐  │  │  │  │
│  │  │  │  │   NavigationContainer              │  │  │  │  │
│  │  │  │  │  ┌──────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │    RootNavigator             │  │  │  │  │  │
│  │  │  │  │  └──────────────────────────────┘  │  │  │  │  │
│  │  │  │  └────────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Navigation Flow

```
RootNavigator
│
├── AuthStack (Not Authenticated)
│   ├── SplashScreen
│   ├── LoginScreen
│   └── RegisterScreen
│
├── ConsumerTabs (Authenticated as Consumer)
│   ├── HomeTab (Stack)
│   │   ├── HomeScreen
│   │   ├── NewBookingScreen
│   │   └── TrackShipmentScreen
│   │
│   ├── BookingsTab (Stack)
│   │   ├── MyBookingsScreen
│   │   └── BookingDetailsScreen
│   │
│   ├── Track (Screen)
│   │   └── TrackShipmentScreen
│   │
│   └── Profile (Screen)
│       └── ProfileScreen
│
└── AgentTabs (Authenticated as Agent)
    ├── DashboardTab (Stack)
    │   ├── DashboardScreen
    │   ├── AssignTruckScreen
    │   └── BookingDetailsScreen
    │
    ├── Trucks (Screen)
    │   └── TruckManagementScreen
    │
    ├── Reports (Screen)
    │   └── ReportsScreen
    │
    └── Profile (Screen)
        └── ProfileScreen
```

## State Management Structure

```
┌─────────────────────────────────────────────────────┐
│                  AuthContext                         │
│ ─────────────────────────────────────────────────── │
│  State:                                              │
│    • user (object)                                   │
│    • userRole (string)                               │
│    • isLoading (boolean)                             │
│                                                      │
│  Methods:                                            │
│    • login(email, password, role)                    │
│    • register(name, email, password, phone, role)    │
│    • logout()                                        │
│    • updateProfile(data)                             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                BookingContext                        │
│ ─────────────────────────────────────────────────── │
│  State:                                              │
│    • bookings (array)                                │
│    • trucks (array)                                  │
│    • drivers (array)                                 │
│    • trackingData (object)                           │
│                                                      │
│  Methods:                                            │
│    • createBooking(data)                             │
│    • updateBookingStatus(id, status)                 │
│    • assignTruckToBooking(bookingId, truckId, ...)  │
│    • getBookingById(id)                              │
│    • getConsumerBookings(consumerId)                 │
│    • updateTrackingData(bookingId, location)        │
│    • addTruck(data)                                  │
└─────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
Screens
├── Auth Screens
│   ├── SplashScreen
│   ├── LoginScreen
│   │   └── Components: Input, Button
│   └── RegisterScreen
│       └── Components: Input, Button
│
├── Consumer Screens
│   ├── HomeScreen
│   │   └── Components: QuickActionCard, BookingCard
│   ├── NewBookingScreen
│   │   └── Components: Input, Button
│   ├── MyBookingsScreen
│   │   └── Components: BookingCard
│   ├── BookingDetailsScreen
│   │   └── Components: (internal)
│   ├── TrackShipmentScreen
│   │   └── Components: Input, Button, MapView
│   └── ProfileScreen
│       └── Components: Input, Button
│
└── Agent Screens
    ├── DashboardScreen
    │   └── Components: BookingCard, StatCard
    ├── AssignTruckScreen
    │   └── Components: Button
    ├── TruckManagementScreen
    │   └── Components: Input, Button
    ├── ReportsScreen
    │   └── Components: (internal)
    ├── BookingDetailsScreen
    │   └── Components: (internal)
    └── ProfileScreen
        └── Components: Input, Button
```

## Data Flow Diagram

```
┌──────────────┐
│    User      │
│   Actions    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────────┐
│         UI Components                 │
│  (Screens, Buttons, Inputs)          │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│      Context API Methods              │
│  (login, createBooking, etc.)        │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│       API Services                    │
│  (Mock API calls with promises)      │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│      Context State Update             │
│  (setState with new data)            │
└──────┬───────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────┐
│      React Re-render                  │
│  (UI updates automatically)          │
└──────────────────────────────────────┘
```

## API Service Structure

```javascript
// Mock API Layer
src/services/api.js
├── authAPI
│   ├── login()
│   ├── register()
│   └── updateProfile()
│
├── bookingAPI
│   ├── createBooking()
│   ├── getBookings()
│   ├── getBookingById()
│   ├── updateBookingStatus()
│   ├── assignTruck()
│   └── trackShipment()
│
├── truckAPI
│   ├── getTrucks()
│   ├── addTruck()
│   └── updateTruck()
│
└── driverAPI
    ├── getDrivers()
    └── addDriver()
```

## Screen Responsibilities

### Consumer Screens

**HomeScreen**

- Display user greeting
- Show quick action buttons
- Display active shipment
- List recent bookings

**NewBookingScreen**

- Collect pickup/delivery addresses
- Select truck type
- Input goods details
- Calculate price estimate
- Create booking

**MyBookingsScreen**

- List all user bookings
- Filter by status
- Navigate to details

**BookingDetailsScreen**

- Show booking information
- Display progress tracker
- Show route information
- Display driver details

**TrackShipmentScreen**

- Input tracking ID
- Display map with markers
- Simulate GPS movement
- Show current status

**ProfileScreen**

- Display user information
- Edit profile
- Manage saved addresses
- Settings and logout

### Agent Screens

**DashboardScreen**

- Show booking statistics
- Display all bookings
- Filter bookings by status
- Navigate to assign/details

**AssignTruckScreen**

- Display booking info
- List available trucks
- List available drivers
- Assign resources

**TruckManagementScreen**

- List all trucks
- Add new trucks
- List all drivers
- Show availability status

**ReportsScreen**

- Display delivery statistics
- Show revenue metrics
- List recent deliveries
- Performance analytics

## Design Patterns Used

### 1. **Context Pattern**

- Centralized state management
- Avoid prop drilling
- Easy state access across components

### 2. **Component Composition**

- Reusable UI components
- Separation of concerns
- Maintainable code

### 3. **Provider Pattern**

- Wrap app with providers
- Inject dependencies
- Theme and navigation setup

### 4. **Container/Presentational Pattern**

- Screens as containers
- Components as presentational
- Clear separation of logic and UI

## Color System

```
Primary Colors:
  Primary:      #1E40AF  ████  (Blue - Trust)
  Primary Light:#3B82F6  ████  (Light Blue)
  Primary Dark: #1E3A8A  ████  (Dark Blue)

Secondary Colors:
  Gray:         #64748B  ████  (Neutral)
  Background:   #F8FAFC  ████  (Light Gray)

Status Colors:
  Success:      #10B981  ████  (Green - Delivered)
  Warning:      #F59E0B  ████  (Orange - Pending)
  Error:        #EF4444  ████  (Red - Issues)
  Info:         #3B82F6  ████  (Blue - In Transit)
```

## Typography Scale

```
H1: 32px / 700 weight / 40px line-height
H2: 24px / 600 weight / 32px line-height
H3: 20px / 600 weight / 28px line-height
Body: 16px / 400 weight / 24px line-height
Caption: 14px / 400 weight / 20px line-height
Small: 12px / 400 weight / 16px line-height
```

## Spacing System

```
xs:   4px   ▌
sm:   8px   ▌▌
md:   16px  ▌▌▌▌
lg:   24px  ▌▌▌▌▌▌
xl:   32px  ▌▌▌▌▌▌▌▌
xxl:  48px  ▌▌▌▌▌▌▌▌▌▌▌▌
```

## Performance Optimizations

1. **Lazy Loading**: Screens load only when needed
2. **Memoization**: Use React.memo for expensive components
3. **Virtualization**: FlatList for long lists
4. **Image Optimization**: Proper image sizing and caching
5. **Code Splitting**: Separate bundles for different features

## Security Considerations

1. **Input Validation**: Validate all user inputs
2. **Authentication**: Secure token storage
3. **API Security**: HTTPS only, proper headers
4. **Data Encryption**: Sensitive data encryption
5. **Session Management**: Proper logout and timeout

---

**Note**: This architecture is designed for scalability and maintainability. As the app grows, consider adding Redux for more complex state, implementing testing frameworks, and adding error boundaries.
