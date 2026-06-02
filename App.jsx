import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

const T = {
  id:{nav:['Dashboard','Komisi','Turnamen','Buat','Peserta','Bracket','Keuangan','Setting'],login:'Masuk',register:'Daftar',email:'Email',password:'Password',community:'Nama Komunitas',btn_login:'🔑 Masuk',btn_register:'🚀 Buat Akun',dash_title:'Dashboard',dash_sub:'Overview realtime platform turnamen esport',active_t:'TURNAMEN AKTIF',revenue_lbl:'PENDAPATAN',quick:'AKSI CEPAT',btn_create:'＋ Buat Turnamen',btn_comm:'📈 Komisi',btn_part:'👥 Peserta',no_active:'Belum ada turnamen aktif',tourn_title:'Turnamen',btn_create_t:'＋ Buat',no_tourn:'TIDAK ADA TURNAMEN',share:'🔗 Bagikan',live_btn:'▶ Live',close_btn:'■ Tutup',activate:'✓ Aktif',create_title:'＋ BUAT TURNAMEN',edit_title:'✏ EDIT',tourn_name:'Nama Turnamen *',game:'Game',format:'Format',city:'Kota *',date:'Tanggal *',prize:'Prize Pool *',entry:'Entry Fee *',slots:'Slot',desc:'Deskripsi',btn_save:'💾 Simpan',btn_create2:'🚀 Buat',btn_cancel:'Batal',teams_title:'Peserta & Tim',all:'Semua',btn_reg_team:'＋ Daftarkan Tim',team_name:'Nama Tim *',captain:'Kapten *',contact:'No. HP',members:'Member',tournament:'Turnamen *',paid_lbl:'Sudah bayar entry fee',btn_reg2:'Daftarkan',no_teams:'Belum ada tim',finance_title:'Keuangan',total_entry:'Total Entry',comm_lbl:'Komisi 15%',done:'Selesai',settings_title:'Pengaturan',account:'AKUN ORGANIZER',connected:'✓ Terhubung ke Supabase',bank_title:'💳 INFO PEMBAYARAN',bank_desc:'Data ini akan ditampilkan ke peserta saat mendaftar.',bank_name:'Nama Bank',acc_num:'Nomor Rekening / Nomor HP',acc_owner:'Nama Pemilik Rekening',wa_confirm:'No. WhatsApp Konfirmasi',btn_save_bank:'💾 Simpan Info Bank',saved:'✓ Tersimpan!',expansion:'EKSPANSI SEA',prize_pool:'Total Prize Pool',slots_left:'Slot Tersisa',slot_filled:'Slot Terisi',about:'TENTANG',reg_teams:'TIM TERDAFTAR',full:'❌ Slot Penuh',reg_now:'✅ Daftar Tim Sekarang →',closed_msg:'PENDAFTARAN DITUTUP',reg_title:'DAFTARKAN TIM',pay_title:'CARA PEMBAYARAN',amount:'Jumlah Entry Fee',transfer_to:'Transfer ke:',acc_no:'No. Rek:',an:'A/N:',confirm_wa:'Konfirmasi ke WA:',contact_org:'📱 Hubungi organizer',btn_submit:'🚀 Kirim',registering:'Mendaftarkan...',success_title:'BERHASIL!',success_msg:'terdaftar di',back:'← Kembali',back_detail:'← Lihat Detail',rev_title:'📈 LAPORAN KOMISI',rev_sub:'Pendapatan realtime',saldo:'SALDO TERSEDIA',income:'Masuk:',withdrawn:'Dicairkan:',withdraw_btn:'💸 Withdraw',withdraw_title:'💸 WITHDRAW',saldo_lbl:'SALDO',amount_lbl:'Jumlah (Rp)',acc_lbl:'Rekening',btn_wd:'💸 Cairkan',comm_per:'KOMISI PER TURNAMEN',no_tourn_yet:'Buat turnamen pertamamu!',online:'ONLINE',logout:'Keluar',select_bank:'-- Pilih Bank --',preview_lbl:'PREVIEW PESERTA',lang_lbl:'Bahasa',edit:'✏ Edit',profile_title:'PROFIL ORGANIZER',change_photo:'Klik untuk ganti foto',name_lbl:'Nama Organizer',save_profile:'💾 Simpan Profil',profile_saved:'✓ Profil Tersimpan!'},
  en:{nav:['Dashboard','Revenue','Tournaments','Create','Participants','Bracket','Finance','Settings'],login:'Login',register:'Register',email:'Email',password:'Password',community:'Community Name',btn_login:'🔑 Login',btn_register:'🚀 Create Account',dash_title:'Dashboard',dash_sub:'Realtime esport tournament platform overview',active_t:'ACTIVE TOURNAMENTS',revenue_lbl:'REVENUE',quick:'QUICK ACTIONS',btn_create:'＋ Create Tournament',btn_comm:'📈 Revenue',btn_part:'👥 Participants',no_active:'No active tournaments',tourn_title:'Tournaments',btn_create_t:'＋ Create',no_tourn:'NO TOURNAMENTS',share:'🔗 Share',live_btn:'▶ Live',close_btn:'■ Close',activate:'✓ Activate',create_title:'＋ CREATE TOURNAMENT',edit_title:'✏ EDIT',tourn_name:'Tournament Name *',game:'Game',format:'Format',city:'City *',date:'Start Date *',prize:'Prize Pool *',entry:'Entry Fee *',slots:'Slots',desc:'Description',btn_save:'💾 Save',btn_create2:'🚀 Create',btn_cancel:'Cancel',teams_title:'Participants & Teams',all:'All',btn_reg_team:'＋ Register Team',team_name:'Team Name *',captain:'Captain *',contact:'Phone No.',members:'Members',tournament:'Tournament *',paid_lbl:'Entry fee paid',btn_reg2:'Register',no_teams:'No teams yet',finance_title:'Finance',total_entry:'Total Entry',comm_lbl:'Commission 15%',done:'Done',settings_title:'Settings',account:'ORGANIZER ACCOUNT',connected:'✓ Connected to Supabase',bank_title:'💳 PAYMENT INFO',bank_desc:'This info will be shown to participants.',bank_name:'Bank Name',acc_num:'Account / Phone Number',acc_owner:'Account Owner Name',wa_confirm:'WhatsApp Confirmation',btn_save_bank:'💾 Save Payment Info',saved:'✓ Saved!',expansion:'SEA EXPANSION',prize_pool:'Total Prize Pool',slots_left:'Slots Left',slot_filled:'Slots Filled',about:'ABOUT',reg_teams:'REGISTERED TEAMS',full:'❌ Full',reg_now:'✅ Register Now →',closed_msg:'REGISTRATION CLOSED',reg_title:'REGISTER TEAM',pay_title:'HOW TO PAY',amount:'Entry Fee Amount',transfer_to:'Transfer to:',acc_no:'Acc No:',an:'Name:',confirm_wa:'Confirm via WA:',contact_org:'📱 Contact organizer',btn_submit:'🚀 Submit',registering:'Registering...',success_title:'SUCCESS!',success_msg:'registered in',back:'← Back',back_detail:'← View Detail',rev_title:'📈 REVENUE REPORT',rev_sub:'Realtime earnings',saldo:'AVAILABLE BALANCE',income:'Income:',withdrawn:'Withdrawn:',withdraw_btn:'💸 Withdraw',withdraw_title:'💸 WITHDRAW',saldo_lbl:'BALANCE',amount_lbl:'Amount',acc_lbl:'Account',btn_wd:'💸 Withdraw',comm_per:'COMMISSION PER TOURNAMENT',no_tourn_yet:'Create your first tournament!',online:'ONLINE',logout:'Logout',select_bank:'-- Select Bank --',preview_lbl:'PARTICIPANT PREVIEW',lang_lbl:'Language',edit:'✏ Edit',profile_title:'ORGANIZER PROFILE',change_photo:'Click to change photo',name_lbl:'Organizer Name',save_profile:'💾 Save Profile',profile_saved:'✓ Profile Saved!'},
  fil:{nav:['Dashboard','Komisyon','Torneo','Gumawa','Kalahok','Bracket','Pananalapi','Setting'],login:'Mag-login',register:'Mag-register',email:'Email',password:'Password',community:'Pangalan ng Komunidad',btn_login:'🔑 Mag-login',btn_register:'🚀 Gumawa ng Account',dash_title:'Dashboard',dash_sub:'Real-time na pangkalahatang-ideya',active_t:'MGA AKTIBONG TORNEO',revenue_lbl:'KITA',quick:'MABILIS NA AKSYON',btn_create:'＋ Gumawa ng Torneo',btn_comm:'📈 Komisyon',btn_part:'👥 Kalahok',no_active:'Walang aktibong torneo',tourn_title:'Mga Torneo',btn_create_t:'＋ Gumawa',no_tourn:'WALANG TORNEO',share:'🔗 Ibahagi',live_btn:'▶ Live',close_btn:'■ Isara',activate:'✓ I-activate',create_title:'＋ GUMAWA NG TORNEO',edit_title:'✏ I-EDIT',tourn_name:'Pangalan ng Torneo *',game:'Laro',format:'Format',city:'Lungsod *',date:'Petsa *',prize:'Prize Pool *',entry:'Entry Fee *',slots:'Puwesto',desc:'Paglalarawan',btn_save:'💾 I-save',btn_create2:'🚀 Gumawa',btn_cancel:'Kanselahin',teams_title:'Mga Kalahok at Koponan',all:'Lahat',btn_reg_team:'＋ Mag-register',team_name:'Pangalan ng Koponan *',captain:'Kapitan *',contact:'Telepono',members:'Miyembro',tournament:'Torneo *',paid_lbl:'Nabayaran na',btn_reg2:'Mag-register',no_teams:'Walang koponan pa',finance_title:'Pananalapi',total_entry:'Kabuuang Entry',comm_lbl:'Komisyon 15%',done:'Tapos',settings_title:'Mga Setting',account:'ACCOUNT NG ORGANIZER',connected:'✓ Nakakonekta sa Supabase',bank_title:'💳 IMPORMASYON SA BAYAD',bank_desc:'Ipapakita sa mga kalahok.',bank_name:'Pangalan ng Bangko',acc_num:'Numero ng Account',acc_owner:'Pangalan ng May-ari',wa_confirm:'WhatsApp para sa Kumpirmasyon',btn_save_bank:'💾 I-save',saved:'✓ Na-save!',expansion:'PAGPAPALAWAK SA SEA',prize_pool:'Kabuuang Prize Pool',slots_left:'Natitirang Puwesto',slot_filled:'Napuno na Puwesto',about:'TUNGKOL SA',reg_teams:'MGA NAKAREHISTRONG KOPONAN',full:'❌ Puno na',reg_now:'✅ Mag-register Ngayon →',closed_msg:'SARADO NA',reg_title:'IREHISTRO ANG KOPONAN',pay_title:'PAANO MAGBAYAD',amount:'Halaga ng Entry Fee',transfer_to:'I-transfer sa:',acc_no:'Acc No:',an:'Pangalan:',confirm_wa:'Kumpirmahin sa WA:',contact_org:'📱 Makipag-ugnayan',btn_submit:'🚀 Isumite',registering:'Nagrerehistro...',success_title:'MATAGUMPAY!',success_msg:'nairehistro sa',back:'← Bumalik',back_detail:'← Tingnan',rev_title:'📈 ULAT NG KOMISYON',rev_sub:'Real-time na kita',saldo:'AVAILABLE NA BALANSE',income:'Kita:',withdrawn:'Na-withdraw:',withdraw_btn:'💸 I-withdraw',withdraw_title:'💸 I-WITHDRAW',saldo_lbl:'BALANSE',amount_lbl:'Halaga',acc_lbl:'Account',btn_wd:'💸 I-withdraw',comm_per:'KOMISYON BAWAT TORNEO',no_tourn_yet:'Gumawa ng iyong unang torneo!',online:'ONLINE',logout:'Mag-logout',select_bank:'-- Piliin ang Bangko --',preview_lbl:'PREVIEW NG KALAHOK',lang_lbl:'Wika',edit:'✏ I-edit',profile_title:'PROFILE NG ORGANIZER',change_photo:'I-click para palitan',name_lbl:'Pangalan ng Organizer',save_profile:'💾 I-save ang Profile',profile_saved:'✓ Na-save ang Profile!'},
  vi:{nav:['Bảng điều khiển','Hoa hồng','Giải đấu','Tạo mới','Người tham gia','Bracket','Tài chính','Cài đặt'],login:'Đăng nhập',register:'Đăng ký',email:'Email',password:'Mật khẩu',community:'Tên cộng đồng',btn_login:'🔑 Đăng nhập',btn_register:'🚀 Tạo tài khoản',dash_title:'Bảng điều khiển',dash_sub:'Tổng quan thời gian thực',active_t:'GIẢI ĐẤU ĐANG HOẠT ĐỘNG',revenue_lbl:'DOANH THU',quick:'THAO TÁC NHANH',btn_create:'＋ Tạo giải đấu',btn_comm:'📈 Hoa hồng',btn_part:'👥 Người tham gia',no_active:'Không có giải đấu',tourn_title:'Giải đấu',btn_create_t:'＋ Tạo',no_tourn:'KHÔNG CÓ GIẢI ĐẤU',share:'🔗 Chia sẻ',live_btn:'▶ Trực tiếp',close_btn:'■ Đóng',activate:'✓ Kích hoạt',create_title:'＋ TẠO GIẢI ĐẤU',edit_title:'✏ CHỈNH SỬA',tourn_name:'Tên giải đấu *',game:'Trò chơi',format:'Thể thức',city:'Thành phố *',date:'Ngày *',prize:'Tổng giải thưởng *',entry:'Phí tham gia *',slots:'Số suất',desc:'Mô tả',btn_save:'💾 Lưu',btn_create2:'🚀 Tạo',btn_cancel:'Hủy',teams_title:'Người tham gia & Đội',all:'Tất cả',btn_reg_team:'＋ Đăng ký đội',team_name:'Tên đội *',captain:'Đội trưởng *',contact:'Số điện thoại',members:'Thành viên',tournament:'Giải đấu *',paid_lbl:'Đã thanh toán',btn_reg2:'Đăng ký',no_teams:'Chưa có đội',finance_title:'Tài chính',total_entry:'Tổng phí',comm_lbl:'Hoa hồng 15%',done:'Hoàn thành',settings_title:'Cài đặt',account:'TÀI KHOẢN',connected:'✓ Đã kết nối',bank_title:'💳 THÔNG TIN THANH TOÁN',bank_desc:'Hiển thị cho người tham gia.',bank_name:'Tên ngân hàng',acc_num:'Số tài khoản',acc_owner:'Tên chủ tài khoản',wa_confirm:'WhatsApp xác nhận',btn_save_bank:'💾 Lưu',saved:'✓ Đã lưu!',expansion:'MỞ RỘNG ĐÔNG NAM Á',prize_pool:'Tổng giải thưởng',slots_left:'Suất còn lại',slot_filled:'Suất đã đăng ký',about:'GIỚI THIỆU',reg_teams:'ĐỘI ĐÃ ĐĂNG KÝ',full:'❌ Hết suất',reg_now:'✅ Đăng ký ngay →',closed_msg:'ĐÃ ĐÓNG',reg_title:'ĐĂNG KÝ ĐỘI',pay_title:'CÁCH THANH TOÁN',amount:'Số tiền phí',transfer_to:'Chuyển khoản:',acc_no:'Số TK:',an:'Tên:',confirm_wa:'Xác nhận qua WA:',contact_org:'📱 Liên hệ',btn_submit:'🚀 Gửi',registering:'Đang đăng ký...',success_title:'THÀNH CÔNG!',success_msg:'đã đăng ký tham gia',back:'← Quay lại',back_detail:'← Xem chi tiết',rev_title:'📈 BÁO CÁO HOA HỒNG',rev_sub:'Thu nhập thực',saldo:'SỐ DƯ',income:'Thu nhập:',withdrawn:'Đã rút:',withdraw_btn:'💸 Rút tiền',withdraw_title:'💸 RÚT TIỀN',saldo_lbl:'SỐ DƯ',amount_lbl:'Số tiền',acc_lbl:'Tài khoản',btn_wd:'💸 Rút',comm_per:'HOA HỒNG THEO GIẢI',no_tourn_yet:'Tạo giải đấu đầu tiên!',online:'TRỰC TUYẾN',logout:'Đăng xuất',select_bank:'-- Chọn ngân hàng --',preview_lbl:'XEM TRƯỚC',lang_lbl:'Ngôn ngữ',edit:'✏ Sửa',profile_title:'HỒ SƠ',change_photo:'Nhấn để đổi ảnh',name_lbl:'Tên ban tổ chức',save_profile:'💾 Lưu',profile_saved:'✓ Đã lưu!'},
  th:{nav:['แดชบอร์ด','ค่าคอมมิชชัน','ทัวร์นาเมนต์','สร้าง','ผู้เข้าร่วม','แบร็กเก็ต','การเงิน','ตั้งค่า'],login:'เข้าสู่ระบบ',register:'ลงทะเบียน',email:'อีเมล',password:'รหัสผ่าน',community:'ชื่อชุมชน',btn_login:'🔑 เข้าสู่ระบบ',btn_register:'🚀 สร้างบัญชี',dash_title:'แดชบอร์ด',dash_sub:'ภาพรวมแบบเรียลไทม์',active_t:'ทัวร์นาเมนต์ที่ใช้งาน',revenue_lbl:'รายได้',quick:'การดำเนินการด่วน',btn_create:'＋ สร้างทัวร์นาเมนต์',btn_comm:'📈 ค่าคอมมิชชัน',btn_part:'👥 ผู้เข้าร่วม',no_active:'ไม่มีทัวร์นาเมนต์',tourn_title:'ทัวร์นาเมนต์',btn_create_t:'＋ สร้าง',no_tourn:'ไม่มีทัวร์นาเมนต์',share:'🔗 แชร์',live_btn:'▶ ไลฟ์',close_btn:'■ ปิด',activate:'✓ เปิดใช้งาน',create_title:'＋ สร้างทัวร์นาเมนต์',edit_title:'✏ แก้ไข',tourn_name:'ชื่อ *',game:'เกม',format:'รูปแบบ',city:'เมือง *',date:'วันที่ *',prize:'รางวัล *',entry:'ค่าธรรมเนียม *',slots:'ที่นั่ง',desc:'คำอธิบาย',btn_save:'💾 บันทึก',btn_create2:'🚀 สร้าง',btn_cancel:'ยกเลิก',teams_title:'ผู้เข้าร่วมและทีม',all:'ทั้งหมด',btn_reg_team:'＋ ลงทะเบียนทีม',team_name:'ชื่อทีม *',captain:'กัปตัน *',contact:'โทรศัพท์',members:'สมาชิก',tournament:'ทัวร์นาเมนต์ *',paid_lbl:'ชำระแล้ว',btn_reg2:'ลงทะเบียน',no_teams:'ยังไม่มีทีม',finance_title:'การเงิน',total_entry:'ค่าธรรมเนียมรวม',comm_lbl:'ค่าคอมมิชชัน 15%',done:'เสร็จสิ้น',settings_title:'การตั้งค่า',account:'บัญชีผู้จัดงาน',connected:'✓ เชื่อมต่อแล้ว',bank_title:'💳 ข้อมูลการชำระเงิน',bank_desc:'แสดงให้ผู้เข้าร่วมเห็น',bank_name:'ชื่อธนาคาร',acc_num:'เลขบัญชี',acc_owner:'ชื่อเจ้าของบัญชี',wa_confirm:'WhatsApp ยืนยัน',btn_save_bank:'💾 บันทึก',saved:'✓ บันทึกแล้ว!',expansion:'การขยายตัวอาเซียน',prize_pool:'เงินรางวัลรวม',slots_left:'ที่นั่งที่เหลือ',slot_filled:'ที่นั่งที่จอง',about:'เกี่ยวกับ',reg_teams:'ทีมที่ลงทะเบียน',full:'❌ เต็มแล้ว',reg_now:'✅ ลงทะเบียน →',closed_msg:'ปิดรับสมัคร',reg_title:'ลงทะเบียนทีม',pay_title:'วิธีชำระ',amount:'จำนวนเงิน',transfer_to:'โอนไปที่:',acc_no:'เลขบัญชี:',an:'ชื่อ:',confirm_wa:'ยืนยันผ่าน WA:',contact_org:'📱 ติดต่อ',btn_submit:'🚀 ส่ง',registering:'กำลังลงทะเบียน...',success_title:'สำเร็จ!',success_msg:'ลงทะเบียนใน',back:'← กลับ',back_detail:'← ดูรายละเอียด',rev_title:'📈 รายงาน',rev_sub:'รายได้เรียลไทม์',saldo:'ยอดคงเหลือ',income:'รายรับ:',withdrawn:'ถอนออก:',withdraw_btn:'💸 ถอนเงิน',withdraw_title:'💸 ถอนเงิน',saldo_lbl:'ยอดคงเหลือ',amount_lbl:'จำนวน',acc_lbl:'บัญชี',btn_wd:'💸 ถอน',comm_per:'ค่าคอมมิชชันต่อทัวร์',no_tourn_yet:'สร้างทัวร์นาเมนต์แรก!',online:'ออนไลน์',logout:'ออกจากระบบ',select_bank:'-- เลือกธนาคาร --',preview_lbl:'ตัวอย่าง',lang_lbl:'ภาษา',edit:'✏ แก้ไข',profile_title:'โปรไฟล์',change_photo:'คลิกเพื่อเปลี่ยนรูป',name_lbl:'ชื่อผู้จัดงาน',save_profile:'💾 บันทึก',profile_saved:'✓ บันทึกแล้ว!'},
  zh:{nav:['仪表板','佣金','锦标赛','创建','参与者','对阵表','财务','设置'],login:'登录',register:'注册',email:'邮箱',password:'密码',community:'社区名称',btn_login:'🔑 登录',btn_register:'🚀 创建账户',dash_title:'仪表板',dash_sub:'实时概览',active_t:'进行中的锦标赛',revenue_lbl:'收入',quick:'快速操作',btn_create:'＋ 创建锦标赛',btn_comm:'📈 佣金',btn_part:'👥 参与者',no_active:'暂无锦标赛',tourn_title:'锦标赛',btn_create_t:'＋ 创建',no_tourn:'暂无锦标赛',share:'🔗 分享',live_btn:'▶ 直播',close_btn:'■ 关闭',activate:'✓ 激活',create_title:'＋ 创建锦标赛',edit_title:'✏ 编辑',tourn_name:'名称 *',game:'游戏',format:'格式',city:'城市 *',date:'日期 *',prize:'奖金池 *',entry:'报名费 *',slots:'名额',desc:'描述',btn_save:'💾 保存',btn_create2:'🚀 创建',btn_cancel:'取消',teams_title:'参与者和队伍',all:'全部',btn_reg_team:'＋ 注册队伍',team_name:'队伍名称 *',captain:'队长 *',contact:'电话',members:'成员',tournament:'锦标赛 *',paid_lbl:'已支付',btn_reg2:'注册',no_teams:'暂无队伍',finance_title:'财务',total_entry:'总报名费',comm_lbl:'佣金 15%',done:'已完成',settings_title:'设置',account:'主办方账户',connected:'✓ 已连接',bank_title:'💳 支付信息',bank_desc:'显示给参与者。',bank_name:'银行名称',acc_num:'账号',acc_owner:'账户持有人',wa_confirm:'WhatsApp 确认',btn_save_bank:'💾 保存',saved:'✓ 已保存!',expansion:'东南亚扩张',prize_pool:'总奖金池',slots_left:'剩余名额',slot_filled:'已报名',about:'关于',reg_teams:'已注册队伍',full:'❌ 已满',reg_now:'✅ 立即报名 →',closed_msg:'已截止',reg_title:'注册队伍',pay_title:'如何支付',amount:'金额',transfer_to:'转账至:',acc_no:'账号:',an:'姓名:',confirm_wa:'通过WA确认:',contact_org:'📱 联系主办方',btn_submit:'🚀 提交',registering:'注册中...',success_title:'成功!',success_msg:'已报名参加',back:'← 返回',back_detail:'← 查看详情',rev_title:'📈 佣金报告',rev_sub:'实时收入',saldo:'可用余额',income:'收入:',withdrawn:'已提现:',withdraw_btn:'💸 提现',withdraw_title:'💸 提现',saldo_lbl:'余额',amount_lbl:'金额',acc_lbl:'账户',btn_wd:'💸 提现',comm_per:'各锦标赛佣金',no_tourn_yet:'创建第一个锦标赛!',online:'在线',logout:'退出',select_bank:'-- 选择银行 --',preview_lbl:'参与者预览',lang_lbl:'语言',edit:'✏ 编辑',profile_title:'主办方资料',change_photo:'点击更换头像',name_lbl:'名称',save_profile:'💾 保存',profile_saved:'✓ 已保存!'},
  ms:{nav:['Papan Pemuka','Komisen','Kejohanan','Cipta','Peserta','Bracket','Kewangan','Tetapan'],login:'Log Masuk',register:'Daftar',email:'E-mel',password:'Kata Laluan',community:'Nama Komuniti',btn_login:'🔑 Log Masuk',btn_register:'🚀 Buat Akaun',dash_title:'Papan Pemuka',dash_sub:'Gambaran masa nyata',active_t:'KEJOHANAN AKTIF',revenue_lbl:'PENDAPATAN',quick:'TINDAKAN PANTAS',btn_create:'＋ Cipta Kejohanan',btn_comm:'📈 Komisen',btn_part:'👥 Peserta',no_active:'Tiada kejohanan aktif',tourn_title:'Kejohanan',btn_create_t:'＋ Cipta',no_tourn:'TIADA KEJOHANAN',share:'🔗 Kongsi',live_btn:'▶ Langsung',close_btn:'■ Tutup',activate:'✓ Aktifkan',create_title:'＋ CIPTA KEJOHANAN',edit_title:'✏ SUNTING',tourn_name:'Nama *',game:'Permainan',format:'Format',city:'Bandar *',date:'Tarikh *',prize:'Hadiah *',entry:'Yuran *',slots:'Slot',desc:'Penerangan',btn_save:'💾 Simpan',btn_create2:'🚀 Cipta',btn_cancel:'Batal',teams_title:'Peserta & Pasukan',all:'Semua',btn_reg_team:'＋ Daftar Pasukan',team_name:'Nama Pasukan *',captain:'Kapten *',contact:'Telefon',members:'Ahli',tournament:'Kejohanan *',paid_lbl:'Yuran dibayar',btn_reg2:'Daftar',no_teams:'Tiada pasukan',finance_title:'Kewangan',total_entry:'Jumlah Yuran',comm_lbl:'Komisen 15%',done:'Selesai',settings_title:'Tetapan',account:'AKAUN PENGANJUR',connected:'✓ Disambungkan',bank_title:'💳 MAKLUMAT BAYARAN',bank_desc:'Dipaparkan kepada peserta.',bank_name:'Nama Bank',acc_num:'Nombor Akaun',acc_owner:'Nama Pemilik',wa_confirm:'WhatsApp Pengesahan',btn_save_bank:'💾 Simpan',saved:'✓ Tersimpan!',expansion:'PENGEMBANGAN SEA',prize_pool:'Jumlah Hadiah',slots_left:'Slot Berbaki',slot_filled:'Slot Diisi',about:'TENTANG',reg_teams:'PASUKAN BERDAFTAR',full:'❌ Penuh',reg_now:'✅ Daftar Sekarang →',closed_msg:'PENDAFTARAN TUTUP',reg_title:'DAFTAR PASUKAN',pay_title:'CARA BAYAR',amount:'Jumlah Yuran',transfer_to:'Pindah ke:',acc_no:'No. Akaun:',an:'Nama:',confirm_wa:'Sahkan WA:',contact_org:'📱 Hubungi',btn_submit:'🚀 Hantar',registering:'Mendaftar...',success_title:'BERJAYA!',success_msg:'didaftarkan dalam',back:'← Kembali',back_detail:'← Lihat',rev_title:'📈 LAPORAN',rev_sub:'Pendapatan masa nyata',saldo:'BAKI',income:'Masuk:',withdrawn:'Keluar:',withdraw_btn:'💸 Keluarkan',withdraw_title:'💸 PENGELUARAN',saldo_lbl:'BAKI',amount_lbl:'Jumlah',acc_lbl:'Akaun',btn_wd:'💸 Keluarkan',comm_per:'KOMISEN PER KEJOHANAN',no_tourn_yet:'Cipta kejohanan pertama!',online:'DALAM TALIAN',logout:'Log Keluar',select_bank:'-- Pilih Bank --',preview_lbl:'PRATONTON',lang_lbl:'Bahasa',edit:'✏ Sunting',profile_title:'PROFIL PENGANJUR',change_photo:'Klik untuk tukar foto',name_lbl:'Nama Penganjur',save_profile:'💾 Simpan',profile_saved:'✓ Tersimpan!'},
}

const LANG_OPTIONS=[
  {code:'id',img:'https://flagcdn.com/w40/id.png',label:'ID',name:'Indonesia'},
  {code:'en',img:'https://flagcdn.com/w40/gb.png',label:'EN',name:'English'},
  {code:'fil',img:'https://flagcdn.com/w40/ph.png',label:'PH',name:'Filipino'},
  {code:'vi',img:'https://flagcdn.com/w40/vn.png',label:'VN',name:'Tiếng Việt'},
  {code:'th',img:'https://flagcdn.com/w40/th.png',label:'TH',name:'ภาษาไทย'},
  {code:'zh',img:'https://flagcdn.com/w40/cn.png',label:'CN',name:'中文'},
  {code:'ms',img:'https://flagcdn.com/w40/my.png',label:'MY',name:'Melayu'},
]

const getLang=()=>{try{return localStorage.getItem('arenagg_lang')||'id'}catch(e){return'id'}}
const getTheme=()=>{try{return localStorage.getItem('arenagg_theme')||'dark'}catch(e){return'dark'}}
const saveTheme=t=>{try{localStorage.setItem('arenagg_theme',t);document.documentElement.setAttribute('data-theme',t==='light'?'light':'')}catch(e){}}
const setLang=l=>{try{localStorage.setItem('arenagg_lang',l)}catch(e){}}
const getProf=()=>{try{return JSON.parse(localStorage.getItem('arenagg_profile')||'{}')}catch(e){return{}}}
const saveProf=p=>{try{localStorage.setItem('arenagg_profile',JSON.stringify(p))}catch(e){}}
const GAMES=['Mobile Legends','PUBG Mobile','Free Fire','Valorant','Clash Royale']
const FORMATS=['Single Elimination','Double Elimination','Round Robin','Swiss']
const fmtRp=n=>'Rp '+Number(n).toLocaleString('id-ID')
const uid=()=>Math.random().toString(36).slice(2,18)
const NAV_IDS=['dashboard','revenue','tournaments','create','teams','bracket','finance','settings']

const css=`*{margin:0;padding:0;box-sizing:border-box;}:root{--bg:#050508;--bg2:#0a0a12;--bg3:#0f0f1a;--panel:#13131f;--border:#1a1a2e;--border2:#252540;--cyan:#00e5ff;--orange:#ff6b00;--green:#00ff88;--red:#ff2d55;--yellow:#ffd700;--text:#e8e8f0;--text2:#b0b0c8;--muted:#4a4a6a;--fh:'Orbitron',sans-serif;--fb:'Rajdhani',sans-serif;--fm:'Share Tech Mono',monospace;--shadow:0 8px 32px rgba(0,0,0,0.4);--glow-cyan:0 0 20px rgba(0,229,255,0.15);--trans:all 0.3s cubic-bezier(0.4,0,0.2,1);}[data-theme="light"]{--bg:#f0f2f8;--bg2:#e4e6f4;--bg3:#d8daee;--panel:#ffffff;--border:#d0d2e8;--border2:#c0c2d8;--cyan:#0077aa;--orange:#dd4400;--green:#006633;--red:#bb0022;--yellow:#996600;--text:#1a1a2e;--text2:#4a4a6a;--muted:#8a8aaa;--shadow:0 4px 16px rgba(0,0,0,0.08);--glow-cyan:0 0 12px rgba(0,119,170,0.1);}body,body *{transition:background-color 0.35s ease,border-color 0.35s ease,color 0.35s ease;}body{background:var(--bg);color:var(--text);font-family:var(--fb);background-image:radial-gradient(ellipse at 20% 50%,rgba(0,229,255,0.025) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(255,107,0,0.018) 0%,transparent 60%);}[data-theme="light"] body{background-image:radial-gradient(ellipse at 20% 50%,rgba(0,119,170,0.04) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(221,68,0,0.03) 0%,transparent 60%);}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:var(--cyan);border-radius:2px;opacity:0.5;}@keyframes slide-in{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}@keyframes slide-in-r{from{opacity:0;transform:translateX(14px);}to{opacity:1;transform:translateX(0);}}@keyframes fade-in{from{opacity:0;}to{opacity:1;}}@keyframes glow-pulse{0%,100%{text-shadow:0 0 10px var(--cyan),0 0 30px var(--cyan);}50%{text-shadow:0 0 4px var(--cyan);}}@keyframes flicker{0%,19%,21%,25%,54%,56%,100%{opacity:1;}20%,24%,55%{opacity:0.3;}}@keyframes bar-fill{from{width:0!important;}}@keyframes spin{to{transform:rotate(360deg);}}@keyframes pop-in{from{opacity:0;transform:scale(0.92);}to{opacity:1;transform:scale(1);}}@keyframes bounce-in{0%{transform:translateY(40px);opacity:0;}60%{transform:translateY(-4px);}100%{transform:translateY(0);opacity:1;}}@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}.animate-in{animation:slide-in 0.35s cubic-bezier(0.4,0,0.2,1) both;}
.animate-in>*:nth-child(1){animation-delay:0s}
.animate-in>*:nth-child(2){animation-delay:0.04s}
.animate-in>*:nth-child(3){animation-delay:0.08s}
.animate-in>*:nth-child(4){animation-delay:0.12s}
.animate-in>*:nth-child(5){animation-delay:0.16s}
.animate-in>*:nth-child(6){animation-delay:0.20s}.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border:none;border-radius:7px;font-family:var(--fh);font-size:10px;font-weight:700;letter-spacing:1.5px;cursor:pointer;transition:var(--trans);text-transform:uppercase;position:relative;overflow:hidden;}.btn::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0.12);opacity:0;transition:opacity 0.2s;border-radius:inherit;}.btn:hover::after{opacity:1;}.btn:active{transform:scale(0.97);}.btn:disabled{opacity:0.4;cursor:not-allowed;}.btn:disabled::after{display:none;}.btn-cyan{background:linear-gradient(135deg,var(--cyan),#0099bb);color:#000;box-shadow:0 4px 14px rgba(0,229,255,0.25);}.btn-cyan:not(:disabled):hover{box-shadow:0 4px 22px rgba(0,229,255,0.45);transform:translateY(-1px);}.btn-orange{background:linear-gradient(135deg,var(--orange),#cc4400);color:#fff;}.btn-orange:not(:disabled):hover{box-shadow:0 4px 22px rgba(255,107,0,0.4);transform:translateY(-1px);}.btn-ghost{background:transparent;color:var(--cyan);border:1px solid rgba(0,229,255,0.3);}.btn-ghost:not(:disabled):hover{background:rgba(0,229,255,0.08);border-color:var(--cyan);}.btn-danger{background:linear-gradient(135deg,var(--red),#cc0033);color:#fff;}.btn-green{background:linear-gradient(135deg,var(--green),#00bb55);color:#000;}.btn-dark{background:var(--panel);color:var(--text);border:1px solid var(--border);}.btn-dark:hover{border-color:rgba(0,229,255,0.3);}.btn-sm{padding:5px 12px;font-size:9px;}.btn-full{width:100%;justify-content:center;}.card{background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:20px;position:relative;overflow:hidden;transition:var(--trans);}.card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,229,255,0.25),transparent);}.card:hover{border-color:var(--border2);box-shadow:var(--shadow);}
.card-glass{background:rgba(19,19,31,0.6);backdrop-filter:blur(12px);border:1px solid rgba(0,229,255,0.12);border-radius:12px;padding:20px;position:relative;overflow:hidden;transition:var(--trans);}
[data-theme="light"] .card-glass{background:rgba(255,255,255,0.7);border-color:rgba(0,119,170,0.15);}
.card-glass:hover{border-color:rgba(0,229,255,0.25);box-shadow:var(--shadow);}
.metric-chip{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:20px;font-family:var(--fm);font-size:9px;font-weight:600;letter-spacing:1px;}
.metric-up{background:rgba(0,255,136,0.1);color:var(--green);border:1px solid rgba(0,255,136,0.2);}
.metric-down{background:rgba(255,45,85,0.1);color:var(--red);border:1px solid rgba(255,45,85,0.2);}
.metric-neutral{background:rgba(0,229,255,0.08);color:var(--cyan);border:1px solid rgba(0,229,255,0.2);}.stat-card{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:18px;position:relative;overflow:hidden;transition:var(--trans);}.stat-card:hover{border-color:rgba(0,229,255,0.2);transform:translateY(-3px);box-shadow:var(--shadow),var(--glow-cyan);}.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent-color,var(--cyan)),transparent);}.stat-card::after{content:'';position:absolute;top:-30px;right:-30px;width:80px;height:80px;background:var(--accent-color,var(--cyan));opacity:0.04;border-radius:50%;transition:var(--trans);}.stat-card:hover::after{transform:scale(1.3);}.tag{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:4px;font-family:var(--fm);font-size:9px;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;}.tag-active{background:rgba(0,255,136,0.1);color:var(--green);border:1px solid rgba(0,255,136,0.2);}.tag-pending{background:rgba(255,215,0,0.1);color:var(--yellow);border:1px solid rgba(255,215,0,0.2);}.tag-closed{background:rgba(74,74,106,0.1);color:var(--muted);border:1px solid var(--border);}.tag-live{background:rgba(255,45,85,0.12);color:var(--red);border:1px solid rgba(255,45,85,0.35);animation:flicker 2s infinite;font-weight:900;}input,select,textarea{background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:7px;color:var(--text);font-family:var(--fb);font-size:14px;padding:10px 14px;width:100%;outline:none;transition:var(--trans);}[data-theme="light"] input,[data-theme="light"] select,[data-theme="light"] textarea{background:rgba(0,0,0,0.03);}input:focus,select:focus,textarea:focus{border-color:var(--cyan);box-shadow:0 0 0 3px rgba(0,229,255,0.07);outline:none;}input:hover,select:hover,textarea:hover{border-color:var(--border2);}input::placeholder,textarea::placeholder{color:var(--muted);}label{display:block;font-size:10px;font-family:var(--fm);color:var(--muted);margin-bottom:5px;text-transform:uppercase;letter-spacing:1px;}.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}@media(max-width:900px){.g4{grid-template-columns:1fr 1fr;}.g3{grid-template-columns:1fr 1fr;}}@media(max-width:600px){.g2,.g3,.g4{grid-template-columns:1fr;}}hr.div{border:none;border-top:1px solid var(--border);margin:16px 0;}.pbar{height:4px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;}[data-theme="light"] .pbar{background:rgba(0,0,0,0.06);}.pfill{height:100%;border-radius:4px;animation:bar-fill 0.9s cubic-bezier(0.4,0,0.2,1);}.sidebar{width:220px;min-width:220px;background:var(--bg2);border-right:1px solid var(--border);display:flex;flex-direction:column;height:100vh;position:sticky;top:0;z-index:100;transition:var(--trans);}.sidebar::after{content:'';position:absolute;top:0;right:0;width:1px;height:100%;background:linear-gradient(180deg,transparent,var(--cyan),transparent);opacity:0.15;}.nav-item{display:flex;align-items:center;gap:9px;padding:9px 13px;border-radius:7px;cursor:pointer;font-family:var(--fb);font-size:13px;font-weight:500;color:var(--muted);transition:var(--trans);border:none;background:none;width:100%;text-align:left;margin-bottom:2px;position:relative;overflow:hidden;}.nav-item::before{content:'';position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,rgba(0,229,255,0.1),transparent);transition:width 0.3s ease;border-radius:7px;}.nav-item:hover{color:var(--text);}.nav-item:hover::before{width:100%;}.nav-item.active{color:var(--cyan);background:linear-gradient(90deg,rgba(0,229,255,0.1),transparent);border-left:2px solid var(--cyan);padding-left:11px;}.nav-item.active::before{width:100%;}.nav-icon{font-size:15px;width:20px;text-align:center;flex-shrink:0;}.theme-toggle-btn{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:7px;border:1px solid var(--border);background:rgba(255,255,255,0.03);cursor:pointer;transition:var(--trans);width:100%;margin-bottom:6px;}.theme-toggle-btn:hover{border-color:rgba(0,229,255,0.3);background:rgba(0,229,255,0.04);}.tt-label{font-family:var(--fm);font-size:9px;color:var(--muted);letter-spacing:1px;}.tt-track{width:34px;height:18px;border-radius:9px;background:var(--border);position:relative;transition:background 0.3s ease;flex-shrink:0;}.tt-track.on{background:var(--cyan);}.tt-knob{width:13px;height:13px;background:#fff;border-radius:50%;position:absolute;top:2.5px;left:2.5px;transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);}.tt-track.on .tt-knob{transform:translateX(16px);}.bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:var(--bg2);border-top:1px solid var(--border);z-index:200;padding:4px 0;grid-template-columns:repeat(8,1fr);backdrop-filter:blur(10px);}.bnav-item{display:flex;flex-direction:column;align-items:center;gap:1px;padding:5px 2px;border:none;background:none;cursor:pointer;color:var(--muted);font-family:var(--fm);font-size:6px;text-transform:uppercase;transition:var(--trans);flex:1;}.bnav-item.active{color:var(--cyan);}.bnav-icon{font-size:15px;line-height:1.2;}.toast-wrap{position:fixed;bottom:80px;right:14px;z-index:9999;display:flex;flex-direction:column;gap:6px;}@media(min-width:769px){.toast-wrap{bottom:18px;}}.toast{background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:10px 14px;font-size:12px;animation:slide-in-r 0.3s cubic-bezier(0.4,0,0.2,1);display:flex;align-items:center;gap:8px;max-width:290px;box-shadow:var(--shadow);}.toast-success{border-left:3px solid var(--green);}.toast-error{border-left:3px solid var(--red);}.toast-info{border-left:3px solid var(--cyan);}.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.82);backdrop-filter:blur(8px);z-index:500;display:flex;align-items:center;justify-content:center;padding:16px;animation:fade-in 0.2s ease;}.modal{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:24px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;animation:pop-in 0.25s cubic-bezier(0.4,0,0.2,1);box-shadow:var(--shadow);}.auth-bg{min-height:100vh;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:20px;background-image:radial-gradient(ellipse at 20% 50%,rgba(0,229,255,0.05) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(255,107,0,0.04) 0%,transparent 60%);}.live-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:pulse 1.5s infinite;display:inline-block;margin-right:5px;vertical-align:middle;}.b-match{background:var(--panel);border:1px solid var(--border);border-radius:5px;width:155px;overflow:hidden;}.b-team{padding:7px 10px;font-size:11px;font-weight:600;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);}.b-team:last-child{border-bottom:none;}.b-team.winner{background:rgba(0,255,136,0.06);color:var(--green);}.b-team.loser{color:var(--muted);}.lang-btn{background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:5px;padding:4px 7px;cursor:pointer;transition:var(--trans);display:inline-flex;align-items:center;gap:4px;}[data-theme="light"] .lang-btn{background:rgba(0,0,0,0.03);}.lang-btn:hover,.lang-btn.active{border-color:var(--cyan);background:rgba(0,229,255,0.08);}.lang-flag{width:20px;height:13px;object-fit:cover;border-radius:2px;display:block;}.lang-code{font-size:9px;color:var(--muted);font-family:var(--fm);line-height:1;}.lang-btn.active .lang-code{color:var(--cyan);}@media(max-width:768px){.sidebar{display:none;}.bottom-nav{display:grid;}main{padding-bottom:70px;}}@media(min-width:769px){.bottom-nav{display:none !important;}}`
const styleEl=document.createElement('style');styleEl.textContent=css;document.head.appendChild(styleEl)
// Add Google Fonts if not present
if(!document.getElementById('arenagg-fonts')){const lk=document.createElement('link');lk.id='arenagg-fonts';lk.rel='stylesheet';lk.href='https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap';document.head.appendChild(lk)}
// Init theme from localStorage
const savedTheme=localStorage.getItem('arenagg_theme');if(savedTheme==='light')document.documentElement.setAttribute('data-theme','light')

function Spinner({size=16,color='currentColor'}){return <span style={{width:size,height:size,border:`2px solid rgba(255,255,255,0.15)`,borderTopColor:color,borderRadius:'50%',animation:'spin 0.7s linear infinite',display:'inline-block',flexShrink:0}}/>}
function Toasts({list}){return <div className="toast-wrap">{list.map(t=><div key={t.id} className={`toast toast-${t.type}`}><span>{t.type==='success'?'✓':t.type==='error'?'✗':'ℹ'}</span><span>{t.msg}</span></div>)}</div>}

function LangSelector({lang,setLangFn}){
  return <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
    {LANG_OPTIONS.map(l=>(
      <button key={l.code} className={`lang-btn${lang===l.code?' active':''}`} onClick={()=>setLangFn(l.code)} title={l.name}>
        <img src={l.img} className="lang-flag" alt={l.label} onError={e=>{e.target.style.display='none'}}/>
        <span className="lang-code">{l.label}</span>
      </button>
    ))}
  </div>
}

function LiveBanner({tournaments}){
  const liveT=(tournaments||[]).filter(t=>t.status==='live')
  if(!liveT.length)return null
  return <div style={{background:'linear-gradient(90deg,rgba(255,45,85,0.95),rgba(255,107,0,0.9))',padding:'9px 20px',display:'flex',alignItems:'center',gap:12,flexWrap:'wrap',boxShadow:'0 2px 20px rgba(255,45,85,0.3)'}}>
    <span style={{width:10,height:10,borderRadius:'50%',background:'#fff',animation:'pulse 0.8s infinite',display:'inline-block',flexShrink:0}}/>
    <span style={{fontFamily:'var(--fh)',fontSize:11,color:'#fff',letterSpacing:2,fontWeight:900}}>🔴 LIVE NOW</span>
    {liveT.map(t=><span key={t.id} style={{fontFamily:'var(--fh)',fontSize:10,color:'#fff',background:'rgba(0,0,0,0.2)',padding:'2px 10px',borderRadius:20,border:'1px solid rgba(255,255,255,0.2)'}}>⚔ {t.name}</span>)}
  </div>
}

// QR memakai Google Charts API — dijamin berfungsi
function QRImg({value,size=155}){
  const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&bgcolor=ffffff&color=000000&margin=8`
  return <img src={url} width={size} height={size} style={{borderRadius:7,display:'block',border:'4px solid white'}} alt="QR"/>
}

// AUTH — pilih bahasa hanya di sini
function AuthPage({onLogin,lang,setLangFn}){
  const i=T[lang]||T.id
  const[mode,setMode]=useState('login');const[email,setEmail]=useState('');const[pass,setPass]=useState('');const[name,setName]=useState('');const[loading,setL]=useState(false);const[err,setErr]=useState('')
  const submit=async()=>{setErr('');setL(true);try{if(mode==='login'){const{data,error}=await supabase.auth.signInWithPassword({email,password:pass});if(error)throw error;onLogin(data.user);}else{const{data,error}=await supabase.auth.signUp({email,password:pass,options:{data:{organizer_name:name||email.split('@')[0]}}});if(error)throw error;if(data.user&&!data.session){setErr('Cek email untuk konfirmasi.');setMode('login');}else if(data.user)onLogin(data.user);}}catch(e){setErr(e.message||'Error')}setL(false)}
  return <div className="auth-bg"><div style={{width:'100%',maxWidth:420}}>
    <div style={{textAlign:'center',marginBottom:30}}>
      <div style={{fontFamily:'var(--fh)',fontSize:28,fontWeight:900,color:'var(--cyan)',letterSpacing:3,animation:'glow-pulse 3s infinite',marginBottom:6}}>⚔ ARENAGG</div>
      <div style={{fontSize:10,color:'var(--muted)',fontFamily:'var(--fm)',letterSpacing:2}}>ESPORT TOURNAMENT PLATFORM</div>
      <div style={{fontSize:8,color:'rgba(0,229,255,0.35)',fontFamily:'var(--fm)',letterSpacing:3,marginTop:2}}>— MULTILINGUAL PLATFORM —</div>
      <div style={{marginTop:14,display:'flex',justifyContent:'center'}}><LangSelector lang={lang} setLangFn={setLangFn}/></div>
    </div>
    <div style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:12,padding:'28px 24px',boxShadow:'var(--shadow)'}}>
      <div style={{display:'flex',background:'rgba(255,255,255,0.04)',borderRadius:6,padding:3,marginBottom:22}}>{[{id:'login',label:i.login},{id:'register',label:i.register}].map(t=><button key={t.id} onClick={()=>{setMode(t.id);setErr('')}} style={{flex:1,padding:9,border:'none',borderRadius:4,cursor:'pointer',fontFamily:'var(--fh)',fontSize:10,letterSpacing:1,transition:'all 0.2s',background:mode===t.id?'var(--cyan)':'transparent',color:mode===t.id?'#000':'var(--muted)'}}>{t.label}</button>)}</div>
      {mode==='register'&&<div style={{marginBottom:13}}><label>{i.community}</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="GamingID Org"/></div>}
      <div style={{marginBottom:13}}><label>{i.email}</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="kamu@email.com"/></div>
      <div style={{marginBottom:20}}><label>{i.password}</label><input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==='Enter'&&submit()}/></div>
      {err&&<div style={{color:'var(--red)',fontSize:11,marginBottom:13,padding:'9px 12px',background:'rgba(255,45,85,0.06)',borderRadius:5,border:'1px solid rgba(255,45,85,0.2)'}}>⚠ {err}</div>}
      <button className="btn btn-cyan btn-full" onClick={submit} disabled={!email||!pass||loading} style={{fontSize:12,padding:13}}>{loading?<><Spinner size={13} color="#000"/>...</>:mode==='login'?i.btn_login:i.btn_register}</button>
    </div>
  </div></div>
}

function useData(userId,toast){
  const[tournaments,setT]=useState([]);const[teams,setTeams]=useState([]);const[loading,setL]=useState(true)
  const load=useCallback(async()=>{if(!userId){setL(false);return;}setL(true);try{const[{data:ts},{data:tms}]=await Promise.all([supabase.from('tournaments').select('*').eq('organizer_id',userId).order('created_at',{ascending:false}),supabase.from('teams').select('*,tournaments!inner(organizer_id)').eq('tournaments.organizer_id',userId)]);setT(ts||[]);setTeams((tms||[]).map(({tournaments:_,...rest})=>rest));}catch(e){toast('Error: '+e.message,'error')}setL(false)},[userId])
  useEffect(()=>{load()},[load])
  useEffect(()=>{if(!userId)return;const ch=supabase.channel('db').on('postgres_changes',{event:'*',schema:'public',table:'tournaments'},load).on('postgres_changes',{event:'*',schema:'public',table:'teams'},load).subscribe();return()=>supabase.removeChannel(ch)},[userId,load])
  const addT=async d=>{const{error}=await supabase.from('tournaments').insert({...d,organizer_id:userId});if(error){toast('Error: '+error.message,'error');return;}await load()}
  const updateT=async(id,d)=>{const{error}=await supabase.from('tournaments').update(d).eq('id',id).eq('organizer_id',userId);if(error){toast('Error: '+error.message,'error');return;}await load()}
  const deleteT=async id=>{await supabase.from('tournaments').delete().eq('id',id).eq('organizer_id',userId);await load()}
  const addTeam=async d=>{const{error}=await supabase.from('teams').insert(d);if(error){toast('Error: '+error.message,'error');return;}const cnt=teams.filter(t=>t.tournament_id===d.tournament_id).length+1;await supabase.from('tournaments').update({registered:cnt}).eq('id',d.tournament_id);await load()}
  const updateTeam=async(id,d)=>{await supabase.from('teams').update(d).eq('id',id);await load()}
  const deleteTeam=async(id,tid)=>{await supabase.from('teams').delete().eq('id',id);const cnt=teams.filter(t=>t.tournament_id===tid&&t.id!==id).length;await supabase.from('tournaments').update({registered:cnt}).eq('id',tid);await load()}
  return{tournaments,teams,loading,reload:load,addT,updateT,deleteT,addTeam,updateTeam,deleteTeam}
}

function ShareModal({t,onClose,toast,onPreview}){
  const origin=window.location.origin
  const link=`${origin}/#/daftar/${t.id}`
  const wa=encodeURIComponent(`🎮 *${t.name}*\n📍 ${t.city}\n🏆 ${fmtRp(t.prize)}\n🎫 Entry: ${fmtRp(t.entry)}/tim\n\n👉 ${link}`)
  const copy=()=>{
    const fallback=()=>{const el=document.createElement('textarea');el.value=link;el.style.cssText='position:fixed;opacity:0';document.body.appendChild(el);el.select();try{document.execCommand('copy');toast('✓ Link disalin!','success')}catch(e){}document.body.removeChild(el)}
    if(navigator.clipboard)navigator.clipboard.writeText(link).then(()=>toast('✓ Link disalin!','success')).catch(fallback)
    else fallback()
  }
  return <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div className="modal">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
        <div style={{fontFamily:'var(--fh)',fontSize:11,color:'var(--cyan)',letterSpacing:1}}>🔗 BAGIKAN TURNAMEN</div>
        <button onClick={onClose} style={{background:'none',border:'none',color:'var(--muted)',cursor:'pointer',fontSize:20,lineHeight:1}}>×</button>
      </div>
      <div style={{background:'linear-gradient(135deg,rgba(0,229,255,0.06),rgba(255,107,0,0.04))',border:'1px solid rgba(0,229,255,0.15)',borderRadius:8,padding:'11px 13px',marginBottom:14}}>
        <div style={{fontWeight:700,fontSize:15,marginBottom:3}}>{t.name}</div>
        <div style={{fontSize:11,color:'var(--muted)'}}>{t.game} · {t.city}</div>
        <div style={{fontSize:11,color:'var(--yellow)',marginTop:3}}>🏆 {fmtRp(t.prize)} · Entry {fmtRp(t.entry)}/tim</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8,marginBottom:14,padding:14,background:'#fff',borderRadius:10}}>
        <QRImg value={link} size={155}/>
        <div style={{fontSize:9,color:'#888',fontFamily:'monospace',textAlign:'center',wordBreak:'break-all',maxWidth:200}}>{t.name.toUpperCase()}</div>
      </div>
      <div style={{background:'rgba(0,229,255,0.05)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:6,padding:'8px 11px',display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
        <span style={{flex:1,fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',wordBreak:'break-all',lineHeight:1.5}}>{link}</span>
        <button className="btn btn-cyan btn-sm" onClick={copy} style={{flexShrink:0}}>SALIN</button>
      </div>
      <button onClick={()=>{onClose();onPreview(t.id)}} className="btn btn-ghost btn-full" style={{marginBottom:10,fontSize:10}}>👁 PREVIEW HALAMAN PESERTA</button>
      <div style={{display:'flex',gap:7}}>
        <a href={`https://wa.me/?text=${wa}`} target="_blank" rel="noreferrer" style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:5,padding:9,background:'#25D366',borderRadius:5,color:'white',textDecoration:'none',fontWeight:700,fontFamily:'var(--fh)',fontSize:9,letterSpacing:1}}>📱 WhatsApp</a>
        <a href={`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(t.name)}`} target="_blank" rel="noreferrer" style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:5,padding:9,background:'#229ED9',borderRadius:5,color:'white',textDecoration:'none',fontWeight:700,fontFamily:'var(--fh)',fontSize:9,letterSpacing:1}}>✈ Telegram</a>
        <button onClick={copy} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:5,padding:9,background:'var(--panel)',borderRadius:5,border:'1px solid var(--border)',color:'var(--text)',cursor:'pointer',fontWeight:700,fontFamily:'var(--fh)',fontSize:9}}>🔗 Copy</button>
      </div>
    </div>
  </div>
}

// PUBLIC PAGE — Fix routing, cari turnamen dengan ID yang tepat
function PublicPage({tid,onBack,toast}){
  const[t,setT]=useState(null);const[teams,setTms]=useState([]);const[loading,setL]=useState(true)
  const[step,setStep]=useState('detail');const[form,setForm]=useState({name:'',captain:'',contact:'',members:'5',photo:''});const[saving,setSaving]=useState(false)
  const[lang,setLangState]=useState(getLang())
  const i=T[lang]||T.id
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}))
  useEffect(()=>{
    const load=async()=>{
      if(!tid){setL(false);return}
      const cleanId=tid.trim()
      console.log('Loading tournament ID:', cleanId)
      try{
        const[{data:td,error:e1},{data:tms}]=await Promise.all([
          supabase.from('tournaments').select('*').eq('id',cleanId).single(),
          supabase.from('teams').select('*').eq('tournament_id',cleanId).order('created_at')
        ])
        if(e1||!td){console.error('Not found:',cleanId,e1);setT(null)}
        else{setT(td);setTms(tms||[])}
      }catch(e){console.error(e);setT(null)}
      setL(false)
    };load()
  },[tid])
  const submit=async()=>{
    if(!form.name||!form.captain||!form.contact){toast('Isi semua field!','error');return}
    setSaving(true)
    const{error}=await supabase.from('teams').insert({tournament_id:tid.trim(),name:form.name,captain:form.captain,contact:form.contact,members:Number(form.members),paid:false,photo:form.photo||null})
    if(error){toast('Error: '+error.message,'error');setSaving(false);return}
    await supabase.from('tournaments').update({registered:(t?.registered||0)+1}).eq('id',tid.trim())
    setStep('success');setSaving(false)
  }
  if(loading)return <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{textAlign:'center'}}><div style={{fontFamily:'var(--fh)',fontSize:18,color:'var(--cyan)',letterSpacing:3,animation:'glow-pulse 2s infinite',marginBottom:16}}>⚔ ARENAGG</div><Spinner size={32} color="var(--cyan)"/></div></div>
  if(!t)return <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}><div style={{textAlign:'center'}}><div style={{fontSize:48,marginBottom:12,animation:'float 3s infinite'}}>😕</div><div style={{color:'var(--muted)',marginBottom:4,fontFamily:'var(--fm)',fontSize:11,letterSpacing:2}}>TURNAMEN TIDAK DITEMUKAN</div><div style={{color:'rgba(255,255,255,0.15)',fontFamily:'var(--fm)',fontSize:9,marginBottom:24,wordBreak:'break-all',maxWidth:300}}>ID: {tid}</div><button className="btn btn-ghost" onClick={onBack}>{i.back}</button></div></div>
  const slotsLeft=t.slots-(t.registered||0);const fillPct=Math.round(((t.registered||0)/t.slots)*100);const isFull=slotsLeft<=0
  return <div style={{minHeight:'100vh',background:'var(--bg)'}}>
    <div style={{background:'rgba(10,10,18,0.95)',borderBottom:'1px solid var(--border)',padding:'10px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50,backdropFilter:'blur(10px)',boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
      <div style={{fontFamily:'var(--fh)',fontSize:14,color:'var(--cyan)',letterSpacing:2,fontWeight:900}}>⚔ ARENAGG</div>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <LangSelector lang={lang} setLangFn={l=>{setLangState(l);setLang(l)}}/>
        <button onClick={onBack} style={{background:'none',border:'1px solid var(--border)',borderRadius:4,padding:'4px 10px',color:'var(--muted)',cursor:'pointer',fontSize:10,fontFamily:'var(--fm)'}}>{i.back}</button>
      </div>
    </div>
    <div style={{maxWidth:540,margin:'0 auto',padding:'20px 16px'}}>
      {step==='detail'&&<div className="animate-in">
        <div style={{background:'linear-gradient(135deg,rgba(0,229,255,0.08),rgba(255,107,0,0.06))',border:'1px solid rgba(0,229,255,0.2)',borderRadius:12,padding:'22px 18px',marginBottom:12,textAlign:'center'}}>
          <span className={`tag tag-${t.status}`} style={{marginBottom:10,display:'inline-block'}}>{t.status}</span>
          <div style={{fontFamily:'var(--fh)',fontSize:20,fontWeight:900,marginBottom:5}}>{t.name}</div>
          <div style={{fontSize:12,color:'var(--muted)',marginBottom:10}}>🎮 {t.game} · 📍 {t.city}</div>
          <div style={{fontFamily:'var(--fh)',fontSize:24,color:'var(--yellow)',fontWeight:900}}>{fmtRp(t.prize)}</div>
          <div style={{fontSize:10,color:'var(--muted)',marginTop:2,fontFamily:'var(--fm)'}}>{i.prize_pool}</div>
        </div>
        <div className="g2" style={{marginBottom:11}}>
          {[{icon:'🎫',label:i.entry,value:fmtRp(t.entry)+'/tim'},{icon:'📅',label:i.date,value:t.date},{icon:'⚙',label:i.format,value:t.format},{icon:'👥',label:i.slots_left,value:`${slotsLeft}/${t.slots}`,color:slotsLeft<=3?'var(--red)':'var(--green)'}].map(d=><div key={d.label} className="card" style={{padding:'10px 12px',display:'flex',gap:8,alignItems:'center'}}><span style={{fontSize:18}}>{d.icon}</span><div><div style={{fontSize:9,fontFamily:'var(--fm)',color:'var(--muted)'}}>{d.label}</div><div style={{fontSize:13,fontWeight:600,color:d.color||'var(--text)',marginTop:1}}>{d.value}</div></div></div>)}
        </div>
        <div className="card" style={{marginBottom:11}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,fontSize:11}}><span style={{color:'var(--muted)'}}>{i.slot_filled}</span><span style={{fontFamily:'var(--fm)',color:fillPct>=90?'var(--red)':'var(--cyan)',fontSize:10}}>{t.registered||0}/{t.slots}</span></div>
          <div className="pbar" style={{height:5}}><div className="pfill" style={{width:`${fillPct}%`,background:fillPct>=90?'var(--red)':fillPct>=70?'var(--orange)':'var(--cyan)'}}/></div>
        </div>
        {t.description&&<div className="card" style={{marginBottom:11}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:5}}>{i.about}</div><div style={{fontSize:13,lineHeight:1.7}}>{t.description}</div></div>}
        {teams.length>0&&<div className="card" style={{marginBottom:13}}>
          <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:9}}>{i.reg_teams} ({teams.length})</div>
          {teams.map((tm,idx)=><div key={tm.id} style={{display:'flex',alignItems:'center',gap:9,padding:'6px 0',borderBottom:idx<teams.length-1?'1px solid var(--border)':'none'}}>
            <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,var(--cyan),var(--orange))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'#000',overflow:'hidden',flexShrink:0}}>
              {tm.photo?<img src={tm.photo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt=""/>:<span>{idx+1}</span>}
            </div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{tm.name}</div><div style={{fontSize:10,color:'var(--muted)'}}>👤 {tm.captain}</div></div>
            {tm.paid&&<span style={{fontSize:9,color:'var(--green)',fontFamily:'var(--fm)'}}>✓ LUNAS</span>}
          </div>)}
        </div>}
        {t.status==='closed'
          ?<div style={{background:'rgba(74,74,106,0.1)',border:'1px solid var(--border)',borderRadius:8,padding:20,textAlign:'center',color:'var(--muted)'}}><div style={{fontSize:24,marginBottom:8}}>🔒</div><div style={{fontFamily:'var(--fh)',fontSize:11}}>{i.closed_msg}</div></div>
          :<button className="btn btn-cyan btn-full" style={{fontSize:13,padding:13,opacity:isFull?0.5:1}} onClick={()=>!isFull&&setStep('form')} disabled={isFull}>{isFull?i.full:i.reg_now}</button>}
      </div>}
      {step==='form'&&<div className="animate-in">
        <button onClick={()=>setStep('detail')} style={{background:'none',border:'none',color:'var(--muted)',cursor:'pointer',fontSize:12,marginBottom:14,fontFamily:'var(--fm)'}}>{i.back}</button>
        <div style={{fontFamily:'var(--fh)',fontSize:16,fontWeight:700,marginBottom:4,color:'var(--cyan)'}}>{i.reg_title}</div>
        <div style={{fontSize:12,color:'var(--muted)',marginBottom:14}}>{t.name}</div>
        <div className="card">
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:14}}>
            <div style={{position:'relative',cursor:'pointer'}} onClick={()=>document.getElementById('pub_photo_inp').click()}>
              <div style={{width:72,height:72,borderRadius:'50%',background:'linear-gradient(135deg,var(--cyan),var(--orange))',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',border:'3px solid var(--cyan)',fontSize:26,color:'#000'}}>
                {form.photo?<img src={form.photo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt=""/>:<span>👤</span>}
              </div>
              <div style={{position:'absolute',bottom:1,right:1,width:22,height:22,borderRadius:'50%',background:'var(--cyan)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#000',border:'2px solid var(--bg)'}}>📷</div>
            </div>
            <div style={{fontSize:9,color:'var(--muted)',marginTop:5,fontFamily:'var(--fm)',letterSpacing:1}}>FOTO TIM (opsional)</div>
            <input id="pub_photo_inp" type="file" accept="image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setForm(p=>({...p,photo:ev.target.result}));r.readAsDataURL(f)}}/>
          </div>
          <div style={{marginBottom:11}}><label>{i.team_name}</label><input value={form.name} onChange={set('name')} placeholder="Alpha Squad"/></div>
          <div className="g2" style={{marginBottom:11}}><div><label>{i.captain}</label><input value={form.captain} onChange={set('captain')} placeholder="Nama Kapten"/></div><div><label>{i.contact}</label><input value={form.contact} onChange={set('contact')} placeholder="08xx" type="tel"/></div></div>
          <div style={{marginBottom:14}}><label>{i.members}</label><select value={form.members} onChange={set('members')}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></div>
          <div style={{background:'rgba(255,215,0,0.06)',border:'1px solid rgba(255,215,0,0.2)',borderRadius:6,padding:'10px 12px',marginBottom:14,fontSize:12}}>
            <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--yellow)',marginBottom:6,letterSpacing:1}}>{i.pay_title}</div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{color:'var(--muted)'}}>{i.amount}</span><span style={{fontFamily:'var(--fm)',color:'var(--yellow)',fontWeight:700}}>{fmtRp(t.entry)}</span></div>
            {(()=>{try{const b=JSON.parse(localStorage.getItem('arenagg_bank_info')||'{}');return b.bankName?<div style={{marginTop:7,padding:'8px 10px',background:'rgba(0,229,255,0.06)',borderRadius:5,lineHeight:2,fontSize:12}}><div>🏦 {i.transfer_to} <b>{b.bankName}</b></div><div>💳 {i.acc_no} <b style={{color:'var(--cyan)',fontFamily:'var(--fm)'}}>{b.accNumber}</b></div><div>👤 {i.an} <b>{b.accName}</b></div>{b.waNumber&&<div>📱 {i.confirm_wa} <a href={`https://wa.me/62${b.waNumber.replace(/^0/,'')}`} target="_blank" rel="noreferrer" style={{color:'var(--green)'}}>{b.waNumber}</a></div>}</div>:<div style={{color:'var(--muted)',fontSize:11,marginTop:4}}>{i.contact_org}</div>}catch(e){return null}})()}
          </div>
          <button className="btn btn-cyan btn-full" style={{fontSize:12,padding:12}} onClick={submit} disabled={saving}>{saving?<><Spinner size={13} color="#000"/>{i.registering}</>:i.btn_submit}</button>
        </div>
      </div>}
      {step==='success'&&<div className="animate-in" style={{textAlign:'center',paddingTop:40}}>
        <div style={{fontSize:56,marginBottom:12,animation:'bounce-in 0.6s ease'}}>🎉</div>
        <div style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:900,color:'var(--green)',marginBottom:8}}>{i.success_title}</div>
        <div style={{fontSize:13,color:'var(--muted)',marginBottom:20,lineHeight:1.8}}>{form.name} {i.success_msg} <b style={{color:'var(--text)'}}>{t.name}</b></div>
        <button className="btn btn-ghost" onClick={()=>setStep('detail')}>{i.back_detail}</button>
      </div>}
    </div>
  </div>
}

// SIDEBAR — TANPA pilih bahasa, WITH live indicator, WITH profile photo
function Sidebar({page,setPage,user,onLogout,hasLive,lang,isLight,toggleTheme,tournaments=[]}){
  const i=T[lang]||T.id
  const prof=getProf()
  const name=prof.name||user?.user_metadata?.organizer_name||user?.email?.split('@')[0]||'Organizer'
  const photo=prof.photo||null
  const NAV=[{icon:'⚡'},{icon:'📈'},{icon:'🏆'},{icon:'＋'},{icon:'👥'},{icon:'📊'},{icon:'💰'},{icon:'⚙'}]
  return <div className="sidebar">
    <div style={{padding:'14px 13px 11px',borderBottom:'1px solid var(--border)'}}>
      <div style={{fontFamily:'var(--fh)',fontWeight:900,fontSize:14,color:'var(--cyan)',letterSpacing:2,animation:'glow-pulse 3s infinite'}}>⚔ ARENAGG</div>
      <div style={{fontSize:8,color:'var(--muted)',fontFamily:'var(--fm)',marginTop:2,letterSpacing:2}}>TOURNAMENT PLATFORM</div>
      {hasLive&&<div style={{marginTop:7,display:'flex',alignItems:'center',gap:6,padding:'4px 8px',background:'rgba(255,45,85,0.1)',borderRadius:4,border:'1px solid rgba(255,45,85,0.25)'}}>
        <span style={{width:7,height:7,borderRadius:'50%',background:'var(--red)',animation:'pulse 0.8s infinite',display:'inline-block',flexShrink:0}}/>
        <span style={{fontFamily:'var(--fh)',fontSize:9,color:'var(--red)',letterSpacing:1,fontWeight:700}}>LIVE NOW</span>
      </div>}
    </div>
    <nav style={{flex:1,padding:'8px 7px',overflowY:'auto'}}>
      {NAV_IDS.map((id,idx)=><button key={id} className={`nav-item ${page===id?'active':''}`} onClick={()=>setPage(id)}>
        <span className="nav-icon">{NAV[idx].icon}</span>
        <span>{i.nav[idx]}</span>
        {id==='tournaments'&&(hasLive?<span style={{marginLeft:'auto',width:6,height:6,borderRadius:'50%',background:'var(--red)',animation:'pulse 0.8s infinite',display:'inline-block',flexShrink:0}}/>:<span style={{marginLeft:'auto',fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',background:'rgba(255,255,255,0.05)',padding:'1px 5px',borderRadius:8}}>{tournaments?.length||''}</span>)}
      </button>)}
    </nav>
    <div style={{padding:'10px 13px',borderTop:'1px solid var(--border)'}}>
      <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:9,cursor:'pointer',padding:'5px 7px',borderRadius:6,transition:'var(--trans)',borderRadius:8}} onClick={()=>setPage('settings')} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
        <div style={{width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,var(--cyan),var(--orange))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13,color:'#000',flexShrink:0,overflow:'hidden',border:'2px solid rgba(0,229,255,0.25)'}}>
          {photo?<img src={photo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt=""/>:<span>{name[0].toUpperCase()}</span>}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:11,fontWeight:600,lineHeight:1.2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</div>
          <div style={{fontSize:9,color:'var(--green)',fontFamily:'var(--fm)',marginTop:1}}><span className="live-dot"/>{i.online}</div>
        </div>
        <span style={{fontSize:10,color:'var(--muted)'}}>⚙</span>
      </div>
      <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle dark/light mode">
    <span className="tt-label">{isLight?'☀ LIGHT MODE':'🌙 DARK MODE'}</span>
    <div className={`tt-track${isLight?' on':''}`}><div className="tt-knob"/></div>
  </button>
  <button className="btn btn-dark btn-full btn-sm" onClick={onLogout} style={{fontSize:9}}>{i.logout}</button>
    </div>
  </div>
}

function BottomNav({page,setPage,lang,hasLive}){
  const i=T[lang]||T.id
  const icons=['⚡','📈','🏆','＋','👥','📊','💰','⚙']
  return <nav className="bottom-nav">
    {NAV_IDS.map((id,idx)=><button key={id} className={`bnav-item ${page===id?'active':''}`} onClick={()=>setPage(id)}>
      <span className="bnav-icon">{icons[idx]}{id==='tournaments'&&hasLive&&<span style={{width:4,height:4,borderRadius:'50%',background:'var(--red)',display:'inline-block',marginLeft:1,verticalAlign:'top'}}/>}</span>
      <span>{i.nav[idx].slice(0,5)}</span>
    </button>)}
  </nav>
}

// DASHBOARD ELEGAN & PROFESIONAL
function Dashboard({tournaments,teams,setPage,loading,lang}){
  const i=T[lang]||T.id
  const totalPrize=tournaments.reduce((s,t)=>s+Number(t.prize),0)
  const totalRev=tournaments.reduce((s,t)=>s+(Number(t.entry)*Number(t.registered||0)*0.15),0)
  const totalP=teams.reduce((s,t)=>s+t.members,0)
  const liveT=tournaments.filter(t=>t.status==='live')
  const activeT=tournaments.filter(t=>t.status==='active')
  const prof=getProf()
  const name=prof.name||'Organizer'
  const now=new Date();const h=now.getHours()
  const greeting=h<12?'Selamat Pagi ☀':h<17?'Selamat Siang 🌤':'Selamat Malam 🌙'
  const greetingEn=h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening'
  const totalTeams=teams.length
  const totalPlayers=teams.reduce((s,t)=>s+Number(t.members||0),0)
  if(loading)return <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh'}}><div style={{textAlign:'center'}}><div style={{fontFamily:'var(--fh)',fontSize:14,color:'var(--cyan)',letterSpacing:3,animation:'glow-pulse 2s infinite',marginBottom:16}}>⚔ ARENAGG</div><Spinner size={28} color="var(--cyan)"/><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginTop:12,letterSpacing:2}}>MEMUAT DATA...</div></div></div>
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    {/* GREETING SECTION */}
    <div style={{marginBottom:22,padding:'18px 22px',background:'linear-gradient(135deg,rgba(0,229,255,0.06),rgba(255,107,0,0.04))',borderRadius:12,border:'1px solid rgba(0,229,255,0.12)'}}>
      <div style={{fontFamily:'var(--fm)',fontSize:10,color:'var(--muted)',letterSpacing:2,marginBottom:4}}>{greeting.toUpperCase()}</div>
      <div style={{fontFamily:'var(--fh)',fontSize:20,fontWeight:900,background:'linear-gradient(135deg,var(--text),var(--cyan))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:3}}>{name.toUpperCase()}</div>
      <div style={{color:'var(--muted)',fontSize:11,fontFamily:'var(--fm)',letterSpacing:1}}>{i.dash_sub}</div>
      <div style={{marginTop:8,display:'flex',gap:8,flexWrap:'wrap'}}>
        <span className="metric-chip metric-neutral">📅 {new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</span>
        {liveT.length>0&&<span className="metric-chip metric-down">🔴 {liveT.length} Turnamen LIVE</span>}
        {activeT.length>0&&<span className="metric-chip metric-up">● {activeT.length} Turnamen Aktif</span>}
      </div>
    </div>
    {/* LIVE ALERT CARDS */}
    {liveT.map(lt=><div key={lt.id} style={{background:'linear-gradient(135deg,rgba(255,45,85,0.12),rgba(255,107,0,0.08))',border:'1px solid rgba(255,45,85,0.35)',borderRadius:10,padding:'13px 16px',marginBottom:14,display:'flex',alignItems:'center',gap:12,boxShadow:'0 4px 20px rgba(255,45,85,0.15)'}}>
      <div style={{width:40,height:40,borderRadius:'50%',background:'rgba(255,45,85,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0,border:'1px solid rgba(255,45,85,0.3)'}}>🔴</div>
      <div style={{flex:1}}>
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--red)',letterSpacing:2,fontWeight:900,marginBottom:2}}>⚔ TURNAMEN SEDANG LIVE</div>
        <div style={{fontSize:14,fontWeight:700}}>{lt.name}</div>
        <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>🎮 {lt.game} · 📍 {lt.city} · 🏆 {fmtRp(lt.prize)}</div>
      </div>
      <span className="tag tag-live">🔴 LIVE</span>
    </div>)}
    {/* STAT CARDS 4-column */}
    <div className="g4" style={{marginBottom:18}}>
      {[
        {icon:'🏆',label:i.nav[2],value:tournaments.length,color:'var(--cyan)',accent:'var(--cyan)',trend:tournaments.length>0?`+${tournaments.length}`:'0'},
        {icon:'👥',label:i.nav[4],value:totalP,color:'var(--green)',accent:'var(--green)',trend:teams.length+' tim'},
        {icon:'💰',label:i.nav[6],value:fmtRp(totalPrize),color:'var(--yellow)',accent:'var(--yellow)',trend:'Prize Pool'},
        {icon:'📈',label:i.nav[1],value:fmtRp(totalRev),color:'var(--orange)',accent:'var(--orange)',trend:'Est. 15%'},
      ].map((s,idx)=><div key={idx} className="stat-card" style={{'--accent-color':s.accent,animationDelay:idx*0.08+'s'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
          <div style={{width:38,height:38,borderRadius:8,background:`linear-gradient(135deg,rgba(${s.color==='var(--cyan)'?'0,229,255':s.color==='var(--green)'?'0,255,136':s.color==='var(--yellow)'?'255,215,0':'255,107,0'},0.15),rgba(${s.color==='var(--cyan)'?'0,229,255':s.color==='var(--green)'?'0,255,136':s.color==='var(--yellow)'?'255,215,0':'255,107,0'},0.05))`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{s.icon}</div>
          <span style={{fontSize:9,color:s.color,fontFamily:'var(--fm)',background:`rgba(${s.color==='var(--cyan)'?'0,229,255':s.color==='var(--green)'?'0,255,136':s.color==='var(--yellow)'?'255,215,0':'255,107,0'},0.1)`,padding:'2px 7px',borderRadius:10,border:`1px solid rgba(${s.color==='var(--cyan)'?'0,229,255':s.color==='var(--green)'?'0,255,136':s.color==='var(--yellow)'?'255,215,0':'255,107,0'},0.2)`}}>{s.trend}</span>
        </div>
        <div style={{fontSize:9,fontFamily:'var(--fm)',color:'var(--muted)',letterSpacing:1,textTransform:'uppercase',marginBottom:4}}>{s.label}</div>
        <div style={{fontSize:20,fontFamily:'var(--fh)',fontWeight:900,color:s.color,lineHeight:1}}>{s.value}</div>
      </div>)}
    </div>
    {/* MAIN 2-COL CONTENT */}
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
      <div className="card">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1}}>{i.active_t}</div>
          <span style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)'}}>{activeT.length+liveT.length} aktif</span>
        </div>
        {tournaments.filter(t=>t.status!=='closed').length===0
          ?<div style={{textAlign:'center',padding:'18px 0',color:'var(--muted)'}}><div style={{fontSize:26,marginBottom:7}}>🏆</div><div style={{fontSize:11}}>{i.no_active}</div></div>
          :tournaments.filter(t=>t.status!=='closed').slice(0,5).map(t=><div key={t.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
            <div>
              <div style={{fontWeight:600,fontSize:12,display:'flex',alignItems:'center',gap:6}}>{t.name}{t.status==='live'&&<span style={{width:5,height:5,borderRadius:'50%',background:'var(--red)',display:'inline-block',animation:'pulse 0.8s infinite'}}/>}</div>
              <div style={{fontSize:10,color:'var(--muted)'}}>{t.game}</div>
            </div>
            <span className={`tag tag-${t.status}`}>{t.status}</span>
          </div>)
        }
      </div>
      <div className="card">
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:12}}>{i.revenue_lbl}</div>
        {[{l:i.comm_lbl,v:totalRev*0.7,p:70,c:'var(--cyan)'},{l:'Sponsorship',v:totalRev*0.2,p:20,c:'var(--orange)'},{l:'Premium',v:totalRev*0.1,p:10,c:'var(--green)'}].map(r=><div key={r.l} style={{marginBottom:11}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,fontSize:11}}>
            <span style={{color:'var(--muted)',fontFamily:'var(--fm)',fontSize:9}}>{r.l}</span>
            <span style={{fontFamily:'var(--fm)',fontSize:10}}>{fmtRp(r.v)}</span>
          </div>
          <div className="pbar" style={{height:4}}><div className="pfill" style={{width:`${r.p}%`,background:r.c}}/></div>
        </div>)}
      </div>
    </div>
    <div className="card">
      <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:12}}>{i.quick}</div>
      <div style={{display:'flex',gap:9,flexWrap:'wrap'}}>
        <button className="btn btn-cyan" onClick={()=>setPage('create')}>{i.btn_create}</button>
        <button className="btn btn-orange" onClick={()=>setPage('revenue')}>{i.btn_comm}</button>
        <button className="btn btn-ghost" onClick={()=>setPage('teams')}>{i.btn_part}</button>
        <button className="btn btn-dark" onClick={()=>setPage('tournaments')}>🏆 {i.tourn_title}</button>
      </div>
    </div>
  </div>
}

function TournamentList({tournaments,updateT,deleteT,setPage,setEditT,toast,onPreview,lang}){
  const i=T[lang]||T.id
  const[filter,setF]=useState('all');const[shareT,setShareT]=useState(null);const[search,setSearch]=useState('')
  const filtered=(filter==='all'?tournaments:tournaments.filter(t=>t.status===filter)).filter(t=>!search||t.name.toLowerCase().includes(search.toLowerCase())||t.game.toLowerCase().includes(search.toLowerCase()))
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:10}}>
      <div><h1 style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:700}}>{i.tourn_title}</h1><p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)'}}>{filtered.length}/{tournaments.length} TURNAMEN</p></div>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Cari nama / game..." style={{width:180,padding:'7px 12px',fontSize:12}}/>
        <button className="btn btn-cyan" onClick={()=>{setEditT(null);setPage('create')}}>{i.btn_create_t}</button>
      </div>
    </div>
    <div style={{display:'flex',gap:5,marginBottom:13,flexWrap:'wrap'}}>
      {['all','active','live','closed','pending'].map(s=><button key={s} onClick={()=>setF(s)} style={{padding:'4px 11px',borderRadius:4,border:'1px solid',cursor:'pointer',fontFamily:'var(--fm)',fontSize:9,textTransform:'uppercase',letterSpacing:1,background:filter===s?'var(--cyan)':'transparent',color:filter===s?'#000':'var(--muted)',borderColor:filter===s?'var(--cyan)':'var(--border)',transition:'all 0.15s'}}>{s}</button>)}
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:9}}>
      {filtered.map(t=>{const pct=Math.round(((t.registered||0)/t.slots)*100);return <div key={t.id} className="card" style={{padding:0,overflow:'hidden',boxShadow:t.status==='live'?'0 0 20px rgba(255,45,85,0.2)':'none',borderColor:t.status==='live'?'rgba(255,45,85,0.4)':'var(--border)',transition:'all 0.2s'}}>
        <div style={{display:'flex',alignItems:'stretch'}}>
          <div style={{width:3,background:t.status==='live'?'var(--red)':t.status==='active'?'var(--cyan)':t.status==='pending'?'var(--yellow)':'var(--muted)',flexShrink:0,borderRadius:'8px 0 0 8px'}}/>
          <div style={{flex:1,padding:'13px 15px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:7}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:3,flexWrap:'wrap'}}>
                  <span style={{fontFamily:'var(--fh)',fontWeight:700,fontSize:13}}>{t.name}</span>
                  <span className={`tag tag-${t.status}`}>{t.status==='live'?'🔴 LIVE':t.status}</span>
                </div>
                <div style={{fontSize:10,color:'var(--muted)',display:'flex',gap:8,flexWrap:'wrap',fontFamily:'var(--fm)'}}>
                  <span>🎮 {t.game}</span><span>📍 {t.city}</span><span>📅 {t.date}</span>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:'var(--fh)',fontSize:14,color:'var(--yellow)',fontWeight:700}}>{fmtRp(t.prize)}</div>
                <div style={{fontSize:10,color:'var(--muted)',fontFamily:'var(--fm)',marginTop:1}}>Entry {fmtRp(t.entry)}/tim</div>
              </div>
            </div>
            <div style={{marginTop:9}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:9,color:'var(--muted)',marginBottom:3,fontFamily:'var(--fm)'}}>
                <span>{i.slots}</span>
                <span style={{color:pct>=90?'var(--red)':'inherit'}}>{t.registered||0}/{t.slots} ({pct}%)</span>
              </div>
              <div className="pbar" style={{marginBottom:9,height:4}}>
                <div className="pfill" style={{width:`${pct}%`,background:pct>=90?'var(--red)':pct>=60?'var(--orange)':'var(--cyan)'}}/>
              </div>
              <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                <button className="btn btn-ghost btn-sm" onClick={()=>setShareT(t)}>{i.share}</button>
                {t.status==='pending'&&<button className="btn btn-green btn-sm" onClick={()=>updateT(t.id,{status:'active'})}>{i.activate}</button>}
                {t.status==='active'&&<button className="btn btn-danger btn-sm" onClick={()=>updateT(t.id,{status:'live'})}>{i.live_btn}</button>}
                {t.status==='live'&&<button className="btn btn-dark btn-sm" onClick={()=>updateT(t.id,{status:'closed'})}>{i.close_btn}</button>}
                <button className="btn btn-ghost btn-sm" onClick={()=>{setEditT(t);setPage('create')}}>{i.edit}</button>
                <button onClick={()=>deleteT(t.id)} style={{background:'rgba(255,45,85,0.08)',border:'1px solid rgba(255,45,85,0.2)',borderRadius:4,padding:'4px 9px',color:'var(--red)',cursor:'pointer',fontSize:9,fontFamily:'var(--fm)'}}>🗑</button>
              </div>
            </div>
          </div>
        </div>
      </div>})}
      {filtered.length===0&&<div className="card" style={{textAlign:'center',padding:'36px 20px',color:'var(--muted)'}}><div style={{fontSize:30,marginBottom:9}}>📭</div><div style={{fontFamily:'var(--fh)',fontSize:10,letterSpacing:1}}>{i.no_tourn}</div></div>}
    </div>
    {shareT&&<ShareModal t={shareT} onClose={()=>setShareT(null)} toast={toast} onPreview={onPreview}/>}
  </div>
}

function CreateTournament({addT,updateT,editData,setEditT,toast,lang}){
  const i=T[lang]||T.id
  const empty={name:'',game:GAMES[0],prize:'',entry:'',slots:'16',format:FORMATS[0],date:'',city:'',description:''}
  const[form,setForm]=useState(editData?{...editData,description:editData.description||''}:empty);const[saving,setSaving]=useState(false)
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}))
  useEffect(()=>{setForm(editData?{...editData,description:editData.description||''}:empty)},[editData?.id])
  const submit=async()=>{if(!form.name||!form.prize||!form.entry||!form.date||!form.city){toast('Isi semua field wajib!','error');return;}setSaving(true);if(editData)await updateT(editData.id,{name:form.name,game:form.game,prize:Number(form.prize),entry:Number(form.entry),slots:Number(form.slots),format:form.format,date:form.date,city:form.city,description:form.description});else await addT({name:form.name,game:form.game,prize:Number(form.prize),entry:Number(form.entry),slots:Number(form.slots),format:form.format,date:form.date,city:form.city,description:form.description,registered:0,status:'pending'});setForm(empty);setEditT(null);setSaving(false)}
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:640}}>
    <div style={{marginBottom:16}}><h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700,color:'var(--cyan)'}}>{editData?i.edit_title:i.create_title}</h1></div>
    <div className="card">
      <div style={{marginBottom:12}}><label>{i.tourn_name}</label><input value={form.name} onChange={set('name')} placeholder="ML Grand Prix 2026"/></div>
      <div className="g2" style={{marginBottom:12}}><div><label>{i.game}</label><select value={form.game} onChange={set('game')}>{GAMES.map(g=><option key={g}>{g}</option>)}</select></div><div><label>{i.format}</label><select value={form.format} onChange={set('format')}>{FORMATS.map(f=><option key={f}>{f}</option>)}</select></div></div>
      <div className="g2" style={{marginBottom:12}}><div><label>{i.city}</label><input value={form.city} onChange={set('city')} placeholder="Batam"/></div><div><label>{i.date}</label><input type="date" value={form.date} onChange={set('date')}/></div></div>
      <hr className="div"/>
      <div className="g3" style={{marginBottom:12}}><div><label>{i.prize}</label><input type="number" value={form.prize} onChange={set('prize')} placeholder="2000000"/></div><div><label>{i.entry}</label><input type="number" value={form.entry} onChange={set('entry')} placeholder="25000"/></div><div><label>{i.slots}</label><select value={form.slots} onChange={set('slots')}>{[4,8,16,32,64].map(n=><option key={n}>{n}</option>)}</select></div></div>
      {form.prize&&form.entry&&<div style={{background:'rgba(0,229,255,0.04)',borderRadius:5,padding:'7px 11px',marginBottom:12,fontSize:11,border:'1px solid rgba(0,229,255,0.1)',fontFamily:'var(--fm)'}}><span>Total: <b style={{color:'var(--cyan)'}}>{fmtRp(Number(form.entry)*Number(form.slots))}</b></span> · <span>{i.comm_lbl}: <b style={{color:'var(--orange)'}}>{fmtRp(Number(form.entry)*Number(form.slots)*0.15)}</b></span></div>}
      <hr className="div"/>
      <div style={{marginBottom:16}}><label>{i.desc}</label><textarea rows={3} value={form.description} onChange={set('description')} placeholder="Deskripsi turnamen..." style={{resize:'vertical'}}/></div>
      <div style={{display:'flex',gap:8}}><button className="btn btn-cyan" onClick={submit} disabled={saving}>{saving?<><Spinner size={13} color="#000"/>...</>:editData?i.btn_save:i.btn_create2}</button>{editData&&<button className="btn btn-ghost" onClick={()=>{setEditT(null);setForm(empty)}}>{i.btn_cancel}</button>}</div>
    </div>
  </div>
}

function TeamsView({teams,tournaments,addTeam,updateTeam,deleteTeam,lang}){
  const i=T[lang]||T.id
  const[selT,setSelT]=useState('all');const[showAdd,setShowAdd]=useState(false);const[form,setForm]=useState({name:'',captain:'',contact:'',members:'5',paid:false,tournament_id:tournaments[0]?.id||''});const[saving,setSaving]=useState(false)
  const filtered=selT==='all'?teams:teams.filter(t=>t.tournament_id===selT)
  const submit=async()=>{if(!form.name||!form.captain||!form.tournament_id)return;setSaving(true);await addTeam({name:form.name,captain:form.captain,contact:form.contact,members:Number(form.members),paid:form.paid,tournament_id:form.tournament_id});setShowAdd(false);setSaving(false);setForm({name:'',captain:'',contact:'',members:'5',paid:false,tournament_id:tournaments[0]?.id||''})}
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:10}}>
      <div><h1 style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:700}}>{i.teams_title}</h1><p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)'}}>{filtered.length} TIM · {filtered.filter(t=>t.paid).length} LUNAS</p></div>
      <button className="btn btn-cyan" onClick={()=>setShowAdd(!showAdd)}>{i.btn_reg_team}</button>
    </div>
    <div style={{display:'flex',gap:5,marginBottom:12,flexWrap:'wrap'}}>
      <button onClick={()=>setSelT('all')} style={{padding:'4px 11px',borderRadius:4,border:'1px solid',cursor:'pointer',fontFamily:'var(--fm)',fontSize:9,textTransform:'uppercase',background:selT==='all'?'var(--cyan)':'transparent',color:selT==='all'?'#000':'var(--muted)',borderColor:selT==='all'?'var(--cyan)':'var(--border)'}}>{i.all}</button>
      {tournaments.map(t=><button key={t.id} onClick={()=>setSelT(t.id)} style={{padding:'4px 11px',borderRadius:4,border:'1px solid',cursor:'pointer',fontFamily:'var(--fm)',fontSize:9,textTransform:'uppercase',background:selT===t.id?'var(--cyan)':'transparent',color:selT===t.id?'#000':'var(--muted)',borderColor:selT===t.id?'var(--cyan)':'var(--border)'}}>{t.name.split(' ').slice(0,2).join(' ')}</button>)}
    </div>
    {showAdd&&<div className="card" style={{marginBottom:12,borderColor:'rgba(0,229,255,0.3)'}}>
      <div className="g2" style={{marginBottom:10}}><div><label>{i.team_name}</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Alpha Squad"/></div><div><label>{i.captain}</label><input value={form.captain} onChange={e=>setForm(f=>({...f,captain:e.target.value}))} placeholder="Nama Kapten"/></div></div>
      <div className="g3" style={{marginBottom:10}}><div><label>{i.contact}</label><input value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} placeholder="08xx"/></div><div><label>{i.members}</label><select value={form.members} onChange={e=>setForm(f=>({...f,members:e.target.value}))}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></div><div><label>{i.tournament}</label><select value={form.tournament_id} onChange={e=>setForm(f=>({...f,tournament_id:e.target.value}))}>{tournaments.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div></div>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}><input type="checkbox" checked={form.paid} onChange={e=>setForm(f=>({...f,paid:e.target.checked}))} style={{width:14,height:14,accentColor:'var(--cyan)'}}/><span style={{fontSize:13}}>{i.paid_lbl}</span></div>
      <div style={{display:'flex',gap:7}}><button className="btn btn-cyan" onClick={submit} disabled={saving}>{saving?<Spinner size={13} color="#000"/>:i.btn_reg2}</button><button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>{i.btn_cancel}</button></div>
    </div>}
    <div className="card" style={{padding:0,overflow:'hidden'}}>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:480}}>
          <thead><tr style={{borderBottom:'1px solid var(--border)'}}>{[i.team_name,i.captain,i.contact,i.members,i.tournament,'✓','⋯'].map(h=><th key={h} style={{padding:'9px 12px',textAlign:'left',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,textTransform:'uppercase',fontWeight:400}}>{h}</th>)}</tr></thead>
          <tbody>{filtered.map((t,idx)=>{const tr=tournaments.find(x=>x.id===t.tournament_id);return <tr key={t.id} style={{borderBottom:'1px solid var(--border)',background:idx%2===0?'transparent':'rgba(255,255,255,0.01)'}}><td style={{padding:'9px 12px',fontWeight:600,fontSize:13}}>{t.name}</td><td style={{padding:'9px 12px',fontSize:12,color:'var(--muted)'}}>{t.captain}</td><td style={{padding:'9px 12px',fontFamily:'var(--fm)',fontSize:10,color:'var(--muted)'}}>{t.contact||'-'}</td><td style={{padding:'9px 12px',textAlign:'center',fontFamily:'var(--fm)',fontSize:11}}>{t.members}</td><td style={{padding:'9px 12px',fontSize:11,color:'var(--cyan)',fontFamily:'var(--fm)'}}>{tr?.name||'-'}</td><td style={{padding:'9px 12px'}}><button onClick={()=>updateTeam(t.id,{paid:!t.paid})} style={{background:'none',border:'none',cursor:'pointer',fontSize:14}}>{t.paid?'✅':'⬜'}</button></td><td style={{padding:'9px 12px'}}><button onClick={()=>deleteTeam(t.id,t.tournament_id)} style={{background:'rgba(255,45,85,0.08)',border:'1px solid rgba(255,45,85,0.2)',borderRadius:3,padding:'3px 8px',color:'var(--red)',cursor:'pointer',fontSize:10}}>✕</button></td></tr>})}</tbody>
        </table>
        {filtered.length===0&&<div style={{textAlign:'center',padding:24,color:'var(--muted)',fontSize:12}}>{i.no_teams}</div>}
      </div>
    </div>
  </div>
}

function Finance({tournaments,teams,lang}){
  const i=T[lang]||T.id
  const rows=tournaments.map(t=>{const p=teams.filter(x=>x.tournament_id===t.id&&x.paid).length;const total=teams.filter(x=>x.tournament_id===t.id).length;const g=p*Number(t.entry);return{...t,paidCount:p,totalTeams:total,gross:g,commission:g*0.15}})
  const tG=rows.reduce((s,r)=>s+r.gross,0),tC=rows.reduce((s,r)=>s+r.commission,0)
  const tPaid=rows.reduce((s,r)=>s+r.paidCount,0),tTeams=rows.reduce((s,r)=>s+r.totalTeams,0)
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{marginBottom:20}}>
      <h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700}}>{i.finance_title}</h1>
      <p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)'}}>LAPORAN KEUANGAN TURNAMEN</p>
    </div>
    <div className="g4" style={{marginBottom:20}}>
      {[
        {icon:'💰',label:'Total Entry',value:fmtRp(tG),color:'var(--cyan)'},
        {icon:'📈',label:'Komisi 15%',value:fmtRp(tC),color:'var(--green)'},
        {icon:'✓',label:'Tim Lunas',value:tPaid+' / '+tTeams,color:'var(--yellow)'},
        {icon:'🏆',label:'Turnamen',value:rows.length,color:'var(--orange)'},
      ].map((s,idx)=><div key={idx} className="stat-card" style={{'--accent-color':s.color}}>
        <div style={{fontSize:22,marginBottom:8}}>{s.icon}</div>
        <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1}}>{s.label}</div>
        <div style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:900,color:s.color,marginTop:4}}>{s.value}</div>
      </div>)}
    </div>
    <div className="card">
      <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:14}}>DETAIL PER TURNAMEN</div>
      {rows.length===0?<div style={{textAlign:'center',padding:'30px',color:'var(--muted)'}}><div style={{fontSize:28,marginBottom:8}}>💰</div><div style={{fontFamily:'var(--fm)',fontSize:10,letterSpacing:2}}>BELUM ADA DATA</div></div>
      :rows.map((r,idx)=>{const payPct=r.totalTeams>0?Math.round(r.paidCount/r.totalTeams*100):0;return <div key={r.id} style={{padding:'14px 0',borderBottom:idx<rows.length-1?'1px solid var(--border)':'none'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
          <div>
            <div style={{fontWeight:700,fontSize:14}}>{r.name}</div>
            <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>🎮 {r.game} · 📍 {r.city}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:'var(--fh)',fontSize:13,color:'var(--cyan)'}}>{fmtRp(r.commission)}</div>
            <div style={{fontSize:9,color:'var(--muted)',fontFamily:'var(--fm)'}}>KOMISI</div>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,marginBottom:8}}>
          <div><div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)'}}>ENTRY FEE</div><div style={{fontSize:12,fontWeight:600}}>{fmtRp(r.entry)}/tim</div></div>
          <div><div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)'}}>TIM LUNAS</div><div style={{fontSize:12,fontWeight:600,color:r.paidCount>0?'var(--green)':'var(--muted)'}}>{r.paidCount}/{r.totalTeams}</div></div>
          <div><div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)'}}>TOTAL MASUK</div><div style={{fontSize:12,fontWeight:600,color:'var(--yellow)'}}>{fmtRp(r.gross)}</div></div>
        </div>
        <div className="pbar"><div className="pfill" style={{width:payPct+'%',background:payPct>=80?'var(--green)':payPct>=50?'var(--cyan)':'var(--orange)'}}/></div>
        <div style={{fontSize:9,fontFamily:'var(--fm)',color:'var(--muted)',marginTop:4,textAlign:'right'}}>{payPct}% LUNAS</div>
      </div>})}
    </div>
  </div>
}

function RevenuePage({tournaments,teams,toast,lang}){
  const i=T[lang]||T.id
  const[showWd,setShowWd]=useState(false);const[wdAmt,setWdAmt]=useState('');const[wdH,setWdH]=useState([{id:'w1',date:'2026-05-28',amount:450000,status:'cair',method:'BCA 1234xxxx'}])
  const rows=tournaments.map(t=>{const p=teams.filter(x=>x.tournament_id===t.id&&x.paid).length;const g=p*Number(t.entry);return{...t,comm:g*0.15,sp:t.status==='closed'?Number(t.prize)*0.08:0,pr:t.status!=='pending'?50000:0}})
  const tC=rows.reduce((s,r)=>s+r.comm,0),grand=rows.reduce((s,r)=>s+r.comm+r.sp+r.pr,0),totalWd=wdH.reduce((s,w)=>s+w.amount,0),saldo=grand-totalWd
  const doWd=()=>{const a=Number(wdAmt);if(!a||a<10000){toast('Min Rp10.000','error');return;}if(a>saldo){toast('Saldo tidak cukup!','error');return;}setWdH(p=>[{id:uid(),date:new Date().toISOString().slice(0,10),amount:a,status:'proses',method:'BCA'},...p]);toast(`${fmtRp(a)} sedang diproses ✓`,'success');setWdAmt('');setShowWd(false)}
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18,flexWrap:'wrap',gap:11}}>
      <div><h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700,color:'var(--cyan)'}}>{i.rev_title}</h1><p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)',letterSpacing:1}}>{i.rev_sub}</p></div>
      <button className="btn btn-orange" onClick={()=>setShowWd(true)}>{i.withdraw_btn}</button>
    </div>
    <div style={{background:'linear-gradient(135deg,rgba(0,229,255,0.08),rgba(255,107,0,0.05))',border:'1px solid rgba(0,229,255,0.2)',borderRadius:10,padding:20,marginBottom:16,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:10,right:12,fontSize:9,fontFamily:'var(--fm)',color:'var(--cyan)',letterSpacing:1,display:'flex',alignItems:'center',gap:4}}><span className="live-dot"/>REALTIME</div>
      <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:2,marginBottom:5}}>{i.saldo}</div>
      <div style={{fontFamily:'var(--fh)',fontSize:26,fontWeight:900,color:'var(--cyan)',marginBottom:3}}>{fmtRp(saldo)}</div>
      <div style={{fontSize:11,color:'var(--muted)',fontFamily:'var(--fm)'}}>{i.income} <span style={{color:'var(--green)'}}>{fmtRp(grand)}</span> · {i.withdrawn} <span style={{color:'var(--orange)'}}>{fmtRp(totalWd)}</span></div>
    </div>
    <div className="g4" style={{marginBottom:16}}>
      <div className="stat-card" style={{'--accent-color':'var(--cyan)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:5}}>🎫 {i.comm_lbl}</div><div style={{fontFamily:'var(--fh)',fontSize:17,color:'var(--cyan)',fontWeight:900}}>{fmtRp(tC)}</div></div>
      <div className="stat-card" style={{'--accent-color':'var(--orange)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:5}}>🏅 Sponsorship</div><div style={{fontFamily:'var(--fh)',fontSize:17,color:'var(--orange)',fontWeight:900}}>{fmtRp(rows.reduce((s,r)=>s+r.sp,0))}</div></div>
      <div className="stat-card" style={{'--accent-color':'var(--green)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:5}}>⭐ Premium</div><div style={{fontFamily:'var(--fh)',fontSize:17,color:'var(--green)',fontWeight:900}}>{fmtRp(rows.reduce((s,r)=>s+r.pr,0))}</div></div>
      <div className="stat-card" style={{'--accent-color':'var(--yellow)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:5}}>📊 {i.tourn_title}</div><div style={{fontFamily:'var(--fh)',fontSize:17,color:'var(--yellow)',fontWeight:900}}>{tournaments.length}</div></div>
    </div>
    <div className="card" style={{marginBottom:14}}>
      <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:12}}>{i.comm_per}</div>
      {rows.length===0&&<div style={{color:'var(--muted)',fontSize:12,textAlign:'center',padding:'18px 0'}}>{i.no_tourn_yet}</div>}
      {[...rows].sort((a,b)=>(b.comm+b.sp+b.pr)-(a.comm+a.sp+a.pr)).map((r,idx)=>{const total=r.comm+r.sp+r.pr;const mx=rows.reduce((m,x)=>Math.max(m,x.comm+x.sp+x.pr),1);return <div key={r.id} style={{marginBottom:11}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,flexWrap:'wrap',gap:3}}>
          <div style={{display:'flex',gap:7,alignItems:'center'}}><span style={{fontFamily:'var(--fm)',fontSize:9,color:idx===0?'var(--yellow)':'var(--muted)',width:14}}>#{idx+1}</span><div style={{fontSize:13,fontWeight:600}}>{r.name}</div></div>
          <div style={{fontFamily:'var(--fm)',fontSize:11,color:'var(--cyan)'}}>{fmtRp(total)}</div>
        </div>
        <div className="pbar"><div className="pfill" style={{width:`${(total/mx)*100}%`,background:idx===0?'var(--yellow)':'var(--cyan)'}}/></div>
      </div>})}
    </div>
    {showWd&&<div className="overlay" onClick={e=>{if(e.target===e.currentTarget)setShowWd(false)}}>
      <div className="modal" style={{maxWidth:360}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><div style={{fontFamily:'var(--fh)',fontSize:11,color:'var(--orange)',letterSpacing:1}}>{i.withdraw_title}</div><button onClick={()=>setShowWd(false)} style={{background:'none',border:'none',color:'var(--muted)',cursor:'pointer',fontSize:20}}>×</button></div>
        <div style={{background:'rgba(0,229,255,0.06)',border:'1px solid rgba(0,229,255,0.15)',borderRadius:6,padding:'11px 13px',marginBottom:13}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:3,letterSpacing:1}}>{i.saldo_lbl}</div><div style={{fontFamily:'var(--fh)',fontSize:19,color:'var(--cyan)',fontWeight:700}}>{fmtRp(saldo)}</div></div>
        <div style={{marginBottom:11}}><label>{i.amount_lbl}</label><input type="number" value={wdAmt} onChange={e=>setWdAmt(e.target.value)} placeholder="Min Rp 10.000"/></div>
        <div style={{marginBottom:16}}><label>{i.acc_lbl}</label><input value="BCA 1234xxxx" readOnly style={{color:'var(--muted)'}}/></div>
        <div style={{display:'flex',gap:8}}><button className="btn btn-orange btn-full" onClick={doWd}>{i.btn_wd}</button><button className="btn btn-ghost" onClick={()=>setShowWd(false)}>{i.btn_cancel}</button></div>
      </div>
    </div>}
  </div>
}

function BracketView({tournaments,teams,lang}){
  const i=T[lang]||T.id
  const[selT,setSelT]=useState(tournaments[0]?.id||'')
  const[winMap,setWinMap]=useState({})
  const t=tournaments.find(x=>x.id===selT)
  const tTeams=teams.filter(x=>x.tournament_id===selT)
  const pairs=[]
  for(let k=0;k<Math.min(tTeams.length,16);k+=2)pairs.push({id:k,a:tTeams[k],b:tTeams[k+1]})
  const setWin=(pairId,teamId)=>setWinMap(m=>({...m,[pairId]:teamId}))
  const winners=pairs.map(p=>p.a&&p.b?winMap[p.id]||null:p.a?.id||null).filter(Boolean)
  const sf_pairs=[];for(let k=0;k<Math.min(winners.length,4);k+=2)sf_pairs.push({id:'sf'+k,a:tTeams.find(x=>x.id===winners[k]),b:tTeams.find(x=>x.id===winners[k+1])})
  const finalW=winMap['sf0'];const finalTeam=tTeams.find(x=>x.id===finalW)
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:10}}>
      <div>
        <h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700}}>📊 {i.nav[5]}</h1>
        <p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)'}}>{tTeams.length} TIM TERDAFTAR</p>
      </div>
      {finalTeam&&<div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 16px',background:'linear-gradient(135deg,rgba(255,215,0,0.12),rgba(255,107,0,0.08))',border:'1px solid rgba(255,215,0,0.3)',borderRadius:8}}>
        <span style={{fontSize:20}}>🏆</span>
        <div><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--yellow)',letterSpacing:1}}>JUARA</div><div style={{fontFamily:'var(--fh)',fontSize:13,fontWeight:700}}>{finalTeam.name}</div></div>
      </div>}
    </div>
    <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
      {tournaments.map(x=><button key={x.id} onClick={()=>{setSelT(x.id);setWinMap({})}} style={{padding:'5px 13px',borderRadius:6,cursor:'pointer',fontFamily:'var(--fh)',fontSize:9,border:'1px solid',letterSpacing:1,transition:'var(--trans)',background:selT===x.id?'var(--cyan)':'transparent',color:selT===x.id?'#000':'var(--muted)',borderColor:selT===x.id?'var(--cyan)':'var(--border)'}}>{x.name}</button>)}
    </div>
    {!t?<div className="card" style={{textAlign:'center',padding:'40px 20px',color:'var(--muted)'}}><div style={{fontSize:32,marginBottom:8}}>📊</div><div style={{fontFamily:'var(--fm)',fontSize:10,letterSpacing:2}}>PILIH TURNAMEN</div></div>
    :<div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr auto 1fr',gap:0,alignItems:'flex-start',overflowX:'auto',paddingBottom:16}}>
      {/* ROUND 1 */}
      <div>
        <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:2,marginBottom:12,textAlign:'center',padding:'4px 0',borderBottom:'1px solid var(--border)'}}>BABAK 1</div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {pairs.length===0?<div style={{color:'var(--muted)',fontSize:11,textAlign:'center',padding:16}}>Belum ada tim</div>
          :pairs.map((p,idx)=><div key={p.id} style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:8,overflow:'hidden',transition:'var(--trans)'}}>
            {[p.a,p.b].map((team,ti)=><div key={ti} onClick={()=>team&&p.b&&setWin(p.id,team?.id)} style={{padding:'8px 12px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:team&&p.b?'pointer':'default',borderBottom:ti===0?'1px solid var(--border)':'none',background:winMap[p.id]===team?.id?'rgba(0,255,136,0.08)':winMap[p.id]&&winMap[p.id]!==team?.id?'rgba(74,74,106,0.06)':'transparent',transition:'background 0.2s'}}>
              <span style={{fontSize:12,fontWeight:600,color:winMap[p.id]===team?.id?'var(--green)':winMap[p.id]&&winMap[p.id]!==team?.id?'var(--muted)':'var(--text)'}}>{team?team.name:<span style={{color:'var(--muted)',fontStyle:'italic'}}>BYE</span>}</span>
              {winMap[p.id]===team?.id&&<span style={{fontSize:10,color:'var(--green)'}}>✓</span>}
            </div>)}
          </div>)}
        </div>
      </div>
      {/* CONNECTOR 1→SF */}
      <div style={{display:'flex',alignItems:'center',padding:'0 8px',marginTop:32}}><div style={{width:24,height:1,background:'var(--border)'}}/></div>
      {/* SEMIFINAL */}
      <div>
        <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--orange)',letterSpacing:2,marginBottom:12,textAlign:'center',padding:'4px 0',borderBottom:'1px solid var(--border)'}}>SEMIFINAL</div>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:24}}>
          {sf_pairs.length===0?<div style={{color:'var(--muted)',fontSize:11,textAlign:'center',padding:16}}>Menunggu hasil R1</div>
          :sf_pairs.map((p,idx)=><div key={p.id} style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:8,overflow:'hidden'}}>
            {[p.a,p.b].map((team,ti)=><div key={ti} onClick={()=>team&&p.b&&setWin(p.id,team?.id)} style={{padding:'8px 12px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:team&&p.b?'pointer':'default',borderBottom:ti===0?'1px solid var(--border)':'none',background:winMap[p.id]===team?.id?'rgba(0,255,136,0.08)':'transparent',transition:'background 0.2s'}}>
              <span style={{fontSize:12,fontWeight:600,color:winMap[p.id]===team?.id?'var(--green)':'var(--text)'}}>{team?team.name:<span style={{color:'var(--muted)',fontStyle:'italic'}}>TBD</span>}</span>
              {winMap[p.id]===team?.id&&<span style={{fontSize:10,color:'var(--green)'}}>✓</span>}
            </div>)}
          </div>)}
        </div>
      </div>
      {/* CONNECTOR SF→F */}
      <div style={{display:'flex',alignItems:'center',padding:'0 8px',marginTop:32}}><div style={{width:24,height:1,background:'var(--border)'}}/></div>
      {/* FINAL */}
      <div>
        <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--yellow)',letterSpacing:2,marginBottom:12,textAlign:'center',padding:'4px 0',borderBottom:'1px solid rgba(255,215,0,0.3)'}}>🏆 FINAL</div>
        <div style={{marginTop:60}}>
          <div style={{background:finalW?'linear-gradient(135deg,rgba(255,215,0,0.1),rgba(255,107,0,0.08))':'var(--panel)',border:`1px solid ${finalW?'rgba(255,215,0,0.4)':'var(--border)'}`,borderRadius:8,overflow:'hidden',transition:'all 0.4s'}}>
            {[sf_pairs[0]?.a,sf_pairs[0]?.b].map((team,ti)=><div key={ti} onClick={()=>team&&sf_pairs[0]?.b&&setWin('sf0',team?.id)} style={{padding:'10px 14px',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:team&&sf_pairs[0]?.b?'pointer':'default',borderBottom:ti===0?'1px solid var(--border)':'none',background:winMap['sf0']===team?.id?'rgba(255,215,0,0.08)':'transparent',transition:'background 0.2s'}}>
              <span style={{fontSize:13,fontWeight:700,color:winMap['sf0']===team?.id?'var(--yellow)':'var(--text)'}}>{team?team.name:<span style={{color:'var(--muted)',fontStyle:'italic'}}>TBD</span>}</span>
              {winMap['sf0']===team?.id&&<span style={{fontSize:14}}>🏆</span>}
            </div>)}
          </div>
          {finalTeam&&<div style={{textAlign:'center',marginTop:10,fontFamily:'var(--fh)',fontSize:10,color:'var(--yellow)',letterSpacing:1,animation:'glow-pulse 3s infinite'}}>⚔ JUARA: {finalTeam.name}</div>}
        </div>
      </div>
    </div>}
    <div style={{marginTop:16,padding:'10px 14px',background:'rgba(0,229,255,0.04)',borderRadius:7,border:'1px solid rgba(0,229,255,0.1)',fontSize:11,color:'var(--muted)',fontFamily:'var(--fm)'}}>💡 Klik nama tim untuk menentukan pemenang</div>
  </div>
}

function Finance({tournaments,teams,lang}){
  const i=T[lang]||T.id
  const rows=tournaments.map(t=>{const p=teams.filter(x=>x.tournament_id===t.id&&x.paid).length;const g=p*Number(t.entry);return{...t,paid:p,gross:g,commission:g*0.15}})
  const tG=rows.reduce((s,r)=>s+r.gross,0),tC=rows.reduce((s,r)=>s+r.commission,0)
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{marginBottom:16}}><h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700}}>{i.finance_title}</h1></div>
    <div className="g3" style={{marginBottom:16}}>
      <div className="stat-card" style={{'--accent-color':'var(--cyan)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:5}}>💵 {i.total_entry}</div><div style={{fontFamily:'var(--fh)',fontSize:18,color:'var(--cyan)',fontWeight:900}}>{fmtRp(tG)}</div></div>
      <div className="stat-card" style={{'--accent-color':'var(--orange)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:5}}>🏦 {i.comm_lbl}</div><div style={{fontFamily:'var(--fh)',fontSize:18,color:'var(--orange)',fontWeight:900}}>{fmtRp(tC)}</div></div>
      <div className="stat-card" style={{'--accent-color':'var(--green)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:5}}>🎯 {i.done}</div><div style={{fontFamily:'var(--fh)',fontSize:18,color:'var(--green)',fontWeight:900}}>{tournaments.filter(t=>t.status==='closed').length}</div></div>
    </div>
    <div className="card" style={{padding:0,overflow:'hidden'}}>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:460}}>
          <thead><tr style={{borderBottom:'1px solid var(--border)'}}>{[i.tourn_title,i.teams_title,i.total_entry,i.comm_lbl,'Status'].map(h=><th key={h} style={{padding:'9px 12px',textAlign:'left',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,textTransform:'uppercase',fontWeight:400}}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r,idx)=><tr key={r.id} style={{borderBottom:'1px solid var(--border)',background:idx%2===0?'transparent':'rgba(255,255,255,0.01)'}}><td style={{padding:'9px 12px',fontWeight:600,fontSize:13}}>{r.name}</td><td style={{padding:'9px 12px',textAlign:'center',fontFamily:'var(--fm)'}}>{r.paid}/{r.registered||0}</td><td style={{padding:'9px 12px',fontFamily:'var(--fm)',fontSize:11,color:'var(--cyan)'}}>{fmtRp(r.gross)}</td><td style={{padding:'9px 12px',fontFamily:'var(--fm)',fontSize:11,color:'var(--orange)'}}>{fmtRp(r.commission)}</td><td style={{padding:'9px 12px'}}><span className={`tag tag-${r.status}`}>{r.status}</span></td></tr>)}</tbody>
          <tfoot><tr style={{borderTop:'2px solid var(--border)'}}><td colSpan={2} style={{padding:'9px 12px',fontFamily:'var(--fh)',fontSize:9,color:'var(--cyan)',letterSpacing:1}}>TOTAL</td><td style={{padding:'9px 12px',fontFamily:'var(--fm)',fontSize:11,fontWeight:700,color:'var(--cyan)'}}>{fmtRp(tG)}</td><td style={{padding:'9px 12px',fontFamily:'var(--fm)',fontSize:11,fontWeight:700,color:'var(--orange)'}}>{fmtRp(tC)}</td><td/></tr></tfoot>
        </table>
      </div>
    </div>
  </div>
}

function RevenuePage({tournaments,teams,toast,lang}){
  const i=T[lang]||T.id
  const[showWd,setShowWd]=useState(false);const[wdAmt,setWdAmt]=useState('');const[wdH,setWdH]=useState([{id:'w1',date:'2026-05-28',amount:450000,status:'cair',method:'BCA 1234xxxx'}])
  const rows=tournaments.map(t=>{const p=teams.filter(x=>x.tournament_id===t.id&&x.paid).length;const g=p*Number(t.entry);return{...t,comm:g*0.15,sp:t.status==='closed'?Number(t.prize)*0.08:0,pr:t.status!=='pending'?50000:0}})
  const tC=rows.reduce((s,r)=>s+r.comm,0),grand=rows.reduce((s,r)=>s+r.comm+r.sp+r.pr,0),totalWd=wdH.reduce((s,w)=>s+w.amount,0),saldo=grand-totalWd
  const doWd=()=>{const a=Number(wdAmt);if(!a||a<10000){toast('Min Rp10.000','error');return;}if(a>saldo){toast('Saldo tidak cukup!','error');return;}setWdH(p=>[{id:uid(),date:new Date().toISOString().slice(0,10),amount:a,status:'proses',method:'BCA'},...p]);toast(`${fmtRp(a)} sedang diproses ✓`,'success');setWdAmt('');setShowWd(false)}
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18,flexWrap:'wrap',gap:11}}>
      <div><h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700,color:'var(--cyan)'}}>{i.rev_title}</h1><p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)',letterSpacing:1}}>{i.rev_sub}</p></div>
      <button className="btn btn-orange" onClick={()=>setShowWd(true)}>{i.withdraw_btn}</button>
    </div>
    <div style={{background:'linear-gradient(135deg,rgba(0,229,255,0.08),rgba(255,107,0,0.05))',border:'1px solid rgba(0,229,255,0.2)',borderRadius:10,padding:20,marginBottom:16,position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:10,right:12,fontSize:9,fontFamily:'var(--fm)',color:'var(--cyan)',letterSpacing:1,display:'flex',alignItems:'center',gap:4}}><span className="live-dot"/>REALTIME</div>
      <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:2,marginBottom:5}}>{i.saldo}</div>
      <div style={{fontFamily:'var(--fh)',fontSize:26,fontWeight:900,color:'var(--cyan)',marginBottom:3}}>{fmtRp(saldo)}</div>
      <div style={{fontSize:11,color:'var(--muted)',fontFamily:'var(--fm)'}}>{i.income} <span style={{color:'var(--green)'}}>{fmtRp(grand)}</span> · {i.withdrawn} <span style={{color:'var(--orange)'}}>{fmtRp(totalWd)}</span></div>
    </div>
    <div className="g4" style={{marginBottom:16}}>
      <div className="stat-card" style={{'--accent-color':'var(--cyan)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:5}}>🎫 {i.comm_lbl}</div><div style={{fontFamily:'var(--fh)',fontSize:17,color:'var(--cyan)',fontWeight:900}}>{fmtRp(tC)}</div></div>
      <div className="stat-card" style={{'--accent-color':'var(--orange)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:5}}>🏅 Sponsorship</div><div style={{fontFamily:'var(--fh)',fontSize:17,color:'var(--orange)',fontWeight:900}}>{fmtRp(rows.reduce((s,r)=>s+r.sp,0))}</div></div>
      <div className="stat-card" style={{'--accent-color':'var(--green)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:5}}>⭐ Premium</div><div style={{fontFamily:'var(--fh)',fontSize:17,color:'var(--green)',fontWeight:900}}>{fmtRp(rows.reduce((s,r)=>s+r.pr,0))}</div></div>
      <div className="stat-card" style={{'--accent-color':'var(--yellow)'}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:5}}>📊 {i.tourn_title}</div><div style={{fontFamily:'var(--fh)',fontSize:17,color:'var(--yellow)',fontWeight:900}}>{tournaments.length}</div></div>
    </div>
    <div className="card" style={{marginBottom:14}}>
      <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:12}}>{i.comm_per}</div>
      {rows.length===0&&<div style={{color:'var(--muted)',fontSize:12,textAlign:'center',padding:'18px 0'}}>{i.no_tourn_yet}</div>}
      {[...rows].sort((a,b)=>(b.comm+b.sp+b.pr)-(a.comm+a.sp+a.pr)).map((r,idx)=>{const total=r.comm+r.sp+r.pr;const mx=rows.reduce((m,x)=>Math.max(m,x.comm+x.sp+x.pr),1);return <div key={r.id} style={{marginBottom:11}}>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,flexWrap:'wrap',gap:3}}>
          <div style={{display:'flex',gap:7,alignItems:'center'}}><span style={{fontFamily:'var(--fm)',fontSize:9,color:idx===0?'var(--yellow)':'var(--muted)',width:14}}>#{idx+1}</span><div style={{fontSize:13,fontWeight:600}}>{r.name}</div></div>
          <div style={{fontFamily:'var(--fm)',fontSize:11,color:'var(--cyan)'}}>{fmtRp(total)}</div>
        </div>
        <div className="pbar"><div className="pfill" style={{width:`${(total/mx)*100}%`,background:idx===0?'var(--yellow)':'var(--cyan)'}}/></div>
      </div>})}
    </div>
    {showWd&&<div className="overlay" onClick={e=>{if(e.target===e.currentTarget)setShowWd(false)}}>
      <div className="modal" style={{maxWidth:360}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><div style={{fontFamily:'var(--fh)',fontSize:11,color:'var(--orange)',letterSpacing:1}}>{i.withdraw_title}</div><button onClick={()=>setShowWd(false)} style={{background:'none',border:'none',color:'var(--muted)',cursor:'pointer',fontSize:20}}>×</button></div>
        <div style={{background:'rgba(0,229,255,0.06)',border:'1px solid rgba(0,229,255,0.15)',borderRadius:6,padding:'11px 13px',marginBottom:13}}><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginBottom:3,letterSpacing:1}}>{i.saldo_lbl}</div><div style={{fontFamily:'var(--fh)',fontSize:19,color:'var(--cyan)',fontWeight:700}}>{fmtRp(saldo)}</div></div>
        <div style={{marginBottom:11}}><label>{i.amount_lbl}</label><input type="number" value={wdAmt} onChange={e=>setWdAmt(e.target.value)} placeholder="Min Rp 10.000"/></div>
        <div style={{marginBottom:16}}><label>{i.acc_lbl}</label><input value="BCA 1234xxxx" readOnly style={{color:'var(--muted)'}}/></div>
        <div style={{display:'flex',gap:8}}><button className="btn btn-orange btn-full" onClick={doWd}>{i.btn_wd}</button><button className="btn btn-ghost" onClick={()=>setShowWd(false)}>{i.btn_cancel}</button></div>
      </div>
    </div>}
  </div>
}

function BracketView({tournaments,teams,lang}){
  const i=T[lang]||T.id
  const[selT,setSelT]=useState(tournaments[0]?.id||'')
  const t=tournaments.find(x=>x.id===selT);const tTeams=teams.filter(x=>x.tournament_id===selT);const pairs=[]
  for(let idx=0;idx<Math.min(tTeams.length,8);idx+=2)pairs.push({a:tTeams[idx],b:tTeams[idx+1],w:Math.random()>0.5?tTeams[idx]?.id:tTeams[idx+1]?.id})
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{marginBottom:16}}><h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700}}>{i.nav[5]}</h1></div>
    <div style={{display:'flex',gap:5,marginBottom:14,flexWrap:'wrap'}}>
      {tournaments.map(x=><button key={x.id} onClick={()=>setSelT(x.id)} style={{padding:'5px 13px',borderRadius:5,cursor:'pointer',fontSize:11,fontWeight:500,background:selT===x.id?'var(--cyan)':'var(--panel)',color:selT===x.id?'#000':'var(--text)',border:`1px solid ${selT===x.id?'var(--cyan)':'var(--border)'}`,transition:'all 0.15s',fontFamily:'var(--fb)'}}>{x.name}</button>)}
    </div>
    {t&&<><div className="card" style={{marginBottom:14}}><div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:11}}><div><div style={{fontFamily:'var(--fh)',fontSize:13,fontWeight:700,color:'var(--cyan)'}}>{t.name}</div><div style={{fontSize:10,color:'var(--muted)',marginTop:2,fontFamily:'var(--fm)'}}>{t.game} · {t.format}</div></div><div style={{fontFamily:'var(--fh)',fontSize:14,color:'var(--yellow)',fontWeight:700}}>{fmtRp(t.prize)}</div></div></div>
    {tTeams.length<2?<div className="card" style={{textAlign:'center',padding:36,color:'var(--muted)'}}><div style={{fontSize:28,marginBottom:9}}>📊</div><div style={{fontFamily:'var(--fh)',fontSize:10,letterSpacing:1}}>MIN. 2 TEAMS DIPERLUKAN</div></div>
    :<div style={{display:'flex',gap:28,overflowX:'auto',paddingBottom:12,alignItems:'flex-start'}}>
      <div style={{display:'flex',flexDirection:'column',gap:14,flexShrink:0}}>
        {pairs.map((p,idx)=><div key={idx}><div style={{fontSize:8,fontFamily:'var(--fm)',color:'var(--muted)',marginBottom:3,letterSpacing:1}}>MATCH {idx+1}</div><div className="b-match"><div className={`b-team ${p.w===p.a?.id?'winner':'loser'}`}><span>{p.a?.name||'BYE'}</span>{p.w===p.a?.id&&<span>🏆</span>}</div><div className={`b-team ${p.w===p.b?.id?'winner':'loser'}`}><span>{p.b?.name||'BYE'}</span>{p.w===p.b?.id&&<span>🏆</span>}</div></div></div>)}
      </div>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',flexShrink:0,paddingTop:55}}>
        <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--yellow)',marginBottom:4,letterSpacing:1}}>🏆 GRAND FINAL</div>
        <div className="b-match" style={{border:'1px solid rgba(255,215,0,0.25)'}}><div className="b-team" style={{color:'var(--muted)'}}><span>TBD</span></div><div className="b-team" style={{color:'var(--muted)'}}><span>TBD</span></div></div>
        <div style={{textAlign:'center',marginTop:7,fontSize:10,fontFamily:'var(--fh)',color:'var(--yellow)'}}>{fmtRp(t.prize)}</div>
      </div>
    </div>}</>}
  </div>
}

// SETTINGS — dengan foto profil organizer & Ekspansi SEA berbendera
function Settings({user,lang,toast}){
  const i=T[lang]||T.id
  const BANK_KEY='arenagg_bank_info'
  const loadBank=()=>{try{return JSON.parse(localStorage.getItem(BANK_KEY)||'{}')}catch(e){return{}}}
  const[bank,setBank]=useState(loadBank)
  const[bankSaved,setBankSaved]=useState(false)
  const[prof,setProf]=useState(getProf)
  const[profSaved,setProfSaved]=useState(false)
  const setB=k=>e=>setBank(b=>({...b,[k]:e.target.value}))
  const saveBankFn=()=>{localStorage.setItem(BANK_KEY,JSON.stringify(bank));setBankSaved(true);setTimeout(()=>setBankSaved(false),2200);if(toast)toast('✓ Info bank tersimpan!','success')}
  const saveProfFn=()=>{saveProf(prof);setProfSaved(true);setTimeout(()=>setProfSaved(false),2200);window.dispatchEvent(new Event('profile-updated'));if(toast)toast('✓ Profil tersimpan!','success')}
  const emailName=user?.email?.split('@')[0]||'Organizer'
  const BANKS=['BCA','BRI','BNI','Mandiri','BSI','DANA','OVO','GoPay','ShopeePay','SeaBank']
  const SEA=[
    {img:'https://flagcdn.com/w40/id.png',country:'Indonesia',status:'active',note:'Pasar utama'},
    {img:'https://flagcdn.com/w40/ph.png',country:'Philippines',status:'soon',note:'Q3 2026'},
    {img:'https://flagcdn.com/w40/vn.png',country:'Vietnam',status:'soon',note:'Q4 2026'},
    {img:'https://flagcdn.com/w40/th.png',country:'Thailand',status:'soon',note:'2027'},
    {img:'https://flagcdn.com/w40/my.png',country:'Malaysia',status:'soon',note:'2027'},
    {img:'https://flagcdn.com/w40/cn.png',country:'China',status:'soon',note:'2028'},
  ]
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:600}}>
    <h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700,marginBottom:18}}>{i.settings_title}</h1>
    {/* PROFIL ORGANIZER */}
    <div className="card" style={{marginBottom:13,borderColor:'rgba(0,229,255,0.2)'}}>
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',marginBottom:14,letterSpacing:2}}>{i.profile_title}</div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:18}}>
        <div style={{position:'relative',cursor:'pointer',marginBottom:8}} onClick={()=>document.getElementById('prof_photo_inp').click()}>
          <div style={{width:96,height:96,borderRadius:'50%',background:'linear-gradient(135deg,var(--cyan),var(--orange))',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',border:'3px solid rgba(0,229,255,0.5)',fontSize:34,color:'#000',boxShadow:'0 0 20px rgba(0,229,255,0.2)'}}>
            {prof.photo?<img src={prof.photo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="profil"/>:<span>{(prof.name||emailName)[0].toUpperCase()}</span>}
          </div>
          <div style={{position:'absolute',bottom:3,right:3,width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,var(--cyan),#0099bb)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,color:'#000',border:'2px solid var(--bg)',boxShadow:'0 2px 8px rgba(0,0,0,0.4)'}}>📷</div>
        </div>
        <div style={{fontSize:9,color:'var(--muted)',fontFamily:'var(--fm)',letterSpacing:1}}>{i.change_photo}</div>
        <input id="prof_photo_inp" type="file" accept="image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setProf(p=>({...p,photo:ev.target.result}));r.readAsDataURL(f)}}/>
      </div>
      <div style={{marginBottom:12}}><label>{i.name_lbl}</label><input value={prof.name||''} onChange={e=>setProf(p=>({...p,name:e.target.value}))} placeholder={emailName}/></div>
      <div style={{marginBottom:12}}><label>Email</label><input value={user?.email||''} readOnly style={{color:'var(--muted)',cursor:'not-allowed'}}/></div>
      <div style={{fontSize:10,color:'var(--green)',marginBottom:13,fontFamily:'var(--fm)',letterSpacing:0.5}}>{i.connected}</div>
      <button className="btn btn-cyan" onClick={saveProfFn}>{profSaved?i.profile_saved:i.save_profile}</button>
    </div>
    {/* BANK INFO */}
    <div className="card" style={{marginBottom:13,borderColor:'rgba(255,215,0,0.2)'}}>
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--yellow)',marginBottom:13,letterSpacing:2}}>{i.bank_title}</div>
      <div style={{fontSize:11,color:'var(--muted)',marginBottom:13,lineHeight:1.7}}>{i.bank_desc}</div>
      <div style={{marginBottom:11}}><label>{i.bank_name}</label><select value={bank.bankName||''} onChange={setB('bankName')}><option value=''>{i.select_bank}</option>{BANKS.map(b=><option key={b}>{b}</option>)}</select></div>
      <div style={{marginBottom:11}}><label>{i.acc_num}</label><input value={bank.accNumber||''} onChange={setB('accNumber')} placeholder="1234567890"/></div>
      <div style={{marginBottom:11}}><label>{i.acc_owner}</label><input value={bank.accName||''} onChange={setB('accName')} placeholder="ARENAGG ORG"/></div>
      <div style={{marginBottom:16}}><label>{i.wa_confirm}</label><input value={bank.waNumber||''} onChange={setB('waNumber')} placeholder="08xxxxxxxxxx" type="tel"/></div>
      {bank.bankName&&bank.accNumber&&<div style={{background:'rgba(0,229,255,0.04)',border:'1px solid rgba(0,229,255,0.12)',borderRadius:6,padding:'11px 13px',marginBottom:13}}>
        <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--cyan)',marginBottom:7,letterSpacing:1}}>{i.preview_lbl}</div>
        <div style={{fontSize:13,lineHeight:2}}><div>🏦 <b>{bank.bankName}</b></div><div>💳 <b style={{color:'var(--cyan)',fontFamily:'var(--fm)'}}>{bank.accNumber}</b></div><div>👤 {bank.accName}</div>{bank.waNumber&&<div>📱 WA: <b>{bank.waNumber}</b></div>}</div>
      </div>}
      <button className="btn btn-cyan" onClick={saveBankFn}>{bankSaved?i.saved:i.btn_save_bank}</button>
    </div>
    {/* EKSPANSI SEA dengan bendera */}
    <div className="card">
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--yellow)',marginBottom:13,letterSpacing:2}}>{i.expansion}</div>
      {SEA.map(c=><div key={c.country} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 10px',background:'rgba(255,255,255,0.02)',borderRadius:6,marginBottom:5,border:'1px solid var(--border)'}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <img src={c.img} style={{width:30,height:20,objectFit:'cover',borderRadius:3,border:'1px solid rgba(255,255,255,0.08)',flexShrink:0}} alt={c.country} onError={e=>{e.target.style.display='none'}}/>
          <div><div style={{fontWeight:600,fontSize:13}}>{c.country}</div><div style={{fontSize:10,color:'var(--muted)',fontFamily:'var(--fm)'}}>{c.note}</div></div>
        </div>
        <span className={`tag ${c.status==='active'?'tag-active':'tag-pending'}`}>{c.status==='active'?'AKTIF':'SEGERA'}</span>
      </div>)}
    </div>
  </div>
}

// APP ROOT — Fix hash routing untuk link peserta
export default function App(){
  const[user,setUser]=useState(null);const[loading,setLoading]=useState(true);const[page,setPage]=useState('dashboard');const[editT,setEditT]=useState(null);const[toasts,setToasts]=useState([])
  // Init pubTid LANGSUNG dari hash saat komponen pertama kali render
  const initTid=()=>{const m=window.location.hash.match(/^#\/daftar\/([a-zA-Z0-9\-_]+)$/);return(m&&m[1])?decodeURIComponent(m[1]).trim():null}
  const[pubTid,setPubTid]=useState(initTid)
  const[lang,setLangState]=useState(getLang())
  const[isLight,setIsLight]=useState(()=>{try{return localStorage.getItem('arenagg_theme')==='light'}catch(e){return false}})
  const toggleTheme=()=>{setIsLight(prev=>{const next=!prev;saveTheme(next?'light':'dark');return next})}
  useEffect(()=>{document.documentElement.setAttribute('data-theme',isLight?'light':'')},[isLight])
  const[,forceUpdate]=useState(0)
  const setLangFn=l=>{setLangState(l);setLang(l)}
  const toast=useCallback((msg,type='info')=>{const id=uid();setToasts(p=>[...p,{id,msg,type}]);setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),3200)},[])

  // Listen for profile updates to refresh sidebar
  useEffect(()=>{
    const handler=()=>forceUpdate(n=>n+1)
    window.addEventListener('profile-updated',handler)
    return()=>window.removeEventListener('profile-updated',handler)
  },[])

  // Hash routing listener — untuk update jika hash berubah setelah mount
  useEffect(()=>{
    const parse=()=>{
      const m=window.location.hash.match(/^#\/daftar\/([a-zA-Z0-9\-_]+)$/)
      if(m&&m[1])setPubTid(decodeURIComponent(m[1]).trim())
      else setPubTid(null)
    }
    window.addEventListener('hashchange',parse)
    return()=>window.removeEventListener('hashchange',parse)
  },[])

  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>{setUser(data.session?.user||null);setLoading(false)})
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>setUser(session?.user||null))
    return()=>subscription.unsubscribe()
  },[])

  const{tournaments,teams,loading:dataLoading,addT,updateT,deleteT,addTeam,updateTeam,deleteTeam}=useData(user?.id,toast)
  useEffect(()=>{if(page!=='create')setEditT(null)},[page])

  const logout=async()=>{await supabase.auth.signOut();setUser(null)}
  const hasLive=tournaments.some(t=>t.status==='live')

  const goBack=()=>{
    window.location.hash=''
    window.history.pushState('',document.title,window.location.pathname+window.location.search)
  }

  // PUBLIC PAGE: Selalu tampilkan tanpa perlu login
  if(pubTid!==null)return <><PublicPage tid={pubTid} onBack={goBack} toast={toast}/><Toasts list={toasts}/></>
  // AUTH loading spinner
  if(loading)return <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{textAlign:'center'}}><div style={{fontFamily:'var(--fh)',fontSize:17,color:'var(--cyan)',letterSpacing:3,animation:'glow-pulse 2s infinite',marginBottom:14}}>⚔ ARENAGG</div><Spinner size={22} color="var(--cyan)"/></div></div>
  if(!user)return <><AuthPage onLogin={u=>setUser(u)} lang={lang} setLangFn={setLangFn}/><Toasts list={toasts}/></>

  const sharedProps={tournaments,teams,loading:dataLoading,setPage,editData:editT,setEditT,toast,user,addT,updateT,deleteT,addTeam,updateTeam,deleteTeam,onPreview:id=>{window.location.hash=`/daftar/${id}`},lang}

  return <div style={{display:'flex',minHeight:'100vh',background:'var(--bg)'}}>
    <Sidebar page={page} setPage={setPage} user={user} onLogout={logout} hasLive={hasLive} lang={lang} isLight={isLight} toggleTheme={toggleTheme} tournaments={tournaments}/>
    <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0}}>
      <LiveBanner tournaments={tournaments}/>
      <main style={{flex:1,overflowY:'auto',overflowX:'hidden'}}>
        {page==='dashboard'&&<div className='animate-in' key='dashboard'><Dashboard {...sharedProps}/></div>}
        {page==='revenue'&&<div className='animate-in'><RevenuePage {...sharedProps}/></div>}
        {page==='tournaments'&&<div className='animate-in'><TournamentList {...sharedProps}/></div>}
        {page==='create'&&<div className='animate-in'><CreateTournament addT={addT} updateT={updateT} editData={editT} setEditT={setEditT} toast={toast} lang={lang}/></div>}
        {page==='teams'&&<div className='animate-in'><TeamsView {...sharedProps}/></div>}
        {page==='bracket'&&<div className='animate-in'><BracketView {...sharedProps}/></div>}
        {page==='finance'&&<div className='animate-in'><Finance {...sharedProps}/></div>}
        {page==='settings'&&<div className='animate-in'><Settings user={user} lang={lang} toast={toast}/></div>}
      </main>
    </div>
    <BottomNav page={page} setPage={setPage} lang={lang} hasLive={hasLive}/>
    <Toasts list={toasts}/>
  </div>
}
