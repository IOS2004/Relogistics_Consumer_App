# Relogistics - Trucking & Logistics Mobile App

A modern, full-featured React Native mobile application for trucking and logistics management with dual roles: **Consumer (Shipper)** and **Booking Agent**.

![React Native](https://img.shields.io/badge/React_Native-0.74-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-~51.0-000020?logo=expo)
![React Navigation](https://img.shields.io/badge/React_Navigation-6.x-6B46C1)

## 📱 Features

### Consumer (Shipper) Features

- **Authentication**: Login/Register with role selection
- **Home Dashboard**: Quick actions and booking overview
- **New Booking**:
  - Pickup & delivery address selection
  - Truck type selection (Small/Medium/Large)
  - Goods details (weight, quantity, fragile toggle)
  - Pickup date/time scheduling
  - Real-time price estimation
- **Track Shipment**: Live map tracking with simulated GPS movement
- **My Bookings**: Filter bookings by status (All/Pending/In Transit/Delivered)
- **Booking Details**: Comprehensive view with progress tracker
- **Profile Management**: Edit profile, saved addresses

### Booking Agent Features

- **Dashboard**: Overview of all bookings with statistics
- **Assign Truck**: Select available trucks and drivers for pending bookings
- **Truck & Driver Management**:
  - View all trucks and drivers
  - Add new trucks
  - Availability status tracking
- **Reports**:
  - Delivery statistics
  - Revenue metrics
  - Performance analytics
- **Profile**: Agent-specific profile management

## 🛠️ Tech Stack

- **Framework**: React Native + Expo
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **State Management**: Context API
- **UI Components**: React Native Paper
- **Icons**: Material Community Icons
- **Maps**: React Native Maps
- **HTTP Client**: Axios (with mock responses)
- **Date Handling**: date-fns

## 📂 Project Structure

```
booking_consumer_app/
├── App.js                      # Root component
├── app.json                    # Expo configuration
├── package.json                # Dependencies
├── babel.config.js             # Babel configuration
└── src/
    ├── config/
    │   └── theme.js           # Theme configuration (colors, spacing, typography)
    ├── contexts/
    │   ├── AuthContext.js     # Authentication state management
    │   └── BookingContext.js  # Booking state management
    ├── navigation/
    │   ├── RootNavigator.js   # Main navigation logic
    │   ├── AuthStack.js       # Auth screens stack
    │   ├── ConsumerTabs.js    # Consumer bottom tabs
    │   └── AgentTabs.js       # Agent bottom tabs
    ├── screens/
    │   ├── auth/
    │   │   ├── SplashScreen.js
    │   │   ├── LoginScreen.js
    │   │   └── RegisterScreen.js
    │   ├── consumer/
    │   │   ├── HomeScreen.js
    │   │   ├── NewBookingScreen.js
    │   │   ├── MyBookingsScreen.js
    │   │   ├── BookingDetailsScreen.js
    │   │   ├── TrackShipmentScreen.js
    │   │   └── ProfileScreen.js
    │   └── agent/
    │       ├── DashboardScreen.js
    │       ├── AssignTruckScreen.js
    │       ├── TruckManagementScreen.js
    │       ├── ReportsScreen.js
    │       ├── BookingDetailsScreen.js
    │       └── ProfileScreen.js
    ├── components/
    │   ├── Button.js          # Custom button component
    │   ├── Input.js           # Custom input component
    │   ├── BookingCard.js     # Booking card component
    │   └── QuickActionCard.js # Action card component
    ├── services/
    │   └── api.js             # Mock API services
    └── data/
        └── mockData.js        # Sample data for testing
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device (for testing)

### Installation

1. **Clone the repository**:

   ```bash
   cd f:/Relogistics/booking_consumer_app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**:
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go
   - **Web**: Press `w` in the terminal

## 📱 Testing the App

### Test Accounts

You can use any email/password combination as the app uses mock authentication:

**Consumer Login**:

- Email: `consumer@test.com`
- Password: `password`
- Role: Select "Consumer"

**Agent Login**:

- Email: `agent@test.com`
- Password: `password`
- Role: Select "Agent"

### Sample Tracking IDs

Use these booking IDs to test tracking:

- `BK001` - In Transit
- `BK002` - Pending
- `BK003` - Delivered

## 🎨 UI/UX Design

### Color Palette

- **Primary Blue**: #1E40AF (trust, professionalism)
- **Gray Tones**: #64748B, #F8FAFC (clean, modern)
- **Status Colors**:
  - Pending: #F59E0B (Orange)
  - Assigned: #3B82F6 (Blue)
  - In Transit: #8B5CF6 (Purple)
  - Delivered: #10B981 (Green)

### Design Principles

- **Minimalist**: Clean layouts with ample white space
- **Responsive**: Adapts to different screen sizes
- **Intuitive**: Clear navigation and user flows
- **Accessible**: High contrast, readable fonts

## 🔄 State Management

The app uses **React Context API** for state management:

### AuthContext

Manages user authentication and profile:

- User login/logout
- User registration
- Profile updates
- Role-based access

### BookingContext

Manages booking-related data:

- Booking creation
- Booking status updates
- Truck assignment
- Tracking data
- Truck and driver management

## 🌐 API Integration

The app currently uses **mock API calls** with simulated delays. To integrate with a real backend:

1. Update `src/services/api.js` with your API base URL
2. Uncomment the production API examples
3. Replace mock functions with actual HTTP calls
4. Add proper error handling and authentication tokens

### Example API Integration:

```javascript
// Current (Mock)
export const bookingAPI = {
  createBooking: async (bookingData) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: mockBooking }), 1000);
    });
  },
};

// Production (Real API)
export const bookingAPI = {
  createBooking: async (bookingData) => {
    try {
      const response = await api.post("/bookings", bookingData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
```

## 📦 Building for Production

### Android

```bash
expo build:android
# or
eas build --platform android
```

### iOS

```bash
expo build:ios
# or
eas build --platform ios
```

## 🧪 Key Features Explained

### Role-Based Navigation

The app dynamically shows different screens based on user role:

- Consumers see: Home, Bookings, Track, Profile
- Agents see: Dashboard, Trucks, Reports, Profile

### Live Tracking Simulation

The tracking screen simulates GPS movement:

- Updates truck location every 3 seconds
- Animates movement from pickup to delivery
- Shows real-time status updates

### Price Estimation

Dynamic pricing based on:

- Truck type base price
- Weight of goods
- Distance (simulated)

## 🔐 Security Notes

**Important**: This is a frontend-only demo app. In production:

- Implement proper authentication (JWT, OAuth)
- Encrypt sensitive data
- Validate all inputs
- Use HTTPS for API calls
- Store tokens securely (SecureStore)
- Implement proper authorization checks

## 🤝 Contributing

This is a demonstration project. For production use:

1. Add comprehensive error handling
2. Implement proper form validation
3. Add loading states everywhere
4. Create unit and integration tests
5. Add analytics tracking
6. Implement push notifications
7. Add offline support with local storage

## 📄 License

MIT License - Feel free to use this project as a template for your own logistics app.

## 📞 Support

For questions or issues:

- Create an issue in the repository
- Check React Native and Expo documentation
- Review the code comments for implementation details

## 🎯 Future Enhancements

- [ ] Payment integration
- [ ] Push notifications
- [ ] Real-time chat with drivers
- [ ] Multiple language support
- [ ] Dark mode
- [ ] Offline mode
- [ ] Document upload (POD, invoices)
- [ ] Rating and review system
- [ ] Advanced analytics dashboard
- [ ] Route optimization

---

**Built with ❤️ using React Native and Expo**
