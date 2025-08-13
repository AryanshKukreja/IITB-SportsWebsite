import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminCourtManagement.css';

const AdminCourtManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('court-status');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Authentication states
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Court management states
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [courtData, setCourtData] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [courtLoading, setCourtLoading] = useState(false);
  const [updatingSlots, setUpdatingSlots] = useState(new Set());

  // Enhanced multi-slot selection states
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [bulkActionMode, setBulkActionMode] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState('');
  const [multiCourtMode, setMultiCourtMode] = useState(false);
  const [selectedCourts, setSelectedCourts] = useState(new Set());

  // Enhanced booking modal states
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingModalData, setBookingModalData] = useState({
    courtId: '',
    courtIds: [],
    timeSlotIds: [],
    courtName: '',
    timeSlots: [],
    booking_by: '',
    isBulk: false,
    isMultiCourt: false,
    isWeekly: false
  });

  // Weekly booking states
  const [showWeeklyModal, setShowWeeklyModal] = useState(false);
  const [weeklyBookingData, setWeeklyBookingData] = useState({
    startDate: '',
    endDate: '',
    weekdays: [],
    courtIds: [],
    timeSlotIds: [],
    booking_by: ''
  });

  // User booking management states (NEW)
  const [userBookings, setUserBookings] = useState({});
  const [bookingStats, setBookingStats] = useState({});
  const [bookingPagination, setBookingPagination] = useState({});
  const [selectedBookings, setSelectedBookings] = useState(new Set());
  const [bookingLoading, setBookingLoading] = useState(false);
  const [currentBookingPage, setCurrentBookingPage] = useState(1);

  // Photo and upload states
  const [approvalPhoto, setApprovalPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Photo viewing modal
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  // Time slot management states
  const [allTimeSlots, setAllTimeSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ hour: '' });
  const [bulkCreate, setBulkCreate] = useState({ startHour: '', endHour: '' });
  const [editingSlot, setEditingSlot] = useState(null);
  const [editSlotValue, setEditSlotValue] = useState('');
  const [slotLoading, setSlotLoading] = useState(false);

  // Sports management states
  const [newSport, setNewSport] = useState({ id: '', name: '' });
  const [sportsWithCourts, setSportsWithCourts] = useState([]);
  const [editingCourt, setEditingCourt] = useState(null);
  const [newCourtCount, setNewCourtCount] = useState('');
  const [courtUpdateLoading, setCourtUpdateLoading] = useState(false);
  const [sportLoading, setSportLoading] = useState(false);

  // Global states
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [dateRangeInfo, setDateRangeInfo] = useState(null);

  // AWS S3 Configuration
  const AWS_CONFIG = {
    bucketName: 'court-status-approvals',
    region: 'eu-north-1'
  };

  const API_BASE_URL = 'http://localhost:5000';

  // Weekday options for weekly bookings
  const WEEKDAY_OPTIONS = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  // Initialize component
  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInitialData();
      fetchDateRangeInfo();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && selectedSport) {
      fetchCourtStatus();
    }
  }, [selectedSport, selectedDate, isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'time-slots' && isAuthenticated) {
      fetchTimeSlots();
    }
  }, [activeTab, isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'sports' && isAuthenticated) {
      fetchSportsWithCourts();
    }
  }, [activeTab, isAuthenticated]);

  // NEW: Load user bookings when user-bookings tab is active
  useEffect(() => {
    if (activeTab === 'user-bookings' && isAuthenticated) {
      fetchUserBookings();
    }
  }, [activeTab, isAuthenticated]);

  // Utility function to show messages
  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  // Authentication functions
  const checkAuthStatus = () => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      try {
        setIsAuthenticated(true);
        setAdminUser(JSON.parse(user));
      } catch (error) {
        console.error('Error parsing admin user:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok && data.isAdmin) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data));
        setIsAuthenticated(true);
        setAdminUser(data);
        showMessage(`Welcome back, ${data.username}!`, 'success');
      } else {
        setLoginError(data.error || 'Invalid admin credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('Login failed. Please check your connection and try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      setIsAuthenticated(false);
      setAdminUser(null);
      showMessage('Logged out successfully', 'success');
    }
  };

  // Data fetching functions
  const fetchInitialData = async () => {
    try {
      const sportsResponse = await fetch(`${API_BASE_URL}/api/sports`);
      if (!sportsResponse.ok) {
        throw new Error('Failed to fetch sports');
      }
      
      const sportsData = await sportsResponse.json();
      setSports(sportsData);
      
      if (sportsData.length > 0) {
        setSelectedSport(sportsData[0].id || sportsData[0]._id);
      } else {
        showMessage('No sports found. Please create a sport first.', 'info');
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
      showMessage('Failed to load sports data. Please refresh the page.', 'error');
    }
  };

  const fetchDateRangeInfo = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/bookings/date-ranges`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDateRangeInfo(data);
      }
    } catch (error) {
      console.error('Error fetching date range info:', error);
    }
  };

  const fetchSportsWithCourts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sports/with-courts`);
      if (!response.ok) {
        throw new Error('Failed to fetch sports with courts');
      }
      
      const data = await response.json();
      setSportsWithCourts(data.data || []);
    } catch (error) {
      console.error('Error fetching sports with courts:', error);
      showMessage('Failed to load sports data. Please try again.', 'error');
    }
  };

  const fetchCourtStatus = async () => {
    if (!selectedSport) return;
    
    setCourtLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/court-status?sport=${selectedSport}&date=${selectedDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch court status');
      }
      
      const data = await response.json();
      setCourtData(data.courts || []);
      setTimeSlots(data.timeSlots || []);
    } catch (error) {
      console.error('Error fetching court status:', error);
      showMessage('Failed to load court status. Please try again.', 'error');
      setCourtData([]);
    } finally {
      setCourtLoading(false);
    }
  };

  const fetchTimeSlots = async () => {
    setSlotLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/timeslots`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch time slots');
      }
      
      const data = await response.json();
      setAllTimeSlots(data.data || []);
    } catch (error) {
      console.error('Failed to fetch time slots:', error);
      showMessage('Failed to load time slots. Please try again.', 'error');
      setAllTimeSlots([]);
    } finally {
      setSlotLoading(false);
    }
  };

  // NEW: User booking management functions
  const fetchUserBookings = async (page = 1) => {
    setBookingLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/bookings/my-bookings?page=${page}&limit=20&sortBy=date&sortOrder=desc`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      const data = await response.json();
      if (data.success) {
        setUserBookings(data.data.bookings);
        setBookingStats(data.data.statistics);
        setBookingPagination(data.data.pagination);
        setCurrentBookingPage(page);
      }
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      showMessage('Failed to load user bookings', 'error');
    } finally {
      setBookingLoading(false);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/bookings/booking/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        showMessage('Booking deleted successfully', 'success');
        fetchUserBookings(currentBookingPage);
      } else {
        throw new Error(data.message || 'Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      showMessage(`Failed to delete booking: ${error.message}`, 'error');
    }
  };

  const bulkDeleteBookings = async () => {
    if (selectedBookings.size === 0) {
      showMessage('Please select bookings to delete', 'error');
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete ${selectedBookings.size} booking(s)?`)) {
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/bookings/bulk-delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookingIds: Array.from(selectedBookings) })
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        showMessage(`${data.deletedCount} booking(s) deleted successfully`, 'success');
        setSelectedBookings(new Set());
        fetchUserBookings(currentBookingPage);
      } else {
        throw new Error(data.message || 'Failed to delete bookings');
      }
    } catch (error) {
      console.error('Error bulk deleting bookings:', error);
      showMessage(`Failed to delete bookings: ${error.message}`, 'error');
    }
  };

  const toggleBookingSelection = (bookingId) => {
    const newSelected = new Set(selectedBookings);
    if (newSelected.has(bookingId)) {
      newSelected.delete(bookingId);
    } else {
      newSelected.add(bookingId);
    }
    setSelectedBookings(newSelected);
  };

  const selectAllBookings = () => {
    const allBookingIds = Object.values(userBookings).flat().map(booking => booking.id);
    setSelectedBookings(new Set(allBookingIds));
  };

  const clearBookingSelection = () => {
    setSelectedBookings(new Set());
  };

  // Enhanced multi-slot selection functions
  const toggleSlotSelection = (courtId, timeSlotId) => {
    if (!bulkActionMode && !multiCourtMode) return;
    
    if (bulkActionMode && selectedCourt && selectedCourt !== courtId) {
      showMessage('You can only select slots from one court at a time in bulk mode', 'warning');
      return;
    }
    
    const slotKey = `${courtId}-${timeSlotId}`;
    const newSelectedSlots = new Set(selectedSlots);
    
    if (newSelectedSlots.has(slotKey)) {
      newSelectedSlots.delete(slotKey);
      if (newSelectedSlots.size === 0) {
        setSelectedCourt('');
        setSelectedCourts(new Set());
      }
    } else {
      newSelectedSlots.add(slotKey);
      if (bulkActionMode) {
        setSelectedCourt(courtId);
      }
      if (multiCourtMode) {
        setSelectedCourts(prev => new Set(prev).add(courtId));
      }
    }
    
    setSelectedSlots(newSelectedSlots);
  };

  const toggleCourtSelection = (courtId) => {
    if (!multiCourtMode) return;
    
    const newSelectedCourts = new Set(selectedCourts);
    
    if (newSelectedCourts.has(courtId)) {
      newSelectedCourts.delete(courtId);
      // Remove all slots from this court
      const newSelectedSlots = new Set();
      selectedSlots.forEach(slotKey => {
        if (!slotKey.startsWith(courtId + '-')) {
          newSelectedSlots.add(slotKey);
        }
      });
      setSelectedSlots(newSelectedSlots);
    } else {
      newSelectedCourts.add(courtId);
    }
    
    setSelectedCourts(newSelectedCourts);
  };

  const clearAllSelections = () => {
    setSelectedSlots(new Set());
    setSelectedCourt('');
    setSelectedCourts(new Set());
    setBulkActionMode(false);
    setMultiCourtMode(false);
  };

  const enterBulkMode = () => {
    clearAllSelections();
    setBulkActionMode(true);
    showMessage('Single court multi-slot selection mode enabled. Click on slots to select them.', 'info');
  };

  const enterMultiCourtMode = () => {
    clearAllSelections();
    setMultiCourtMode(true);
    showMessage('Multi-court selection mode enabled. Select courts and slots.', 'info');
  };

  // Enhanced booking modal functions
  const openBookingModal = (courtId, timeSlotIds, courtName, timeSlotNames, options = {}) => {
    const { isBulk = false, isMultiCourt = false, courtIds = [] } = options;
    
    setBookingModalData({
      courtId: courtId || '',
      courtIds: Array.isArray(courtIds) ? courtIds : (courtId ? [courtId] : []),
      timeSlotIds: Array.isArray(timeSlotIds) ? timeSlotIds : [timeSlotIds],
      courtName,
      timeSlots: Array.isArray(timeSlotNames) ? timeSlotNames : [timeSlotNames],
      booking_by: '',
      isBulk,
      isMultiCourt,
      isWeekly: false
    });
    setApprovalPhoto(null);
    setPhotoPreview(null);
    setShowBookingModal(true);
  };

  const openWeeklyModal = () => {
    setWeeklyBookingData({
      startDate: selectedDate,
      endDate: '',
      weekdays: [],
      courtIds: Array.from(selectedCourts),
      timeSlotIds: Array.from(selectedSlots).map(slot => slot.split('-')[1]),
      booking_by: ''
    });
    setApprovalPhoto(null);
    setPhotoPreview(null);
    setShowWeeklyModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setBookingModalData({
      courtId: '',
      courtIds: [],
      timeSlotIds: [],
      courtName: '',
      timeSlots: [],
      booking_by: '',
      isBulk: false,
      isMultiCourt: false,
      isWeekly: false
    });
    setApprovalPhoto(null);
    setPhotoPreview(null);
  };

  const closeWeeklyModal = () => {
    setShowWeeklyModal(false);
    setWeeklyBookingData({
      startDate: '',
      endDate: '',
      weekdays: [],
      courtIds: [],
      timeSlotIds: [],
      booking_by: ''
    });
    setApprovalPhoto(null);
    setPhotoPreview(null);
  };

  // Handle file upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showMessage('Please select a valid image file', 'error');
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        showMessage('File size must be less than 5MB', 'error');
        return;
      }
      
      setApprovalPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPhotoPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Enhanced booking submit functions
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookingModalData.booking_by.trim()) {
      showMessage('Please enter who is booking this court', 'error');
      return;
    }

    if (!approvalPhoto) {
      showMessage('Please upload an approval photo', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('status', 'booked');
    formData.append('date', selectedDate);
    formData.append('booking_by', bookingModalData.booking_by.trim());
    formData.append('approval_photo', approvalPhoto);

    try {
      const token = localStorage.getItem('adminToken');
      let response;
      let endpoint;

      setUploadProgress(25);

      if (bookingModalData.isMultiCourt) {
        // Multi-court booking
        formData.append('courtIds', JSON.stringify(bookingModalData.courtIds));
        formData.append('timeSlotIds', JSON.stringify(bookingModalData.timeSlotIds));
        endpoint = `${API_BASE_URL}/api/bookings/multi-court`;
      } else if (bookingModalData.isBulk) {
        // Bulk booking (single court)
        formData.append('courtId', bookingModalData.courtId);
        formData.append('timeSlotIds', JSON.stringify(bookingModalData.timeSlotIds));
        endpoint = `${API_BASE_URL}/api/bookings/bulk-update`;
      } else {
        // Single booking
        formData.append('courtId', bookingModalData.courtId);
        formData.append('timeSlotId', bookingModalData.timeSlotIds[0]);
        endpoint = `${API_BASE_URL}/api/bookings/update`;
      }

      setUploadProgress(50);

      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      setUploadProgress(75);

      const data = await response.json();
      setUploadProgress(100);

      if (response.ok && data.success) {
        const slotCount = bookingModalData.timeSlotIds.length;
        const courtCount = bookingModalData.isMultiCourt ? bookingModalData.courtIds.length : 1;
        
        showMessage(
          `Successfully booked ${slotCount} slot${slotCount > 1 ? 's' : ''} across ${courtCount} court${courtCount > 1 ? 's' : ''}`,
          'success'
        );
        
        fetchCourtStatus();
        clearAllSelections();
        closeBookingModal();
      } else {
        throw new Error(data.error || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      showMessage(`Booking failed: ${error.message}`, 'error');
    } finally {
      setUploadProgress(0);
    }
  };

  const handleWeeklyBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!weeklyBookingData.booking_by.trim()) {
      showMessage('Please enter who is booking these courts', 'error');
      return;
    }

    if (!approvalPhoto) {
      showMessage('Please upload an approval photo', 'error');
      return;
    }

    if (weeklyBookingData.weekdays.length === 0) {
      showMessage('Please select at least one weekday', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('courtIds', JSON.stringify(weeklyBookingData.courtIds));
    formData.append('timeSlotIds', JSON.stringify(weeklyBookingData.timeSlotIds));
    formData.append('status', 'booked');
    formData.append('startDate', weeklyBookingData.startDate);
    formData.append('endDate', weeklyBookingData.endDate);
    formData.append('weekdays', JSON.stringify(weeklyBookingData.weekdays));
    formData.append('booking_by', weeklyBookingData.booking_by.trim());
    formData.append('approval_photo', approvalPhoto);

    try {
      const token = localStorage.getItem('adminToken');
      setUploadProgress(25);

      const response = await fetch(`${API_BASE_URL}/api/bookings/weekly-update`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      setUploadProgress(75);
      const data = await response.json();
      setUploadProgress(100);

      if (response.ok && data.success) {
        showMessage(
          `Successfully created weekly bookings: ${data.successfulSlots || 0} slots booked`,
          'success'
        );
        
        fetchCourtStatus();
        clearAllSelections();
        closeWeeklyModal();
      } else {
        throw new Error(data.error || 'Weekly booking failed');
      }
    } catch (error) {
      console.error('Weekly booking error:', error);
      showMessage(`Weekly booking failed: ${error.message}`, 'error');
    } finally {
      setUploadProgress(0);
    }
  };

  // Handle bulk actions from selected slots
  const handleBulkBooking = () => {
    if (selectedSlots.size === 0) {
      showMessage('Please select slots to book', 'error');
      return;
    }

    if (bulkActionMode) {
      // Single court bulk booking
      const court = courtData.find(c => c.id === selectedCourt);
      if (!court) return;

      const timeSlotIds = Array.from(selectedSlots).map(slotKey => slotKey.split('-')[1]);
      const timeSlotNames = timeSlotIds.map(slotId => court.slots[slotId]?.time || '').filter(Boolean);

      openBookingModal(
        selectedCourt,
        timeSlotIds,
        court.name,
        timeSlotNames,
        { isBulk: true }
      );
    } else if (multiCourtMode) {
      // Multi-court booking
      const courtIds = Array.from(selectedCourts);
      const timeSlotIds = [...new Set(Array.from(selectedSlots).map(slotKey => slotKey.split('-')[1]))];
      
      const courtNames = courtIds.map(courtId => {
        const court = courtData.find(c => c.id === courtId);
        return court ? court.name : 'Unknown';
      }).join(', ');

      const timeSlotNames = timeSlotIds.map(slotId => {
        const slot = timeSlots.find(s => s.id.toString() === slotId);
        return slot ? slot.formatted_slot : 'Unknown';
      });

      openBookingModal(
        null,
        timeSlotIds,
        courtNames,
        timeSlotNames,
        { isMultiCourt: true, courtIds }
      );
    }
  };

  // Photo viewing function
  const viewApprovalPhoto = (photoKey) => {
    if (!photoKey) return;
    
    try {
      const cleanKey = photoKey.startsWith('approval-photos/') 
        ? photoKey 
        : `approval-photos/${photoKey}`;
      
      const imageUrl = `https://${AWS_CONFIG.bucketName}.s3.${AWS_CONFIG.region}.amazonaws.com/${cleanKey}`;
      
      setCurrentPhoto({
        url: imageUrl,
        key: photoKey
      });
      setShowPhotoModal(true);
      
    } catch (error) {
      console.error('Error constructing photo URL:', error);
      showMessage('Failed to load approval photo', 'error');
    }
  };

  // Enhanced status change handling
  const handleStatusChange = (courtId, timeSlotId, newStatus) => {
    if (newStatus && newStatus !== 'select') {
      if (newStatus === 'booked') {
        const court = courtData.find(c => c.id === courtId);
        const slot = court?.slots[timeSlotId];
        
        if (court && slot) {
          openBookingModal(courtId, timeSlotId, court.name, slot.time);
        }
      } else {
        updateBookingStatus(courtId, timeSlotId, newStatus);
      }
    }
  };

  // Booking status update function
  const updateBookingStatus = async (courtId, timeSlotId, newStatus, booking_by = null) => {
    const slotKey = `${courtId}-${timeSlotId}`;
    
    if (updatingSlots.has(slotKey)) {
      return;
    }

    setUpdatingSlots(prev => new Set(prev).add(slotKey));
    
    try {
      const token = localStorage.getItem('adminToken');
      
      const requestBody = {
        courtId,
        timeSlotId,
        status: newStatus,
        date: selectedDate
      };

      if (newStatus === 'booked' && booking_by) {
        requestBody.booking_by = booking_by;
      }
      
      const response = await fetch(`${API_BASE_URL}/api/bookings/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      if (data.success) {
        setCourtData(prevData => 
          prevData.map(court => 
            court.id === courtId 
              ? {
                  ...court,
                  slots: {
                    ...court.slots,
                    [timeSlotId]: {
                      ...court.slots[timeSlotId],
                      status: newStatus,
                      booking_by: booking_by || null,
                      approval_photo_key: data.booking?.approval_photo_key || null,
                      approval_photo_url: data.booking?.approval_photo_url || null
                    }
                  }
                }
              : court
          )
        );
        
        showMessage(data.message || `Court slot updated to ${newStatus}`, 'success');
      } else {
        throw new Error(data.error || 'Update failed');
      }
    } catch (error) {
      console.error('Failed to update booking:', error);
      showMessage(`Failed to update booking: ${error.message}`, 'error');
      fetchCourtStatus();
    } finally {
      setUpdatingSlots(prev => {
        const newSet = new Set(prev);
        newSet.delete(slotKey);
        return newSet;
      });
    }
  };

  // Time slot management functions
  const createTimeSlot = async (e) => {
    e.preventDefault();
    
    if (!newSlot.hour && newSlot.hour !== 0) {
      showMessage('Please enter a valid hour (0-23)', 'error');
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/timeslots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ hour: parseInt(newSlot.hour) })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage('Time slot created successfully', 'success');
        setNewSlot({ hour: '' });
        fetchTimeSlots();
      } else {
        showMessage(data.error || 'Failed to create time slot', 'error');
      }
    } catch (error) {
      console.error('Error creating time slot:', error);
      showMessage('Failed to create time slot. Please try again.', 'error');
    }
  };

  const editTimeSlot = async (slotId, newHour) => {
    if (newHour < 0 || newHour > 23) {
      showMessage('Hour must be between 0 and 23', 'error');
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/timeslots/${slotId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ hour: newHour })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage('Time slot updated successfully', 'success');
        setEditingSlot(null);
        setEditSlotValue('');
        fetchTimeSlots();
      } else {
        showMessage(data.error || 'Failed to update time slot', 'error');
      }
    } catch (error) {
      console.error('Error updating time slot:', error);
      showMessage('Failed to update time slot. Please try again.', 'error');
    }
  };

  const deleteTimeSlot = async (id) => {
    if (!window.confirm('Are you sure you want to delete this time slot? This action cannot be undone.')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/timeslots/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage('Time slot deleted successfully', 'success');
        fetchTimeSlots();
      } else {
        showMessage(data.error || 'Failed to delete time slot', 'error');
      }
    } catch (error) {
      console.error('Error deleting time slot:', error);
      showMessage('Failed to delete time slot. Please try again.', 'error');
    }
  };

  const bulkCreateTimeSlots = async (e) => {
    e.preventDefault();
    
    if ((!bulkCreate.startHour && bulkCreate.startHour !== 0) || (!bulkCreate.endHour && bulkCreate.endHour !== 0)) {
      showMessage('Please enter valid start and end hours', 'error');
      return;
    }
    
    if (bulkCreate.startHour >= bulkCreate.endHour) {
      showMessage('Start hour must be less than end hour', 'error');
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/timeslots/bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          startHour: parseInt(bulkCreate.startHour),
          endHour: parseInt(bulkCreate.endHour)
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage(data.message || 'Time slots created successfully', 'success');
        setBulkCreate({ startHour: '', endHour: '' });
        fetchTimeSlots();
      } else {
        showMessage(data.error || 'Failed to create time slots', 'error');
      }
    } catch (error) {
      console.error('Error creating bulk time slots:', error);
      showMessage('Failed to create time slots. Please try again.', 'error');
    }
  };

  // Sports management functions
  const createSport = async (e) => {
    e.preventDefault();
    
    if (!newSport.id || !newSport.name) {
      showMessage('Please fill in both Sport ID and Name', 'error');
      return;
    }
    
    setSportLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/sports/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSport)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage(`Sport "${newSport.name}" created successfully with courts!`, 'success');
        setNewSport({ id: '', name: '' });
        fetchInitialData();
        fetchSportsWithCourts();
      } else {
        showMessage(data.error || 'Failed to create sport', 'error');
      }
    } catch (error) {
      console.error('Error creating sport:', error);
      showMessage('Failed to create sport. Please try again.', 'error');
    } finally {
      setSportLoading(false);
    }
  };

  const updateCourtCount = async (sportId, courtCount) => {
    setCourtUpdateLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/sports/${sportId}/courts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courtCount: parseInt(courtCount) })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showMessage(data.message || 'Court count updated successfully', 'success');
        setEditingCourt(null);
        setNewCourtCount('');
        fetchSportsWithCourts();
        fetchInitialData();
      } else {
        showMessage(data.error || 'Failed to update court count', 'error');
      }
    } catch (error) {
      console.error('Error updating court count:', error);
      showMessage('Failed to update court count. Please try again.', 'error');
    } finally {
      setCourtUpdateLoading(false);
    }
  };

  // Utility functions
  const handleEditSlot = (slot) => {
    setEditingSlot(slot._id);
    setEditSlotValue(slot.hour);
  };

  const handleSaveEdit = () => {
    const hour = parseInt(editSlotValue);
    if (isNaN(hour)) {
      showMessage('Please enter a valid hour number', 'error');
      return;
    }
    editTimeSlot(editingSlot, hour);
  };

  const handleCancelEdit = () => {
    setEditingSlot(null);
    setEditSlotValue('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#22c55e';
      case 'booked': return '#ef4444';
      case 'closed': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return '✓';
      case 'booked': return '✗';
      case 'closed': return '⚠';
      default: return '?';
    }
  };

  const formatTimeSlot = (hour) => {
    const date = new Date(0, 0, 0, hour, 0, 0);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="admin-court-container">
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="admin-court-container">
        <div className="admin-login-section">
          <div className="admin-login-card">
            <h1>Admin Court Management</h1>
            <p>Please login to access the admin panel</p>
            
            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  required
                  className="admin-input"
                  placeholder="Enter your admin username"
                  disabled={loginLoading}
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                  className="admin-input"
                  placeholder="Enter your password"
                  disabled={loginLoading}
                />
              </div>

              {loginError && <div className="error-message">{loginError}</div>}

              <button type="submit" className="admin-login-btn" disabled={loginLoading}>
                {loginLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Main admin interface
  return (
    <div className="admin-court-container">
      <header className="admin-court-header">
        <div className="admin-header-content">
          <h1>Court Management Admin Panel</h1>
          <div className="admin-user-info">
            <span>Welcome, {adminUser?.username}</span>
            <button onClick={handleLogout} className="admin-logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="admin-tabs">
        <button 
          className={activeTab === 'court-status' ? 'active' : ''}
          onClick={() => setActiveTab('court-status')}
        >
          Court Status Management
        </button>
        <button 
          className={activeTab === 'sports' ? 'active' : ''}
          onClick={() => setActiveTab('sports')}
        >
          Sports Management
        </button>
        <button 
          className={activeTab === 'time-slots' ? 'active' : ''}
          onClick={() => setActiveTab('time-slots')}
        >
          Time Slot Management
        </button>
        <button 
          className={activeTab === 'user-bookings' ? 'active' : ''}
          onClick={() => setActiveTab('user-bookings')}
        >
          User Bookings
        </button>
      </nav>

      {message && (
        <div className={`admin-message ${messageType}`}>
          {message}
        </div>
      )}

      {/* Enhanced Booking Modal */}
      {showBookingModal && (
        <div className="modal-overlay">
          <div className="booking-modal enhanced">
            <div className="modal-header">
              <h3>
                {bookingModalData.isMultiCourt ? 'Book Multiple Courts' : 
                 bookingModalData.isBulk ? 'Book Multiple Slots' : 'Book Court Slot'}
              </h3>
              <button onClick={closeBookingModal} className="modal-close-btn">×</button>
            </div>
            <div className="modal-content">
              <div className="booking-info">
                <p><strong>Court:</strong> {bookingModalData.courtName}</p>
                <p><strong>Time:</strong> {
                  bookingModalData.isBulk || bookingModalData.isMultiCourt
                    ? `${bookingModalData.timeSlots.length} slots: ${bookingModalData.timeSlots.join(', ')}`
                    : bookingModalData.timeSlots[0]
                }</p>
                <p><strong>Date:</strong> {selectedDate}</p>
              </div>
              
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label htmlFor="booking_by">Booked By: *</label>
                  <input
                    type="text"
                    id="booking_by"
                    value={bookingModalData.booking_by}
                    onChange={(e) => setBookingModalData({
                      ...bookingModalData,
                      booking_by: e.target.value
                    })}
                    required
                    className="admin-input"
                    placeholder="Enter name of person booking"
                    autoFocus
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="approval_photo">Approval Photo: *</label>
                  <input
                    type="file"
                    id="approval_photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    required
                    className="admin-input file-input"
                  />
                  <p className="form-help">Upload an approval photo (max 5MB, images only)</p>
                </div>

                {photoPreview && (
                  <div className="photo-preview">
                    <img src={photoPreview} alt="Preview" />
                    <button 
                      type="button" 
                      onClick={() => {
                        setPhotoPreview(null);
                        setApprovalPhoto(null);
                      }}
                      className="remove-photo-btn"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="upload-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p>Uploading... {uploadProgress}%</p>
                  </div>
                )}

                <div className="modal-actions">
                  <button 
                    type="submit" 
                    className="admin-btn primary"
                    disabled={uploadProgress > 0 && uploadProgress < 100}
                  >
                    {uploadProgress > 0 ? 'Uploading...' : 'Confirm Booking'}
                  </button>
                  <button type="button" onClick={closeBookingModal} className="admin-btn secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Booking Modal */}
      {showWeeklyModal && (
        <div className="modal-overlay">
          <div className="booking-modal weekly enhanced">
            <div className="modal-header">
              <h3>Weekly Court Booking</h3>
              <button onClick={closeWeeklyModal} className="modal-close-btn">×</button>
            </div>
            <div className="modal-content">
              <div className="booking-info">
                <p><strong>Courts:</strong> {weeklyBookingData.courtIds.length} selected</p>
                <p><strong>Time Slots:</strong> {weeklyBookingData.timeSlotIds.length} selected</p>
              </div>
              
              <form onSubmit={handleWeeklyBookingSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="start_date">Start Date: *</label>
                    <input
                      type="date"
                      id="start_date"
                      value={weeklyBookingData.startDate}
                      onChange={(e) => setWeeklyBookingData({
                        ...weeklyBookingData,
                        startDate: e.target.value
                      })}
                      required
                      className="admin-input"
                      min={dateRangeInfo?.dateRange?.minDate}
                      max={dateRangeInfo?.dateRange?.maxDate}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="end_date">End Date: *</label>
                    <input
                      type="date"
                      id="end_date"
                      value={weeklyBookingData.endDate}
                      onChange={(e) => setWeeklyBookingData({
                        ...weeklyBookingData,
                        endDate: e.target.value
                      })}
                      required
                      className="admin-input"
                      min={weeklyBookingData.startDate}
                      max={dateRangeInfo?.dateRange?.maxDate}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Select Weekdays: *</label>
                  <div className="weekday-checkboxes">
                    {WEEKDAY_OPTIONS.map(day => (
                      <label key={day.value} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={weeklyBookingData.weekdays.includes(day.value)}
                          onChange={(e) => {
                            const newWeekdays = e.target.checked
                              ? [...weeklyBookingData.weekdays, day.value]
                              : weeklyBookingData.weekdays.filter(d => d !== day.value);
                            setWeeklyBookingData({
                              ...weeklyBookingData,
                              weekdays: newWeekdays
                            });
                          }}
                        />
                        {day.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="weekly_booking_by">Booked By: *</label>
                  <input
                    type="text"
                    id="weekly_booking_by"
                    value={weeklyBookingData.booking_by}
                    onChange={(e) => setWeeklyBookingData({
                      ...weeklyBookingData,
                      booking_by: e.target.value
                    })}
                    required
                    className="admin-input"
                    placeholder="Enter name of person booking"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="weekly_approval_photo">Approval Photo: *</label>
                  <input
                    type="file"
                    id="weekly_approval_photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    required
                    className="admin-input file-input"
                  />
                  <p className="form-help">Upload an approval photo (max 5MB, images only)</p>
                </div>

                {photoPreview && (
                  <div className="photo-preview">
                    <img src={photoPreview} alt="Preview" />
                    <button 
                      type="button" 
                      onClick={() => {
                        setPhotoPreview(null);
                        setApprovalPhoto(null);
                      }}
                      className="remove-photo-btn"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="upload-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p>Uploading... {uploadProgress}%</p>
                  </div>
                )}

                <div className="modal-actions">
                  <button 
                    type="submit" 
                    className="admin-btn primary"
                    disabled={uploadProgress > 0 && uploadProgress < 100}
                  >
                    {uploadProgress > 0 ? 'Creating...' : 'Create Weekly Booking'}
                  </button>
                  <button type="button" onClick={closeWeeklyModal} className="admin-btn secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Photo Viewing Modal */}
      {showPhotoModal && (
        <div className="modal-overlay">
          <div className="photo-modal">
            <div className="modal-header">
              <h3>Approval Photo</h3>
              <button onClick={() => setShowPhotoModal(false)} className="modal-close-btn">×</button>
            </div>
            <div className="modal-content">
              {currentPhoto && (
                <div className="photo-viewer">
                  <img src={currentPhoto.url} alt="Approval Photo" />
                  <p className="photo-info">Photo Key: {currentPhoto.key}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="admin-content">
        {activeTab === 'court-status' && (
          <div className="court-status-section">
            <div className="admin-controls">
              <div className="control-group">
                <label>Sport:</label>
                <select 
                  value={selectedSport} 
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="admin-select"
                  disabled={courtLoading}
                >
                  <option value="">Select a sport</option>
                  {sports.map(sport => (
                    <option key={sport.id || sport._id} value={sport.id || sport._id}>
                      {sport.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="control-group">
                <label>Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="admin-input"
                  disabled={courtLoading}
                  min={dateRangeInfo?.dateRange?.minDate}
                  max={dateRangeInfo?.dateRange?.maxDate}
                />
              </div>

              <button 
                onClick={fetchCourtStatus}
                className="admin-btn secondary"
                disabled={courtLoading}
              >
                Refresh Data
              </button>

              {/* Enhanced selection controls */}
              {!bulkActionMode && !multiCourtMode ? (
                <div className="selection-controls">
                  <button 
                    onClick={enterBulkMode}
                    className="admin-btn primary"
                    disabled={courtLoading || courtData.length === 0}
                  >
                    Single Court Multi-Select
                  </button>
                  <button 
                    onClick={enterMultiCourtMode}
                    className="admin-btn primary"
                    disabled={courtLoading || courtData.length === 0}
                  >
                    Multi-Court Select
                  </button>
                </div>
              ) : (
                <div className="bulk-controls">
                  <span className="selected-count">
                    {selectedSlots.size} slots selected
                    {multiCourtMode && ` across ${selectedCourts.size} courts`}
                  </span>
                  <button 
                    onClick={handleBulkBooking}
                    className="admin-btn primary"
                    disabled={selectedSlots.size === 0}
                  >
                    Book Selected
                  </button>
                  {multiCourtMode && selectedSlots.size > 0 && (
                    <button 
                      onClick={openWeeklyModal}
                      className="admin-btn primary"
                      disabled={selectedSlots.size === 0}
                    >
                      Weekly Booking
                    </button>
                  )}
                  <button 
                    onClick={clearAllSelections}
                    className="admin-btn secondary"
                  >
                    Cancel Selection
                  </button>
                </div>
              )}
            </div>

            {courtLoading ? (
              <div className="loading-section">
                <div className="loading-spinner"></div>
                <p>Loading court data...</p>
              </div>
            ) : (
              <div className="courts-management">
                {courtData.length === 0 ? (
                  <div className="no-data-message">
                    <h3>No court data available</h3>
                    <p><strong>Troubleshooting steps:</strong></p>
                    <ol>
                      <li>Go to <strong>Sports Management</strong> tab and create a sport</li>
                      <li>Go to <strong>Time Slot Management</strong> tab and create time slots (recommended: 7-22)</li>
                      <li>Return here and select the sport from dropdown</li>
                      <li>Click <strong>Refresh Data</strong> button</li>
                    </ol>
                    <div className="debug-info">
                      <p>Debug Info:</p>
                      <ul>
                        <li>Sports available: {sports.length}</li>
                        <li>Selected sport: {selectedSport || 'None'}</li>
                        <li>Selected date: {selectedDate}</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="status-legend">
                      <h4>Status Legend:</h4>
                      <div className="legend-items">
                        <span className="legend-item available">✓ Available</span>
                        <span className="legend-item booked">✗ Booked</span>
                        <span className="legend-item closed">⚠ Closed</span>
                      </div>
                      {(bulkActionMode || multiCourtMode) && (
                        <div className="selection-help">
                          <p>
                            {bulkActionMode ? 'Single court mode: Select multiple slots from one court' : 
                             'Multi-court mode: Select courts and slots for advanced booking'}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Enhanced court grid */}
                    <div className="courts-grid">
                      {courtData.map(court => (
                        <div key={court.id} className={`court-card enhanced ${
                          multiCourtMode && selectedCourts.has(court.id) ? 'court-selected' : ''
                        }`}>
                          <div className="court-header">
                            <h3>{court.name}</h3>
                            {multiCourtMode && (
                              <button
                                onClick={() => toggleCourtSelection(court.id)}
                                className={`court-select-btn ${selectedCourts.has(court.id) ? 'selected' : ''}`}
                              >
                                {selectedCourts.has(court.id) ? '✓ Selected' : 'Select Court'}
                              </button>
                            )}
                          </div>
                          <div className="slots-grid">
                            {Object.entries(court.slots).map(([slotId, slot]) => {
                              const slotKey = `${court.id}-${slotId}`;
                              const isUpdating = updatingSlots.has(slotKey);
                              const isSelected = selectedSlots.has(slotKey);
                              const canSelect = (bulkActionMode || multiCourtMode) && 
                                               (!bulkActionMode || !selectedCourt || selectedCourt === court.id);
                              
                              return (
                                <div 
                                  key={slotId} 
                                  className={`slot-item enhanced ${isSelected ? 'selected' : ''} ${
                                    canSelect ? 'selectable' : ''
                                  }`}
                                  onClick={() => canSelect && toggleSlotSelection(court.id, slotId)}
                                  style={{ cursor: canSelect ? 'pointer' : 'default' }}
                                >
                                  <div className="slot-time">{slot.time}</div>
                                  <div className="slot-status-container">
                                    <div 
                                      className={`status-indicator ${slot.status}`}
                                      style={{ backgroundColor: getStatusColor(slot.status) }}
                                    >
                                      {getStatusIcon(slot.status)} {slot.status.toUpperCase()}
                                    </div>
                                    
                                    {/* Enhanced booking info */}
                                    {slot.status === 'booked' && (
                                      <div className="booking-info-display enhanced">
                                        <div className="booking-details">
                                          <small><strong>Booked by:</strong> {slot.booking_by}</small>
                                          {slot.approval_photo_key && (
                                            <button 
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                viewApprovalPhoto(slot.approval_photo_key);
                                              }}
                                              className="photo-view-btn"
                                              title="View approval photo"
                                            >
                                              📷 View Photo
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {!bulkActionMode && !multiCourtMode && (
                                      <select
                                        value="select"
                                        onChange={(e) => handleStatusChange(court.id, slotId, e.target.value)}
                                        className="status-dropdown"
                                        disabled={isUpdating}
                                        title="Change status"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <option value="select">Change Status</option>
                                        <option value="available">✓ Available</option>
                                        <option value="booked">✗ Booked</option>
                                        <option value="closed">⚠ Closed</option>
                                      </select>
                                    )}
                                    
                                    {isUpdating && (
                                      <div className="updating-indicator">
                                        <div className="mini-spinner"></div>
                                      </div>
                                    )}

                                    {(bulkActionMode || multiCourtMode) && isSelected && (
                                      <div className="selection-indicator">✓</div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Sports Management Tab */}
        {activeTab === 'sports' && (
          <div className="sports-section">
            <div className="sports-forms">
              <div className="form-section">
                <h3>Add New Sport</h3>
                <form onSubmit={createSport}>
                  <div className="form-group">
                    <label>Sport ID:</label>
                    <input
                      type="text"
                      value={newSport.id}
                      onChange={(e) => setNewSport({...newSport, id: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                      required
                      className="admin-input"
                      placeholder="e.g., tennis (lowercase, no spaces)"
                      disabled={sportLoading}
                    />
                  </div>
                  <div className="form-group">
                    <label>Sport Name:</label>
                    <input
                      type="text"
                      value={newSport.name}
                      onChange={(e) => setNewSport({...newSport, name: e.target.value})}
                      required
                      className="admin-input"
                      placeholder="e.g., Tennis"
                      disabled={sportLoading}
                    />
                  </div>
                  <button type="submit" className="admin-btn primary" disabled={sportLoading}>
                    {sportLoading ? 'Creating...' : 'Add Sport'}
                  </button>
                </form>
                <p className="form-help">
                  Creating a sport will automatically generate 4 courts for that sport.
                </p>
              </div>
            </div>

            <div className="existing-sports">
              <h3>Existing Sports ({sportsWithCourts.length} total)</h3>
              <div className="sports-list">
                {sportsWithCourts.length === 0 ? (
                  <div className="no-data-message">
                    <p>No sports available. Create your first sport above.</p>
                  </div>
                ) : (
                  sportsWithCourts.map((sport) => (
                    <div key={sport.id || sport._id} className="sport-card enhanced">
                      <div className="sport-info">
                        <h4>{sport.name}</h4>
                        <p>ID: {sport.id || sport._id}</p>
                        <div className="court-count-section">
                          {editingCourt === sport._id ? (
                            <div className="court-edit-form">
                              <label>Number of Courts:</label>
                              <div className="court-edit-controls">
                                <input
                                  type="number"
                                  min="1"
                                  max="20"
                                  value={newCourtCount}
                                  onChange={(e) => setNewCourtCount(e.target.value)}
                                  className="admin-input small"
                                  placeholder="1-20"
                                  autoFocus
                                />
                                <div className="edit-actions">
                                  <button 
                                    onClick={() => updateCourtCount(sport._id, newCourtCount)}
                                    className="admin-btn primary small"
                                    disabled={courtUpdateLoading || !newCourtCount}
                                  >
                                    {courtUpdateLoading ? 'Updating...' : 'Save'}
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setEditingCourt(null);
                                      setNewCourtCount('');
                                    }}
                                    className="admin-btn secondary small"
                                    disabled={courtUpdateLoading}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="court-count-display">
                              <span className="court-count">
                                <strong>{sport.courtCount || 0}</strong> Courts
                              </span>
                              <button 
                                onClick={() => {
                                  setEditingCourt(sport._id);
                                  setNewCourtCount(sport.courtCount || 4);
                                }}
                                className="admin-btn secondary small"
                              >
                                Edit Courts
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Time Slots Management Tab */}
        {activeTab === 'time-slots' && (
          <div className="time-slots-section">
            <div className="time-slot-forms">
              <div className="form-section">
                <h3>Create New Time Slot</h3>
                <form onSubmit={createTimeSlot}>
                  <div className="form-group">
                    <label>Hour (0-23):</label>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={newSlot.hour}
                      onChange={(e) => setNewSlot({ hour: e.target.value })}
                      required
                      className="admin-input"
                      placeholder="e.g., 14 for 2:00 PM"
                    />
                  </div>
                  <button type="submit" className="admin-btn primary">
                    Create Time Slot
                  </button>
                </form>
              </div>

              <div className="form-section">
                <h3>Bulk Create Time Slots</h3>
                <form onSubmit={bulkCreateTimeSlots}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Start Hour:</label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={bulkCreate.startHour}
                        onChange={(e) => setBulkCreate({...bulkCreate, startHour: e.target.value})}
                        required
                        className="admin-input"
                        placeholder="e.g., 7"
                      />
                    </div>
                    <div className="form-group">
                      <label>End Hour:</label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={bulkCreate.endHour}
                        onChange={(e) => setBulkCreate({...bulkCreate, endHour: e.target.value})}
                        required
                        className="admin-input"
                        placeholder="e.g., 22"
                      />
                    </div>
                  </div>
                  <button type="submit" className="admin-btn primary">
                    Create Time Slots Range
                  </button>
                </form>
                <p className="form-help">
                  Recommended: Create slots from 7 to 22 (7 AM to 10 PM)
                </p>
              </div>
            </div>

            {slotLoading ? (
              <div className="loading-section">
                <div className="loading-spinner"></div>
                <p>Loading time slots...</p>
              </div>
            ) : (
              <div className="existing-slots">
                <h3>Existing Time Slots ({allTimeSlots.length} total)</h3>
                <div className="slots-list">
                  {allTimeSlots.length === 0 ? (
                    <div className="no-data-message">
                      <h4>No time slots available</h4>
                      <p>Create your first time slot above.</p>
                      <p>Recommended: Create bulk slots from 7 to 22 (7 AM to 10 PM)</p>
                    </div>
                  ) : (
                    allTimeSlots.map((slot) => (
                      <div key={slot._id} className="slot-card">
                        <div className="slot-info">
                          {editingSlot === slot._id ? (
                            <div className="edit-slot-form">
                              <input
                                type="number"
                                min="0"
                                max="23"
                                value={editSlotValue}
                                onChange={(e) => setEditSlotValue(e.target.value)}
                                className="admin-input small"
                                autoFocus
                              />
                              <div className="edit-actions">
                                <button 
                                  onClick={handleSaveEdit}
                                  className="admin-btn primary small"
                                >
                                  Save
                                </button>
                                <button 
                                  onClick={handleCancelEdit}
                                  className="admin-btn secondary small"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <h4>{slot.formatted_slot || formatTimeSlot(slot.hour)}</h4>
                              <p>Hour: {slot.hour}</p>
                            </>
                          )}
                        </div>
                        <div className="slot-actions">
                          {editingSlot !== slot._id && (
                            <button 
                              onClick={() => handleEditSlot(slot)}
                              className="admin-btn secondary"
                            >
                              Edit
                            </button>
                          )}
                          <button 
                            onClick={() => deleteTimeSlot(slot._id)}
                            className="admin-btn danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* NEW: User Bookings Tab */}
        {activeTab === 'user-bookings' && (
          <div className="user-bookings-section">
            <div className="bookings-header">
              <h2>My Bookings</h2>
              <div className="bookings-stats">
                <div className="stat-card">
                  <span className="stat-number">{bookingStats.total || 0}</span>
                  <span className="stat-label">Total Bookings</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{bookingStats.byStatus?.booked || 0}</span>
                  <span className="stat-label">Active Bookings</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">{bookingStats.byStatus?.closed || 0}</span>
                  <span className="stat-label">Closed</span>
                </div>
              </div>
            </div>

            <div className="bookings-controls">
              <button 
                onClick={() => fetchUserBookings(currentBookingPage)}
                className="admin-btn secondary"
                disabled={bookingLoading}
              >
                Refresh Bookings
              </button>
              
              {selectedBookings.size > 0 && (
                <div className="bulk-controls">
                  <span className="selected-count">{selectedBookings.size} selected</span>
                  <button 
                    onClick={bulkDeleteBookings}
                    className="admin-btn danger"
                  >
                    Delete Selected
                  </button>
                  <button 
                    onClick={clearBookingSelection}
                    className="admin-btn secondary"
                  >
                    Clear Selection
                  </button>
                </div>
              )}
              
              {Object.keys(userBookings).length > 0 && selectedBookings.size === 0 && (
                <button 
                  onClick={selectAllBookings}
                  className="admin-btn secondary"
                >
                  Select All
                </button>
              )}
            </div>

            {bookingLoading ? (
              <div className="loading-section">
                <div className="loading-spinner"></div>
                <p>Loading your bookings...</p>
              </div>
            ) : Object.keys(userBookings).length === 0 ? (
              <div className="no-data-message">
                <h3>No bookings found</h3>
                <p>You haven't made any bookings yet.</p>
              </div>
            ) : (
              <>
                <div className="bookings-list">
                  {Object.entries(userBookings).map(([date, bookings]) => (
                    <div key={date} className="date-group">
                      <h3 className="date-header">{new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</h3>
                      
                      <div className="bookings-grid">
                        {bookings.map(booking => (
                          <div key={booking.id} className={`booking-card ${booking.status}`}>
                            <div className="booking-select">
                              <input
                                type="checkbox"
                                checked={selectedBookings.has(booking.id)}
                                onChange={() => toggleBookingSelection(booking.id)}
                                className="booking-checkbox"
                              />
                            </div>
                            
                            <div className="booking-info">
                              <div className="booking-court">
                                <strong>{booking.court.name}</strong>
                              </div>
                              <div className="booking-time">
                                {booking.timeSlot.formatted_slot}
                              </div>
                              <div className={`booking-status ${booking.status}`}>
                                {booking.status.toUpperCase()}
                              </div>
                              
                              {booking.booking_by && (
                                <div className="booking-by">
                                  Booked by: {booking.booking_by}
                                </div>
                              )}
                              
                              <div className="booking-dates">
                                <small>Created: {new Date(booking.created_at).toLocaleDateString()}</small>
                                {booking.updated_at !== booking.created_at && (
                                  <small>Updated: {new Date(booking.updated_at).toLocaleDateString()}</small>
                                )}
                              </div>
                            </div>

                            <div className="booking-actions">
                              {booking.approval_photo_url && (
                                <button 
                                  onClick={() => viewApprovalPhoto(booking.approval_photo_key)}
                                  className="admin-btn secondary small"
                                  title="View approval photo"
                                >
                                  📷 Photo
                                </button>
                              )}
                              
                              <button 
                                onClick={() => deleteBooking(booking.id)}
                                className="admin-btn danger small"
                                title="Delete booking"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {bookingPagination.totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      onClick={() => fetchUserBookings(currentBookingPage - 1)}
                      disabled={!bookingPagination.hasPrev}
                      className="admin-btn secondary"
                    >
                      Previous
                    </button>
                    
                    <span className="page-info">
                      Page {bookingPagination.page} of {bookingPagination.totalPages}
                    </span>
                    
                    <button 
                      onClick={() => fetchUserBookings(currentBookingPage + 1)}
                      disabled={!bookingPagination.hasNext}
                      className="admin-btn secondary"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourtManagement;
