import React, { useState, useEffect, useRef } from 'react';
import api from './api';
import './App.css';

interface Exercise {
  id: number;
  title: string;
  description: string;
  video_url: string;
  category: string;
  difficulty: string;
  position: string;
  session: number;
  program_type?: string;
}

export default function App() {
  // Authentication states
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  
  // Auth Form fields
  const [formUsername, setFormUsername] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const [formPassword, setFormPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [authSuccess, setAuthSuccess] = useState<string>('');

  // Daily statistics (mockable and dynamic)
  const [shots, setShots] = useState<number>(45);
  const [dribbles, setDribbles] = useState<number>(120);
  const [practiceTime, setPracticeTime] = useState<number>(25); // in minutes

  // AI Camera states
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ballPos, setBallPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  // Position & Schedule States
  const [selectedPosition, setSelectedPosition] = useState<string>('PG');
  const [programType, setProgramType] = useState<'Skills' | 'Physical'>('Skills');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [loadingExercises, setLoadingExercises] = useState<boolean>(false);

  // Video Player states
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string | null>(null);

  const positions = [
    { id: 'PG', name: 'Hậu vệ dẫn bóng', label: 'PG', icon: '⚡' },
    { id: 'SG', name: 'Hậu vệ ghi điểm', label: 'SG', icon: '🎯' },
    { id: 'SF', name: 'Tiền phong phụ', label: 'SF', icon: '🚀' },
    { id: 'PF', name: 'Tiền phong chính', label: 'PF', icon: '💪' },
    { id: 'C', name: 'Trung phong', label: 'C', icon: '🛡️' }
  ];

  const sessions = [1, 2, 3, 4];

  // Helper to extract YouTube embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  // Check login status from localStorage on load
  useEffect(() => {
    const savedUser = localStorage.getItem('basketball_user');
    if (savedUser) {
      setIsLoggedIn(true);
      setUsername(savedUser);
    }
  }, []);

  // Fetch exercises from backend
  const fetchExercises = async () => {
    setLoadingExercises(true);
    try {
      let url = '/exercises/recommend';
      const params: string[] = [];
      
      // Filter by selected position and program type
      params.push(`position=${selectedPosition}`);
      params.push(`program_type=${programType}`);
      
      if (filterCategory !== 'All') {
        params.push(`category=${filterCategory}`);
      }
      if (filterDifficulty !== 'All') {
        params.push(`difficulty=${filterDifficulty}`);
      }
      if (params.length > 0) {
        url += '?' + params.join('&');
      }

      const response = await api.get(url);
      if (Array.isArray(response.data)) {
        setExercises(response.data);
      } else {
        setExercises([]);
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
      // Fallback local mock exercises if backend is offline
      const mockAll: Exercise[] = [
        // ==================== SKILLS PROGRAMS (4 Sessions) ====================
        // PG
        { id: 1, title: 'Nhồi bóng chữ V', description: 'Luyện cảm giác bóng, kiểm soát bóng tốc độ cao bằng cả 2 tay.', video_url: 'https://www.youtube.com/watch?v=R9U0X8ZgUv0', category: 'Dribbling', difficulty: 'Beginner', position: 'PG', session: 1, program_type: 'Skills' },
        { id: 2, title: 'Chuyền bóng chính xác', description: 'Chuyền đẩy và chuyền đập đất chuẩn xác bằng hai tay.', video_url: 'https://www.youtube.com/watch?v=M2_sO7hVbWc', category: 'Passing', difficulty: 'Beginner', position: 'PG', session: 2, program_type: 'Skills' },
        { id: 3, title: 'Float Shot cận rổ', description: 'Ném bóng bổng vượt qua sự truy cản của các cầu thủ cao lớn.', video_url: 'https://www.youtube.com/watch?v=wX5y35d6XlI', category: 'Finishing', difficulty: 'Intermediate', position: 'PG', session: 3, program_type: 'Skills' },
        { id: 4, title: 'Phối hợp Pick & Roll', description: 'Chơi chiến thuật bù người chắn và cắt bóng ghi điểm.', video_url: 'https://www.youtube.com/watch?v=S0I9J_w_t6U', category: 'Tactics', difficulty: 'Advanced', position: 'PG', session: 4, program_type: 'Skills' },
        
        // SG
        { id: 5, title: 'Catch & Shoot cơ bản', description: 'Nhận bóng nhảy ném chuẩn kỹ thuật vẩy cổ tay đón bóng.', video_url: 'https://www.youtube.com/watch?v=6PzJ7q_oG8E', category: 'Shooting', difficulty: 'Beginner', position: 'SG', session: 1, program_type: 'Skills' },
        { id: 6, title: 'Chạy chỗ thoát screen', description: 'Chạy vòng qua cản đồng đội đón bóng ném rổ nhanh.', video_url: 'https://www.youtube.com/watch?v=n-W6P1_U71Q', category: 'Shooting', difficulty: 'Intermediate', position: 'SG', session: 2, program_type: 'Skills' },
        { id: 7, title: 'Step-back ném rổ', description: 'Giật lùi tạo khoảng trống ném rổ cực rộng khi bị chặn.', video_url: 'https://www.youtube.com/watch?v=Jm9n2e2wD8U', category: 'Shooting', difficulty: 'Advanced', position: 'SG', session: 3, program_type: 'Skills' },
        { id: 8, title: 'Đột phá ghi điểm', description: 'Dẫn bóng tốc độ đột phá vào khu vực hình thang ghi điểm.', video_url: 'https://www.youtube.com/watch?v=H74S9m_n06Y', category: 'Dribbling', difficulty: 'Advanced', position: 'SG', session: 4, program_type: 'Skills' },

        // SF
        { id: 9, title: 'Ném nhảy trung lộ', description: 'Nhồi bóng đột phá dừng nhảy ném tầm trung chuẩn xác.', video_url: 'https://www.youtube.com/watch?v=d_UfGz436hI', category: 'Shooting', difficulty: 'Intermediate', position: 'SF', session: 1, program_type: 'Skills' },
        { id: 10, title: 'Đột phá cánh dứt điểm', description: 'Tấn công dạt cánh, tận dụng sải chân rộng lên rổ tay xa.', video_url: 'https://www.youtube.com/watch?v=U7D2n7iP_6g', category: 'Finishing', difficulty: 'Intermediate', position: 'SF', session: 2, program_type: 'Skills' },
        { id: 11, title: 'Đánh cận rổ xoay người', description: 'Tỳ đè quay lưng rổ xoay ném ngửa người (Fadeaway) khó cản.', video_url: 'https://www.youtube.com/watch?v=wX-y5F-mC-M', category: 'Finishing', difficulty: 'Advanced', position: 'SF', session: 3, program_type: 'Skills' },
        { id: 12, title: 'Phòng thủ chu vi', description: 'Tập trượt ngang cản phá chu vi và phản công chớp nhoáng.', video_url: 'https://www.youtube.com/watch?v=Lq8Ccr6yv_4', category: 'Defense', difficulty: 'Intermediate', position: 'SF', session: 4, program_type: 'Skills' },

        // PF
        { id: 13, title: 'Bộ chân Up & Under', description: 'Nhử ném dưới rổ rồi luồn bước chéo qua tay đối thủ dứt điểm.', video_url: 'https://www.youtube.com/watch?v=oADaM2L1YLc', category: 'Footwork', difficulty: 'Intermediate', position: 'PF', session: 1, program_type: 'Skills' },
        { id: 14, title: 'Đột phá đối mặt rổ (Face up)', description: 'Tấn công đối mặt, kết hợp dậm nhử (jab-step) để lên rổ mạnh mẽ.', video_url: 'https://www.youtube.com/watch?v=ffjo8ReDzhA', category: 'Finishing', difficulty: 'Intermediate', position: 'PF', session: 2, program_type: 'Skills' },
        { id: 15, title: 'Phối hợp Pick & Pop', description: 'Làm tường cản hậu vệ rồi dạt ra ném trung bình trống trải.', video_url: 'https://www.youtube.com/watch?v=nuBNbbl7rU8', category: 'Shooting', difficulty: 'Intermediate', position: 'PF', session: 3, program_type: 'Skills' },
        { id: 16, title: 'Rebound & Putback dứt điểm', description: 'Chọn vị trí tranh chấp Rebound tấn công và đệm bóng ăn điểm.', video_url: 'https://www.youtube.com/watch?v=3sLB60PZmkk', category: 'Rebounding', difficulty: 'Advanced', position: 'PF', session: 4, program_type: 'Skills' },

        // C
        { id: 17, title: 'Móc bóng cận rổ (Post Hook)', description: 'Xoay người góc 90 độ dùng vai che bóng móc rổ bằng cả 2 tay.', video_url: 'https://www.youtube.com/watch?v=LTXTXfYb_5g', category: 'Post', difficulty: 'Intermediate', position: 'C', session: 1, program_type: 'Skills' },
        { id: 18, title: 'Pick & Roll cắt sâu rổ', description: 'Làm tường rồi lập tức mở xoay người cắt sâu rổ nhận bóng úp rổ.', video_url: 'https://www.youtube.com/watch?v=tQE39YRhnbk', category: 'Finishing', difficulty: 'Advanced', position: 'C', session: 2, program_type: 'Skills' },
        { id: 19, title: 'Bảo vệ rổ & Block bóng', description: 'Đứng trụ hình thang, bật nhảy block bóng đúng thời điểm.', video_url: 'https://www.youtube.com/watch?v=NZsJYlJM8cw', category: 'Defense', difficulty: 'Advanced', position: 'C', session: 3, program_type: 'Skills' },
        { id: 20, title: 'Outlet Pass phản công nhanh', description: 'Rebound phòng thủ và phát động chuyền dài phản công nhanh chóng.', video_url: 'https://www.youtube.com/watch?v=_D_PuriQ7Tk', category: 'Rebounding', difficulty: 'Intermediate', position: 'C', session: 4, program_type: 'Skills' },

        // ==================== PHYSICAL PROGRAMS (3 Days) ====================
        // PG
        { id: 21, title: 'Tăng tốc & Dẫn bóng Tốc độ (Speed & Ball Handling)', description: 'Tập luyện bứt tốc độ ngắn phối hợp thay đổi nhịp độ nhồi bóng, rèn luyện cơ bắp bắp chân.', video_url: 'https://www.youtube.com/watch?v=ENzFBpSwJRs', category: 'Conditioning', difficulty: 'Intermediate', position: 'PG', session: 1, program_type: 'Physical' },
        { id: 22, title: 'Bộ chân Trượt ngang Di chuyển (Lateral Quickness)', description: 'Rèn luyện sức mạnh cơ đùi ngoài và bộ chân trượt phòng thủ tốc độ cao trên chu vi.', video_url: 'https://www.youtube.com/watch?v=Lq8Ccr6yv_4', category: 'Agility', difficulty: 'Intermediate', position: 'PG', session: 2, program_type: 'Physical' },
        { id: 23, title: 'Tập luyện Phản xạ & Tốc độ (Agility & Defensive Reaction)', description: 'Bài tập chuyển hướng nhanh bất ngờ phản xạ theo tín hiệu, tối ưu hóa sự linh hoạt cổ chân.', video_url: 'https://www.youtube.com/watch?v=BHeufSq0z5k', category: 'Agility', difficulty: 'Advanced', position: 'PG', session: 3, program_type: 'Physical' },

        // SG
        { id: 24, title: 'Bật nhảy Plyometrics Bóng rổ (Plyometrics for Guards)', description: 'Các bài nhảy hộp, nhảy pogo để tăng hiệu suất cơ co thắt nhanh giúp bật cao ném rổ.', video_url: 'https://www.youtube.com/watch?v=flm5f7bn6SY', category: 'Plyometrics', difficulty: 'Intermediate', position: 'SG', session: 1, program_type: 'Physical' },
        { id: 25, title: 'Tập luyện Thể lực Mùa nghỉ (Off-Season Conditioning)', description: 'Bài tập cường độ cao HIIT giúp tăng cường dung tích phổi và duy trì thể lực suốt 4 hiệp đấu.', video_url: 'https://www.youtube.com/watch?v=qcDfjK_CdtA', category: 'Conditioning', difficulty: 'Intermediate', position: 'SG', session: 2, program_type: 'Physical' },
        { id: 26, title: 'Tăng Sức bật Nhảy thẳng đứng (Vertical Jump Increase)', description: 'Rèn luyện kỹ năng phát lực từ mặt đất, tối ưu chu kỳ co cơ kéo giãn để tăng tầm với cao ném.', video_url: 'https://www.youtube.com/watch?v=SwP18YWFPEQ', category: 'Conditioning', difficulty: 'Advanced', position: 'SG', session: 3, program_type: 'Physical' },

        // SF
        { id: 27, title: 'Phát triển Thể chất Toàn diện (SF Physical Drills)', description: 'Tập trung vào sức mạnh bộc phát toàn thân cho tiền phong phụ, sẵn sàng tỳ đè đột phá biên.', video_url: 'https://www.youtube.com/watch?v=s1h4Phg5CNc', category: 'Strength', difficulty: 'Intermediate', position: 'SF', session: 1, program_type: 'Physical' },
        { id: 28, title: 'Tập Cơ bụng & Core Thăng bằng (Complete Core Strength)', description: 'Phát triển nhóm cơ trung tâm core dẻo dai giúp giữ thăng bằng tuyệt đối trên không khi dứt điểm va chạm.', video_url: 'https://www.youtube.com/watch?v=_TdWdFQ1Cms', category: 'Core', difficulty: 'Intermediate', position: 'SF', session: 2, program_type: 'Physical' },
        { id: 29, title: 'Tập luyện Sức bền Trung tâm (Functional Core & Strength)', description: 'Tập cơ liên sườn và cơ hông xoay người ném rổ, tăng sức bền chống chịu sức ép.', video_url: 'https://www.youtube.com/watch?v=FP4X1C3a_qI', category: 'Strength', difficulty: 'Advanced', position: 'SF', session: 3, program_type: 'Physical' },

        // PF
        { id: 30, title: 'Kích hoạt Sức bật Tối đa (Max Vertical Jump Power)', description: 'Rèn sức mạnh cơ đùi sau và mông, giúp tiền phong chính bật nhảy nhanh tranh bóng bật bảng.', video_url: 'https://www.youtube.com/watch?v=Y4f4aFVj9E0', category: 'Plyometrics', difficulty: 'Advanced', position: 'PF', session: 1, program_type: 'Physical' },
        { id: 31, title: 'Tăng Sức rướn Tranh chấp (Vertical Jump & Explosion)', description: 'Tăng độ bộc phát cơ bắp khi nhảy liên tục, giúp tranh chấp rebound liên tục dưới rổ.', video_url: 'https://www.youtube.com/watch?v=WA564xCGgnc', category: 'Plyometrics', difficulty: 'Advanced', position: 'PF', session: 2, program_type: 'Physical' },
        { id: 32, title: 'Tập Sức bật Không thiết bị (At-Home Vertical Exercises)', description: 'Bài tập nhảy squat nhảy, bật cóc giúp củng cố đầu gối và cơ bắp đùi săn chắc tự nhiên.', video_url: 'https://www.youtube.com/watch?v=gBWXoO_m3sc', category: 'Conditioning', difficulty: 'Intermediate', position: 'PF', session: 3, program_type: 'Physical' },

        // C
        { id: 33, title: 'Luyện Bộ chân Nhanh trên Thang dây (Fast Agility Ladder Drills)', description: 'Cải thiện khả năng linh hoạt chân cho trung phong to lớn, tăng tốc độ di chuyển phòng thủ.', video_url: 'https://www.youtube.com/watch?v=tMY5Cj39xN8', category: 'Agility', difficulty: 'Intermediate', position: 'C', session: 1, program_type: 'Physical' },
        { id: 34, title: 'Tốc độ Chân & Khả năng Điều phối (Foot Speed & Coordination)', description: 'Giúp trung phong xoay trở nhanh ở khu vực dưới rổ (low post), di chuyển yểm trợ nhanh nhạy.', video_url: 'https://www.youtube.com/watch?v=Mw-Z0j3g6-g', category: 'Agility', difficulty: 'Intermediate', position: 'C', session: 2, program_type: 'Physical' },
        { id: 35, title: 'Bộ chân Nhanh tại chỗ (Fast Feet Exercises)', description: 'Cải thiện thời gian phản ứng chân chạm đất, giúp di chuyển cản phá (Block) nhanh chóng hơn.', video_url: 'https://www.youtube.com/watch?v=o7SUtgpPoYw', category: 'Agility', difficulty: 'Advanced', position: 'C', session: 3, program_type: 'Physical' }
      ];
      
      let filteredMocks = mockAll.filter(ex => ex.position === selectedPosition && ex.program_type === programType);
      if (filterCategory !== 'All') {
        filteredMocks = filteredMocks.filter(ex => ex.category === filterCategory);
      }
      if (filterDifficulty !== 'All') {
        filteredMocks = filteredMocks.filter(ex => ex.difficulty === filterDifficulty);
      }
      setExercises(filteredMocks);
    } finally {
      setLoadingExercises(false);
    }
  };

  // Re-fetch exercises when filters, position or programType changes
  useEffect(() => {
    fetchExercises();
  }, [filterCategory, filterDifficulty, selectedPosition, programType]);

  // Webcam activation handler
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.error('Không thể mở Camera:', err);
      alert('Không thể truy cập camera của bạn. Đang chạy ở chế độ giả lập camera.');
      setCameraActive(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const toggleCamera = () => {
    if (cameraActive) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Simulate ball tracking movement when camera is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cameraActive) {
      interval = setInterval(() => {
        setBallPos({
          x: 20 + Math.random() * 60,
          y: 30 + Math.random() * 50
        });
      }, 800);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cameraActive]);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Auth form submissions
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');

    if (authTab === 'login') {
      try {
        const formData = new URLSearchParams();
        formData.append('username', formUsername);
        formData.append('password', formPassword);

        await api.post('/login', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        localStorage.setItem('basketball_user', formUsername);
        setIsLoggedIn(true);
        setUsername(formUsername);
        setShowAuthModal(false);
        setFormUsername('');
        setFormPassword('');
      } catch (err: any) {
        setAuthError(err.response?.data?.detail || 'Sai tên đăng nhập hoặc mật khẩu!');
      }
    } else {
      try {
        await api.post('/register', {
          username: formUsername,
          email: formEmail,
          password: formPassword
        });

        setAuthSuccess('Đăng ký thành công! Đang chuyển sang Đăng nhập...');
        setTimeout(() => {
          setAuthTab('login');
          setFormEmail('');
          setAuthSuccess('');
        }, 1500);
      } catch (err: any) {
        setAuthError(err.response?.data?.detail || 'Đăng ký thất bại. Vui lòng thử lại!');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('basketball_user');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <header className="app-header">
        <div className="logo-container">
          <span className="logo-text">Pro Hoop Training</span>
        </div>
        <div className="user-nav">
          {isLoggedIn ? (
            <>
              <div className="user-badge">
                <div className="user-avatar">{username[0].toUpperCase()}</div>
                <span style={{ fontWeight: 600 }}>{username}</span>
              </div>
              <button className="btn-logout" onClick={handleLogout}>Đăng xuất</button>
            </>
          ) : (
            <button className="btn-auth" onClick={() => { setShowAuthModal(true); setAuthTab('login'); }}>
              Đăng nhập / Đăng ký
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="app-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Top Section: Dashboard and Camera Side-by-Side */}
        <div className="dashboard-row-top">
          
          {/* Stats Dashboard */}
          <div className="card-glass flex-stats">
            <h2 className="card-title">Chỉ số Tập luyện Hôm nay</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value orange">{shots}</span>
                <span className="stat-label">Cú Ném Vào</span>
              </div>
              <div className="stat-item">
                <span className="stat-value cyan">{dribbles}</span>
                <span className="stat-label">Nhồi Bóng</span>
              </div>
              <div className="stat-item">
                <span className="stat-value" style={{ color: '#a855f7' }}>{practiceTime}m</span>
                <span className="stat-label">Thời Gian Tập</span>
              </div>
            </div>
            
            <div className="quote-box">
              <p className="quote-text">"Sự kiên trì hôm nay là nền tảng của nhà vô địch ngày mai."</p>
              <p className="quote-author">- Kobe Bryant</p>
            </div>
          </div>

          {/* AI Camera Feed */}
          <div className="card-glass flex-camera">
            <h2 className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>AI Camera Hoạt động</span>
              {cameraActive && <span className="hud-badge rec">● LIVE TRACKING</span>}
            </h2>
            
            <div className={`camera-container ${cameraActive ? 'active' : ''}`}>
              {cameraActive ? (
                <>
                  <video 
                    ref={videoRef} 
                    className="camera-feed" 
                    autoPlay 
                    playsInline 
                    muted 
                  />
                  
                  <div className="scanner-beam"></div>

                  <div className="camera-hud">
                    <div className="hud-top">
                      <div className="hud-badge">FPS: 30</div>
                      <div className="hud-badge" style={{ borderColor: 'var(--accent-orange)', color: 'var(--accent-orange)' }}>
                        HOOP DETECTED: 95%
                      </div>
                    </div>

                    <div className="hud-corners"></div>
                    <div className="ai-target-hoop"></div>
                    <div 
                      className="ai-tracker-ball" 
                      style={{ left: `${ballPos.x}%`, top: `${ballPos.y}%` }}
                    ></div>
                    <div className="hud-bottom-corners"></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div className="hud-badge">BÓNG RỔ: GRCH-38</div>
                      <div className="camera-controls-mock">
                        <button className="btn-mock-action" onClick={() => setShots(prev => prev + 1)}>+ Ném vào</button>
                        <button className="btn-mock-action" onClick={() => setDribbles(prev => prev + 10)}>+ 10 Nhồi</button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="camera-placeholder">
                  <div style={{ maxWidth: '300px' }}>
                    <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Camera chưa được bật</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Bật Camera để AI nhận diện cú ném và nhồi bóng của bạn thời gian thực!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <button 
                className={`btn-camera-toggle ${cameraActive ? 'active' : ''}`} 
                onClick={toggleCamera}
                style={{ padding: '0.6rem 1.8rem', fontSize: '0.9rem' }}
              >
                {cameraActive ? 'TẮT AI CAMERA' : 'BẬT AI CAMERA'}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Section: Weekly Program Dashboard */}
        <div className="dashboard-schedule-section">
          <div className="card-glass">
            <div className="schedule-header">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h2 className="card-title" style={{ marginBottom: '0.25rem' }}>Giáo án Tập luyện Tuần này</h2>
                
                {/* Program Type Tabs Selector */}
                <div className="program-type-tabs">
                  <button
                    className={`program-toggle-btn ${programType === 'Skills' ? 'active' : ''}`}
                    onClick={() => setProgramType('Skills')}
                  >
                    Giáo án Kỹ năng (4 Buổi)
                  </button>
                  <button
                    className={`program-toggle-btn ${programType === 'Physical' ? 'active' : ''}`}
                    onClick={() => setProgramType('Physical')}
                  >
                    Giáo án Thể chất (3 Ngày)
                  </button>
                </div>
                
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '0.25rem' }}>
                  Giáo trình cá nhân hóa thiết kế riêng cho từng vị trí thi đấu chính thức trong {programType === 'Skills' ? '4 buổi tập' : '3 ngày tập'}
                </p>
              </div>

              {/* Filters */}
              <div className="filter-bar" style={{ margin: 0 }}>
                <div className="filter-group">
                  <span className="filter-label">Dạng:</span>
                  <select 
                    className="filter-select"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="All">Tất cả</option>
                    <option value="Dribbling">Dribbling</option>
                    <option value="Shooting">Shooting</option>
                    <option value="Finishing">Finishing</option>
                    <option value="Defense">Defense</option>
                    <option value="Rebounding">Rebounding</option>
                    <option value="Conditioning">Conditioning</option>
                    <option value="Agility">Agility</option>
                    <option value="Plyometrics">Plyometrics</option>
                    <option value="Strength">Strength</option>
                    <option value="Core">Core</option>
                  </select>
                </div>

                <div className="filter-group">
                  <span className="filter-label">Độ khó:</span>
                  <select 
                    className="filter-select"
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                  >
                    <option value="All">Tất cả</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Position Selector Tabs */}
            <div className="position-selector-tabs">
              {positions.map((pos) => (
                <button
                  key={pos.id}
                  className={`position-tab-btn ${selectedPosition === pos.id ? 'active' : ''}`}
                  onClick={() => setSelectedPosition(pos.id)}
                  style={{ justifyContent: 'center', textAlign: 'center' }}
                >
                  <div className="pos-tab-text" style={{ alignItems: 'center', width: '100%' }}>
                    <span className="pos-tab-label">{pos.label}</span>
                    <span className="pos-tab-name">{pos.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Weekly Schedule Columns Grid */}
            {loadingExercises ? (
              <div className="empty-state">Đang cập nhật lịch tập của vị trí...</div>
            ) : (
              <div className={`sessions-schedule-grid ${programType === 'Skills' ? 'cols-4' : 'cols-3'}`}>
                {(programType === 'Skills' ? [1, 2, 3, 4] : [1, 2, 3]).map((sessionNum) => {
                  const sessionExercises = exercises.filter(ex => ex.session === sessionNum);
                  return (
                    <div key={sessionNum} className="session-column">
                      <div className="session-column-header">
                        <span className="session-badge">
                          {programType === 'Skills' ? `Buổi ${sessionNum}` : `Ngày ${sessionNum}`}
                        </span>
                        <div className="session-header-line"></div>
                      </div>
                      
                      <div className="session-exercises-container">
                        {sessionExercises.length > 0 ? (
                          sessionExercises.map((ex) => (
                            <div key={ex.id} className="exercise-card-schedule">
                              <div className="ex-schedule-top">
                                <h4 className="ex-schedule-title">{ex.title}</h4>
                                <span className="badge-tag difficulty" style={{ padding: '0.15rem 0.35rem', fontSize: '0.6rem' }}>
                                  {ex.difficulty}
                                </span>
                              </div>
                              <p className="ex-schedule-desc">{ex.description}</p>
                              <div className="ex-schedule-bottom">
                                <span className="badge-tag category" style={{ fontSize: '0.6rem' }}>
                                  {ex.category}
                                </span>
                                <button 
                                  onClick={() => {
                                    setActiveVideoUrl(ex.video_url);
                                    setActiveVideoTitle(ex.title);
                                  }}
                                  className="btn-watch compact-btn"
                                >
                                  Tập ngay
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="session-empty-state">
                            Nghỉ ngơi / Hồi phục cơ bắp
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 Pro Hoop Training App. Tất cả các quyền được bảo lưu.</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.5 }}>Ứng dụng tối ưu phân tích động tác bóng rổ thông minh.</p>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowAuthModal(false)}>×</button>
            
            <div className="modal-tabs">
              <button 
                className={`modal-tab ${authTab === 'login' ? 'active' : ''}`}
                onClick={() => { setAuthTab('login'); setAuthError(''); setAuthSuccess(''); }}
              >
                ĐĂNG NHẬP
              </button>
              <button 
                className={`modal-tab ${authTab === 'register' ? 'active' : ''}`}
                onClick={() => { setAuthTab('register'); setAuthError(''); setAuthSuccess(''); }}
              >
                ĐĂNG KÝ
              </button>
            </div>

            {authError && <div className="auth-error">{authError}</div>}
            {authSuccess && <div className="auth-success">{authSuccess}</div>}

            <form onSubmit={handleAuthSubmit}>
              <div className="form-group">
                <label className="form-label">Tên tài khoản</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập" 
                  required
                />
              </div>

              {authTab === 'register' && (
                <div className="form-group">
                  <label className="form-label">Địa chỉ Email</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="example@gmail.com" 
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Mật khẩu</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  placeholder="••••••••" 
                  required
                />
              </div>

              <button type="submit" className="btn-form-submit">
                {authTab === 'login' ? 'VÀO HỆ THỐNG' : 'TẠO TÀI KHOẢN'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideoUrl && (
        <div className="modal-overlay" onClick={() => { setActiveVideoUrl(null); setActiveVideoTitle(null); }}>
          <div className="modal-content video-player-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => { setActiveVideoUrl(null); setActiveVideoTitle(null); }}>×</button>
            
            <h3 style={{ 
              marginTop: 0, 
              marginBottom: '1.5rem', 
              fontSize: '1.25rem',
              fontWeight: 700,
              borderLeft: '4px solid var(--accent-orange)', 
              paddingLeft: '0.75rem',
              color: 'var(--text-primary)' 
            }}>
              {activeVideoTitle}
            </h3>

            <div className="video-wrapper">
              {getYouTubeEmbedUrl(activeVideoUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeVideoUrl)!}
                  title={activeVideoTitle || 'Exercise Video'}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              ) : activeVideoUrl.endsWith('.mp4') || activeVideoUrl.includes('.mp4') ? (
                <video controls autoPlay style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                  <source src={activeVideoUrl} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ phát video này.
                </video>
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', boxSizing: 'border-box' }}>
                  <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    Không thể nhúng trực tiếp link này. Bạn có thể mở liên kết ở trang mới:
                  </p>
                  <a href={activeVideoUrl} target="_blank" rel="noopener noreferrer" className="btn-auth" style={{ textDecoration: 'none' }}>
                    Mở liên kết bên ngoài
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}