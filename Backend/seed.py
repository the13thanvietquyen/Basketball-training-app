from sqlmodel import Session, select
from passlib.context import CryptContext
from models import User, Exercise, engine, create_db_and_tables

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_data():
    create_db_and_tables()
    with Session(engine) as session:
        # Check if database is already seeded
        if session.exec(select(Exercise)).first():
            print("Database already seeded. Skipping.")
            return

        print("Seeding 20 skill exercises and 15 physical conditioning exercises for 5 positions...")
        session.add(User(username="test_user", email="test@gmail.com", hashed_password=pwd_context.hash("123456")))
        
        exercises = [
            # ==================== SKILLS PROGRAMS (4 Sessions) ====================
            # POINT GUARD (PG) - Skills
            Exercise(
                title="Nhồi bóng phối hợp (V-Dribble & Crossover)",
                description="Luyện cảm giác bóng, kiểm soát bóng tốc độ cao bằng cả 2 tay giúp tăng cường độ dẻo dai cổ tay.",
                video_url="https://www.youtube.com/watch?v=R9U0X8ZgUv0",
                category="Dribbling",
                difficulty="Beginner",
                position="PG",
                session=1,
                program_type="Skills"
            ),
            Exercise(
                title="Nhãn quan & Chuyền bóng chính xác",
                description="Rèn luyện kỹ năng chuyền đẩy, chuyền đập đất chuẩn xác bằng cả hai tay trong phạm vi hẹp.",
                video_url="https://www.youtube.com/watch?v=M2_sO7hVbWc",
                category="Passing",
                difficulty="Beginner",
                position="PG",
                session=2,
                program_type="Skills"
            ),
            Exercise(
                title="Dứt điểm Float Shot cận rổ",
                description="Học cách ném bóng bổng cầu vồng tầm cao để vượt qua sự truy cản của các cầu thủ cao lớn dưới rổ.",
                video_url="https://www.youtube.com/watch?v=wX5y35d6XlI",
                category="Finishing",
                difficulty="Intermediate",
                position="PG",
                session=3,
                program_type="Skills"
            ),
            Exercise(
                title="Chiến thuật phối hợp Pick & Roll",
                description="Đọc tình huống bù người từ trung phong và đưa ra quyết định ném rổ, đột phá hay kiến tạo.",
                video_url="https://www.youtube.com/watch?v=S0I9J_w_t6U",
                category="Tactics",
                difficulty="Advanced",
                position="PG",
                session=4,
                program_type="Skills"
            ),

            # SHOOTING GUARD (SG) - Skills
            Exercise(
                title="Kỹ thuật Catch & Shoot cơ bản",
                description="Tập trung vào bộ chân nhận bóng nhảy ném (1-2 step) nhanh chóng và giữ nhịp độ vẩy cổ tay.",
                video_url="https://www.youtube.com/watch?v=6PzJ7q_oG8E",
                category="Shooting",
                difficulty="Beginner",
                position="SG",
                session=1,
                program_type="Skills"
            ),
            Exercise(
                title="Chạy chỗ thoát người thoát tường",
                description="Cách di chuyển thông minh quanh các khu vực screen của đồng đội để đón bóng ném trống trải.",
                video_url="https://www.youtube.com/watch?v=n-W6P1_U71Q",
                category="Shooting",
                difficulty="Intermediate",
                position="SG",
                session=2,
                program_type="Skills"
            ),
            Exercise(
                title="Tạo khoảng trống ném Step-back",
                description="Kỹ thuật nhún chân giật lùi để gia tăng khoảng cách lớn với hậu vệ phòng thủ trước khi dứt điểm.",
                video_url="https://www.youtube.com/watch?v=Jm9n2e2wD8U",
                category="Shooting",
                difficulty="Advanced",
                position="SG",
                session=3,
                program_type="Skills"
            ),
            Exercise(
                title="Đột phá ghi điểm dưới áp lực",
                description="Kỹ năng nhồi bóng đột phá dũng mãnh, xoay người dứt điểm cận rổ khi bị theo sát bởi hậu vệ.",
                video_url="https://www.youtube.com/watch?v=H74S9m_n06Y",
                category="Dribbling",
                difficulty="Advanced",
                position="SG",
                session=4,
                program_type="Skills"
            ),

            # SMALL FORWARD (SF) - Skills
            Exercise(
                title="Ném nhảy tầm trung (Midrange Pull-up)",
                description="Dừng đột ngột sau nhịp nhồi bóng và thực hiện cú ném trung bình với điểm chạm cao nhất.",
                video_url="https://www.youtube.com/watch?v=d_UfGz436hI",
                category="Shooting",
                difficulty="Intermediate",
                position="SF",
                session=1,
                program_type="Skills"
            ),
            Exercise(
                title="Đột phá cánh dứt điểm Wing Drive",
                description="Kỹ thuật tấn công từ hai biên (cánh), tận dụng sải chân dài để đột phá lên rổ dứt điểm lên rổ tay xa.",
                video_url="https://www.youtube.com/watch?v=U7D2n7iP_6g",
                category="Finishing",
                difficulty="Intermediate",
                position="SF",
                session=2,
                program_type="Skills"
            ),
            Exercise(
                title="Đánh cận rổ xoay người (Post-up)",
                description="Tỳ đè đối thủ ở tư thế quay lưng vào rổ, xoay người thực hiện cú ném ngửa người (Fadeaway).",
                video_url="https://www.youtube.com/watch?v=wX-y5F-mC-M",
                category="Finishing",
                difficulty="Advanced",
                position="SF",
                session=3,
                program_type="Skills"
            ),
            Exercise(
                title="Phòng thủ chu vi (Perimeter Defense)",
                description="Tập bộ chân trượt ngang phòng thủ chu vi ngoài vạch 3 điểm và phản công nhanh khi cướp được bóng.",
                video_url="https://www.youtube.com/watch?v=Lq8Ccr6yv_4",
                category="Defense",
                difficulty="Intermediate",
                position="SF",
                session=4,
                program_type="Skills"
            ),

            # POWER FORWARD (PF) - Skills
            Exercise(
                title="Bộ chân cận rổ Up & Under",
                description="Nhận bóng dưới rổ, nhử bóng lên cao (Pump fake) rồi bước chéo chân dứt điểm cận rổ bên dưới cánh tay thủ.",
                video_url="https://www.youtube.com/watch?v=oADaM2L1YLc",
                category="Footwork",
                difficulty="Intermediate",
                position="PF",
                session=1,
                program_type="Skills"
            ),
            Exercise(
                title="Đột phá trung lộ đối mặt rổ (Face up)",
                description="Tấn công khu vực dưới rổ từ tư thế đối mặt đối thủ, kết hợp nhử đột phá (jab step) để dứt điểm.",
                video_url="https://www.youtube.com/watch?v=ffjo8ReDzhA",
                category="Finishing",
                difficulty="Intermediate",
                position="PF",
                session=2,
                program_type="Skills"
            ),
            Exercise(
                title="Kỹ thuật phối hợp Pick & Pop",
                description="Di chuyển yểm trợ cho hậu vệ, nhưng thay vì chạy về rổ thì lùi ra khu trung lộ đón bóng ném rổ.",
                video_url="https://www.youtube.com/watch?v=nuBNbbl7rU8",
                category="Shooting",
                difficulty="Intermediate",
                position="PF",
                session=3,
                program_type="Skills"
            ),
            Exercise(
                title="Tranh bóng bật bảng & Putback dứt điểm",
                description="Cách tỳ đè chiếm vị trí (Box out) tranh chấp bóng bật bảng tấn công và đệm bóng vào rổ ngay trên không.",
                video_url="https://www.youtube.com/watch?v=3sLB60PZmkk",
                category="Rebounding",
                difficulty="Advanced",
                position="PF",
                session=4,
                program_type="Skills"
            ),

            # CENTER (C) - Skills
            Exercise(
                title="Cú móc bóng hai tay (Post Hook)",
                description="Kỹ thuật dứt điểm cận rổ cơ bản nhất cho trung phong, xoay người nghiêng vai móc bóng vào rổ.",
                video_url="https://www.youtube.com/watch?v=LTXTXfYb_5g",
                category="Post",
                difficulty="Intermediate",
                position="C",
                session=1,
                program_type="Skills"
            ),
            Exercise(
                title="Pick & Roll: Di chuyển nhanh về rổ dứt điểm",
                description="Bù người chắn bóng xong nhanh chóng xoay người cắt sâu về phía bảng rổ để nhận bóng úp rổ.",
                video_url="https://www.youtube.com/watch?v=tQE39YRhnbk",
                category="Finishing",
                difficulty="Advanced",
                position="C",
                session=2,
                program_type="Skills"
            ),
            Exercise(
                title="Bảo vệ bảng rổ & Chặn bóng (Block)",
                description="Tập luyện căn thời gian bật nhảy chặn bóng (Block) chuẩn xác mà không phạm quy lỗi cá nhân.",
                video_url="https://www.youtube.com/watch?v=NZsJYlJM8cw",
                category="Defense",
                difficulty="Advanced",
                position="C",
                session=3,
                program_type="Skills"
            ),
            Exercise(
                title="Rebound phòng thủ & Chuyền outlet pass",
                description="Giữ bóng bật bảng phòng thủ chắc chắn và thực hiện cú chuyền dài nhanh phát động phản công chớp nhoáng.",
                video_url="https://www.youtube.com/watch?v=_D_PuriQ7Tk",
                category="Rebounding",
                difficulty="Intermediate",
                position="C",
                session=4,
                program_type="Skills"
            ),

            # ==================== PHYSICAL PROGRAMS (3 Days) ====================
            # POINT GUARD (PG) - Physical
            Exercise(
                title="Tăng tốc & Dẫn bóng Tốc độ (Speed & Ball Handling)",
                description="Tập luyện bứt tốc độ ngắn phối hợp thay đổi nhịp độ nhồi bóng, rèn luyện cơ bắp bắp chân.",
                video_url="https://www.youtube.com/watch?v=ENzFBpSwJRs",
                category="Conditioning",
                difficulty="Intermediate",
                position="PG",
                session=1,
                program_type="Physical"
            ),
            Exercise(
                title="Bộ chân Trượt ngang Di chuyển (Lateral Quickness)",
                description="Rèn luyện sức mạnh cơ đùi ngoài và bộ chân trượt phòng thủ tốc độ cao trên chu vi.",
                video_url="https://www.youtube.com/watch?v=Lq8Ccr6yv_4",
                category="Agility",
                difficulty="Intermediate",
                position="PG",
                session=2,
                program_type="Physical"
            ),
            Exercise(
                title="Tập luyện Phản xạ & Tốc độ (Agility & Defensive Reaction)",
                description="Bài tập chuyển hướng nhanh bất ngờ phản xạ theo tín hiệu, tối ưu hóa sự linh hoạt cổ chân.",
                video_url="https://www.youtube.com/watch?v=BHeufSq0z5k",
                category="Agility",
                difficulty="Advanced",
                position="PG",
                session=3,
                program_type="Physical"
            ),

            # SHOOTING GUARD (SG) - Physical
            Exercise(
                title="Bật nhảy Plyometrics Bóng rổ (Plyometrics for Guards)",
                description="Các bài nhảy hộp, nhảy pogo để tăng hiệu suất cơ co thắt nhanh giúp bật cao ném rổ.",
                video_url="https://www.youtube.com/watch?v=flm5f7bn6SY",
                category="Plyometrics",
                difficulty="Intermediate",
                position="SG",
                session=1,
                program_type="Physical"
            ),
            Exercise(
                title="Tập luyện Thể lực Mùa nghỉ (Off-Season Conditioning)",
                description="Bài tập cường độ cao HIIT giúp tăng cường dung tích phổi và duy trì thể lực suốt 4 hiệp đấu.",
                video_url="https://www.youtube.com/watch?v=qcDfjK_CdtA",
                category="Conditioning",
                difficulty="Intermediate",
                position="SG",
                session=2,
                program_type="Physical"
            ),
            Exercise(
                title="Tăng Sức bật Nhảy thẳng đứng (Vertical Jump Increase)",
                description="Rèn luyện kỹ năng phát lực từ mặt đất, tối ưu chu kỳ co cơ kéo giãn để tăng tầm với cao ném.",
                video_url="https://www.youtube.com/watch?v=SwP18YWFPEQ",
                category="Conditioning",
                difficulty="Advanced",
                position="SG",
                session=3,
                program_type="Physical"
            ),

            # SMALL FORWARD (SF) - Physical
            Exercise(
                title="Phát triển Thể chất Toàn diện (SF Physical Drills)",
                description="Tập trung vào sức mạnh bộc phát toàn thân cho tiền phong phụ, sẵn sàng tỳ đè đột phá biên.",
                video_url="https://www.youtube.com/watch?v=s1h4Phg5CNc",
                category="Strength",
                difficulty="Intermediate",
                position="SF",
                session=1,
                program_type="Physical"
            ),
            Exercise(
                title="Tập Cơ bụng & Core Thăng bằng (Complete Core Strength)",
                description="Phát triển nhóm cơ trung tâm core dẻo dai giúp giữ thăng bằng tuyệt đối trên không khi dứt điểm va chạm.",
                video_url="https://www.youtube.com/watch?v=_TdWdFQ1Cms",
                category="Core",
                difficulty="Intermediate",
                position="SF",
                session=2,
                program_type="Physical"
            ),
            Exercise(
                title="Tập luyện Sức bền Trung tâm (Functional Core & Strength)",
                description="Tập cơ liên sườn và cơ hông xoay người ném rổ, tăng sức bền chống chịu sức ép.",
                video_url="https://www.youtube.com/watch?v=FP4X1C3a_qI",
                category="Strength",
                difficulty="Advanced",
                position="SF",
                session=3,
                program_type="Physical"
            ),

            # POWER FORWARD (PF) - Physical
            Exercise(
                title="Kích hoạt Sức bật Tối đa (Max Vertical Jump Power)",
                description="Rèn sức mạnh cơ đùi sau và mông, giúp tiền phong chính bật nhảy nhanh tranh bóng bật bảng.",
                video_url="https://www.youtube.com/watch?v=Y4f4aFVj9E0",
                category="Plyometrics",
                difficulty="Advanced",
                position="PF",
                session=1,
                program_type="Physical"
            ),
            Exercise(
                title="Tăng Sức rướn Tranh chấp (Vertical Jump & Explosion)",
                description="Tăng độ bộc phát cơ bắp khi nhảy liên tục, giúp tranh chấp rebound liên tục dưới rổ.",
                video_url="https://www.youtube.com/watch?v=WA564xCGgnc",
                category="Plyometrics",
                difficulty="Advanced",
                position="PF",
                session=2,
                program_type="Physical"
            ),
            Exercise(
                title="Tập Sức bật Không thiết bị (At-Home Vertical Exercises)",
                description="Bài tập nhảy squat nhảy, bật cóc giúp củng cố đầu gối và cơ bắp đùi săn chắc tự nhiên.",
                video_url="https://www.youtube.com/watch?v=gBWXoO_m3sc",
                category="Conditioning",
                difficulty="Intermediate",
                position="PF",
                session=3,
                program_type="Physical"
            ),

            # CENTER (C) - Physical
            Exercise(
                title="Luyện Bộ chân Nhanh trên Thang dây (Fast Agility Ladder Drills)",
                description="Cải thiện khả năng linh hoạt chân cho trung phong to lớn, tăng tốc độ di chuyển phòng thủ.",
                video_url="https://www.youtube.com/watch?v=tMY5Cj39xN8",
                category="Agility",
                difficulty="Intermediate",
                position="C",
                session=1,
                program_type="Physical"
            ),
            Exercise(
                title="Tốc độ Chân & Khả năng Điều phối (Foot Speed & Coordination)",
                description="Giúp trung phong xoay trở nhanh ở khu vực dưới rổ (low post), di chuyển yểm trợ nhanh nhạy.",
                video_url="https://www.youtube.com/watch?v=Mw-Z0j3g6-g",
                category="Agility",
                difficulty="Intermediate",
                position="C",
                session=2,
                program_type="Physical"
            ),
            Exercise(
                title="Bộ chân Nhanh tại chỗ (Fast Feet Exercises)",
                description="Cải thiện thời gian phản ứng chân chạm đất, giúp di chuyển cản phá (Block) nhanh chóng hơn.",
                video_url="https://www.youtube.com/watch?v=o7SUtgpPoYw",
                category="Agility",
                difficulty="Advanced",
                position="C",
                session=3,
                program_type="Physical"
            ),
        ]
        
        for ex in exercises:
            session.add(ex)
            
        session.commit()
        print("[SUCCESS] Successfully seeded 20 skill exercises and 15 physical conditioning exercises!")

if __name__ == "__main__":
    seed_data()