import React, { useState, useEffect, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

const T = {
  id:{nav:['Dashboard','Komisi','Turnamen','Buat','Peserta','Bracket','🔴 Live','🏅 Ranking','Keuangan','Setting'],login:'Masuk',register:'Daftar',email:'Email',password:'Password',community:'Nama Komunitas',btn_login:'🔑 Masuk',btn_register:'🚀 Buat Akun',dash_title:'Dashboard',dash_sub:'Overview realtime platform turnamen esport',active_t:'TURNAMEN AKTIF',revenue_lbl:'PENDAPATAN',quick:'AKSI CEPAT',btn_create:'＋ Buat Turnamen',btn_comm:'📈 Komisi',btn_part:'👥 Peserta',no_active:'Belum ada turnamen aktif',tourn_title:'Turnamen',btn_create_t:'＋ Buat',no_tourn:'TIDAK ADA TURNAMEN',share:'🔗 Bagikan',live_btn:'▶ Live',close_btn:'■ Tutup',activate:'✓ Aktif',create_title:'＋ BUAT TURNAMEN',edit_title:'✏ EDIT',tourn_name:'Nama Turnamen *',game:'Game',format:'Format',city:'Kota *',date:'Tanggal *',prize:'Prize Pool *',entry:'Entry Fee *',slots:'Slot',desc:'Deskripsi',btn_save:'💾 Simpan',btn_create2:'🚀 Buat',btn_cancel:'Batal',teams_title:'Peserta & Tim',all:'Semua',btn_reg_team:'＋ Daftarkan Tim',team_name:'Nama Tim *',captain:'Kapten *',contact:'No. HP',members:'Member',tournament:'Turnamen *',paid_lbl:'Sudah bayar entry fee',btn_reg2:'Daftarkan',no_teams:'Belum ada tim',finance_title:'Keuangan',total_entry:'Total Entry',comm_lbl:'Komisi 15%',done:'Selesai',settings_title:'Pengaturan',account:'AKUN ORGANIZER',connected:'✓ Terhubung ke Supabase',bank_title:'💳 INFO PEMBAYARAN',bank_desc:'Data ini akan ditampilkan ke peserta saat mendaftar.',bank_name:'Nama Bank',acc_num:'Nomor Rekening / Nomor HP',acc_owner:'Nama Pemilik Rekening',wa_confirm:'No. WhatsApp Konfirmasi',btn_save_bank:'💾 Simpan Info Bank',saved:'✓ Tersimpan!',expansion:'EKSPANSI SEA',prize_pool:'Total Prize Pool',slots_left:'Slot Tersisa',slot_filled:'Slot Terisi',about:'TENTANG',reg_teams:'TIM TERDAFTAR',full:'❌ Slot Penuh',reg_now:'✅ Daftar Tim Sekarang →',closed_msg:'PENDAFTARAN DITUTUP',reg_title:'DAFTARKAN TIM',pay_title:'CARA PEMBAYARAN',amount:'Jumlah Entry Fee',transfer_to:'Transfer ke:',acc_no:'No. Rek:',an:'A/N:',confirm_wa:'Konfirmasi ke WA:',contact_org:'📱 Hubungi organizer',btn_submit:'🚀 Kirim',registering:'Mendaftarkan...',success_title:'BERHASIL!',success_msg:'terdaftar di',back:'← Kembali',back_detail:'← Lihat Detail',rev_title:'📈 LAPORAN KOMISI',rev_sub:'Pendapatan realtime',saldo:'SALDO TERSEDIA',income:'Masuk:',withdrawn:'Dicairkan:',withdraw_btn:'💸 Withdraw',withdraw_title:'💸 WITHDRAW',saldo_lbl:'SALDO',amount_lbl:'Jumlah (Rp)',acc_lbl:'Rekening',btn_wd:'💸 Cairkan',comm_per:'KOMISI PER TURNAMEN',no_tourn_yet:'Buat turnamen pertamamu!',online:'ONLINE',logout:'Keluar',select_bank:'-- Pilih Bank --',preview_lbl:'PREVIEW PESERTA',lang_lbl:'Bahasa',edit:'✏ Edit',profile_title:'PROFIL ORGANIZER',change_photo:'Klik untuk ganti foto',name_lbl:'Nama Organizer',save_profile:'💾 Simpan Profil',profile_saved:'✓ Profil Tersimpan!',portal_peserta:'PORTAL PESERTA',masuk_tim:'Masuk Tim',cara_masuk:'Cara Masuk',nama_tim_label:'NAMA TIM *',nohp_label:'NO. HP (SAAT DAFTAR) *',nama_tim_ph:'Nama tim saat daftar...',nohp_ph:'08xxxxxxxxxx',btn_masuk_tim:'⚡ Masuk ke Dashboard Tim',belum_daftar:'Belum daftar?',portal_sub:'Akses dashboard tim & pantau pertandingan live'},
  en:{nav:['Dashboard','Revenue','Tournaments','Create','Participants','Bracket','🔴 Live','🏅 Ranking','Finance','Settings'],login:'Login',register:'Register',email:'Email',password:'Password',community:'Community Name',btn_login:'🔑 Login',btn_register:'🚀 Create Account',dash_title:'Dashboard',dash_sub:'Realtime esport tournament platform overview',active_t:'ACTIVE TOURNAMENTS',revenue_lbl:'REVENUE',quick:'QUICK ACTIONS',btn_create:'＋ Create Tournament',btn_comm:'📈 Revenue',btn_part:'👥 Participants',no_active:'No active tournaments',tourn_title:'Tournaments',btn_create_t:'＋ Create',no_tourn:'NO TOURNAMENTS',share:'🔗 Share',live_btn:'▶ Live',close_btn:'■ Close',activate:'✓ Activate',create_title:'＋ CREATE TOURNAMENT',edit_title:'✏ EDIT',tourn_name:'Tournament Name *',game:'Game',format:'Format',city:'City *',date:'Start Date *',prize:'Prize Pool *',entry:'Entry Fee *',slots:'Slots',desc:'Description',btn_save:'💾 Save',btn_create2:'🚀 Create',btn_cancel:'Cancel',teams_title:'Participants & Teams',all:'All',btn_reg_team:'＋ Register Team',team_name:'Team Name *',captain:'Captain *',contact:'Phone No.',members:'Members',tournament:'Tournament *',paid_lbl:'Entry fee paid',btn_reg2:'Register',no_teams:'No teams yet',finance_title:'Finance',total_entry:'Total Entry',comm_lbl:'Commission 15%',done:'Done',settings_title:'Settings',account:'ORGANIZER ACCOUNT',connected:'✓ Connected to Supabase',bank_title:'💳 PAYMENT INFO',bank_desc:'This info will be shown to participants.',bank_name:'Bank Name',acc_num:'Account / Phone Number',acc_owner:'Account Owner Name',wa_confirm:'WhatsApp Confirmation',btn_save_bank:'💾 Save Payment Info',saved:'✓ Saved!',expansion:'SEA EXPANSION',prize_pool:'Total Prize Pool',slots_left:'Slots Left',slot_filled:'Slots Filled',about:'ABOUT',reg_teams:'REGISTERED TEAMS',full:'❌ Full',reg_now:'✅ Register Now →',closed_msg:'REGISTRATION CLOSED',reg_title:'REGISTER TEAM',pay_title:'HOW TO PAY',amount:'Entry Fee Amount',transfer_to:'Transfer to:',acc_no:'Acc No:',an:'Name:',confirm_wa:'Confirm via WA:',contact_org:'📱 Contact organizer',btn_submit:'🚀 Submit',registering:'Registering...',success_title:'SUCCESS!',success_msg:'registered in',back:'← Back',back_detail:'← View Detail',rev_title:'📈 REVENUE REPORT',rev_sub:'Realtime earnings',saldo:'AVAILABLE BALANCE',income:'Income:',withdrawn:'Withdrawn:',withdraw_btn:'💸 Withdraw',withdraw_title:'💸 WITHDRAW',saldo_lbl:'BALANCE',amount_lbl:'Amount',acc_lbl:'Account',btn_wd:'💸 Withdraw',comm_per:'COMMISSION PER TOURNAMENT',no_tourn_yet:'Create your first tournament!',online:'ONLINE',logout:'Logout',select_bank:'-- Select Bank --',preview_lbl:'PARTICIPANT PREVIEW',lang_lbl:'Language',edit:'✏ Edit',profile_title:'ORGANIZER PROFILE',change_photo:'Click to change photo',name_lbl:'Organizer Name',save_profile:'💾 Save Profile',profile_saved:'✓ Profile Saved!',portal_peserta:'PARTICIPANT PORTAL',masuk_tim:'Team Login',cara_masuk:'How to Login',nama_tim_label:'TEAM NAME *',nohp_label:'PHONE NUMBER *',nama_tim_ph:'Team name at registration...',nohp_ph:'Phone number',btn_masuk_tim:'⚡ Enter Team Dashboard',belum_daftar:'Not registered?',portal_sub:'Access team dashboard & watch live'},
  fil:{nav:['Dashboard','Komisyon','Torneo','Gumawa','Kalahok','Bracket','🔴 Live','🏅 Ranking','Pananalapi','Setting'],login:'Mag-login',register:'Mag-register',email:'Email',password:'Password',community:'Pangalan ng Komunidad',btn_login:'🔑 Mag-login',btn_register:'🚀 Gumawa ng Account',dash_title:'Dashboard',dash_sub:'Real-time na pangkalahatang-ideya',active_t:'MGA AKTIBONG TORNEO',revenue_lbl:'KITA',quick:'MABILIS NA AKSYON',btn_create:'＋ Gumawa ng Torneo',btn_comm:'📈 Komisyon',btn_part:'👥 Kalahok',no_active:'Walang aktibong torneo',tourn_title:'Mga Torneo',btn_create_t:'＋ Gumawa',no_tourn:'WALANG TORNEO',share:'🔗 Ibahagi',live_btn:'▶ Live',close_btn:'■ Isara',activate:'✓ I-activate',create_title:'＋ GUMAWA NG TORNEO',edit_title:'✏ I-EDIT',tourn_name:'Pangalan ng Torneo *',game:'Laro',format:'Format',city:'Lungsod *',date:'Petsa *',prize:'Prize Pool *',entry:'Entry Fee *',slots:'Puwesto',desc:'Paglalarawan',btn_save:'💾 I-save',btn_create2:'🚀 Gumawa',btn_cancel:'Kanselahin',teams_title:'Mga Kalahok at Koponan',all:'Lahat',btn_reg_team:'＋ Mag-register',team_name:'Pangalan ng Koponan *',captain:'Kapitan *',contact:'Telepono',members:'Miyembro',tournament:'Torneo *',paid_lbl:'Nabayaran na',btn_reg2:'Mag-register',no_teams:'Walang koponan pa',finance_title:'Pananalapi',total_entry:'Kabuuang Entry',comm_lbl:'Komisyon 15%',done:'Tapos',settings_title:'Mga Setting',account:'ACCOUNT NG ORGANIZER',connected:'✓ Nakakonekta sa Supabase',bank_title:'💳 IMPORMASYON SA BAYAD',bank_desc:'Ipapakita sa mga kalahok.',bank_name:'Pangalan ng Bangko',acc_num:'Numero ng Account',acc_owner:'Pangalan ng May-ari',wa_confirm:'WhatsApp para sa Kumpirmasyon',btn_save_bank:'💾 I-save',saved:'✓ Na-save!',expansion:'PAGPAPALAWAK SA SEA',prize_pool:'Kabuuang Prize Pool',slots_left:'Natitirang Puwesto',slot_filled:'Napuno na Puwesto',about:'TUNGKOL SA',reg_teams:'MGA NAKAREHISTRONG KOPONAN',full:'❌ Puno na',reg_now:'✅ Mag-register Ngayon →',closed_msg:'SARADO NA',reg_title:'IREHISTRO ANG KOPONAN',pay_title:'PAANO MAGBAYAD',amount:'Halaga ng Entry Fee',transfer_to:'I-transfer sa:',acc_no:'Acc No:',an:'Pangalan:',confirm_wa:'Kumpirmahin sa WA:',contact_org:'📱 Makipag-ugnayan',btn_submit:'🚀 Isumite',registering:'Nagrerehistro...',success_title:'MATAGUMPAY!',success_msg:'nairehistro sa',back:'← Bumalik',back_detail:'← Tingnan',rev_title:'📈 ULAT NG KOMISYON',rev_sub:'Real-time na kita',saldo:'AVAILABLE NA BALANSE',income:'Kita:',withdrawn:'Na-withdraw:',withdraw_btn:'💸 I-withdraw',withdraw_title:'💸 I-WITHDRAW',saldo_lbl:'BALANSE',amount_lbl:'Halaga',acc_lbl:'Account',btn_wd:'💸 I-withdraw',comm_per:'KOMISYON BAWAT TORNEO',no_tourn_yet:'Gumawa ng iyong unang torneo!',online:'ONLINE',logout:'Mag-logout',select_bank:'-- Piliin ang Bangko --',preview_lbl:'PREVIEW NG KALAHOK',lang_lbl:'Wika',edit:'✏ I-edit',profile_title:'PROFILE NG ORGANIZER',change_photo:'I-click para palitan',name_lbl:'Pangalan ng Organizer',save_profile:'💾 I-save ang Profile',profile_saved:'✓ Na-save ang Profile!',portal_peserta:'PORTAL NG KALAHOK',masuk_tim:'Login ng Team',cara_masuk:'Paano Mag-login',nama_tim_label:'PANGALAN NG TEAM *',nohp_label:'NUMERO NG TELEPONO *',nama_tim_ph:'Pangalan ng team...',nohp_ph:'Numero ng telepono',btn_masuk_tim:'⚡ Pumasok sa Dashboard',belum_daftar:'Hindi pa nakarehistro?',portal_sub:'I-access ang dashboard ng team'},
  vi:{nav:['Bảng điều khiển','Hoa hồng','Giải đấu','Tạo mới','Người tham gia','Bracket','🔴 Live','🏅 Xếp hạng','Tài chính','Cài đặt'],login:'Đăng nhập',register:'Đăng ký',email:'Email',password:'Mật khẩu',community:'Tên cộng đồng',btn_login:'🔑 Đăng nhập',btn_register:'🚀 Tạo tài khoản',dash_title:'Bảng điều khiển',dash_sub:'Tổng quan thời gian thực',active_t:'GIẢI ĐẤU ĐANG HOẠT ĐỘNG',revenue_lbl:'DOANH THU',quick:'THAO TÁC NHANH',btn_create:'＋ Tạo giải đấu',btn_comm:'📈 Hoa hồng',btn_part:'👥 Người tham gia',no_active:'Không có giải đấu',tourn_title:'Giải đấu',btn_create_t:'＋ Tạo',no_tourn:'KHÔNG CÓ GIẢI ĐẤU',share:'🔗 Chia sẻ',live_btn:'▶ Trực tiếp',close_btn:'■ Đóng',activate:'✓ Kích hoạt',create_title:'＋ TẠO GIẢI ĐẤU',edit_title:'✏ CHỈNH SỬA',tourn_name:'Tên giải đấu *',game:'Trò chơi',format:'Thể thức',city:'Thành phố *',date:'Ngày *',prize:'Tổng giải thưởng *',entry:'Phí tham gia *',slots:'Số suất',desc:'Mô tả',btn_save:'💾 Lưu',btn_create2:'🚀 Tạo',btn_cancel:'Hủy',teams_title:'Người tham gia & Đội',all:'Tất cả',btn_reg_team:'＋ Đăng ký đội',team_name:'Tên đội *',captain:'Đội trưởng *',contact:'Số điện thoại',members:'Thành viên',tournament:'Giải đấu *',paid_lbl:'Đã thanh toán',btn_reg2:'Đăng ký',no_teams:'Chưa có đội',finance_title:'Tài chính',total_entry:'Tổng phí',comm_lbl:'Hoa hồng 15%',done:'Hoàn thành',settings_title:'Cài đặt',account:'TÀI KHOẢN',connected:'✓ Đã kết nối',bank_title:'💳 THÔNG TIN THANH TOÁN',bank_desc:'Hiển thị cho người tham gia.',bank_name:'Tên ngân hàng',acc_num:'Số tài khoản',acc_owner:'Tên chủ tài khoản',wa_confirm:'WhatsApp xác nhận',btn_save_bank:'💾 Lưu',saved:'✓ Đã lưu!',expansion:'MỞ RỘNG ĐÔNG NAM Á',prize_pool:'Tổng giải thưởng',slots_left:'Suất còn lại',slot_filled:'Suất đã đăng ký',about:'GIỚI THIỆU',reg_teams:'ĐỘI ĐÃ ĐĂNG KÝ',full:'❌ Hết suất',reg_now:'✅ Đăng ký ngay →',closed_msg:'ĐÃ ĐÓNG',reg_title:'ĐĂNG KÝ ĐỘI',pay_title:'CÁCH THANH TOÁN',amount:'Số tiền phí',transfer_to:'Chuyển khoản:',acc_no:'Số TK:',an:'Tên:',confirm_wa:'Xác nhận qua WA:',contact_org:'📱 Liên hệ',btn_submit:'🚀 Gửi',registering:'Đang đăng ký...',success_title:'THÀNH CÔNG!',success_msg:'đã đăng ký tham gia',back:'← Quay lại',back_detail:'← Xem chi tiết',rev_title:'📈 BÁO CÁO HOA HỒNG',rev_sub:'Thu nhập thực',saldo:'SỐ DƯ',income:'Thu nhập:',withdrawn:'Đã rút:',withdraw_btn:'💸 Rút tiền',withdraw_title:'💸 RÚT TIỀN',saldo_lbl:'SỐ DƯ',amount_lbl:'Số tiền',acc_lbl:'Tài khoản',btn_wd:'💸 Rút',comm_per:'HOA HỒNG THEO GIẢI',no_tourn_yet:'Tạo giải đấu đầu tiên!',online:'TRỰC TUYẾN',logout:'Đăng xuất',select_bank:'-- Chọn ngân hàng --',preview_lbl:'XEM TRƯỚC',lang_lbl:'Ngôn ngữ',edit:'✏ Sửa',profile_title:'HỒ SƠ',change_photo:'Nhấn để đổi ảnh',name_lbl:'Tên ban tổ chức',save_profile:'💾 Lưu',profile_saved:'✓ Đã lưu!',portal_peserta:'CỔNG THÀNH VIÊN',masuk_tim:'Đăng nhập đội',cara_masuk:'Cách đăng nhập',nama_tim_label:'TÊN ĐỘI *',nohp_label:'SỐ ĐIỆN THOẠI *',nama_tim_ph:'Tên đội khi đăng ký...',nohp_ph:'Số điện thoại',btn_masuk_tim:'⚡ Vào Dashboard',belum_daftar:'Chưa đăng ký?',portal_sub:'Truy cập dashboard & xem trực tiếp'},
  th:{nav:['แดชบอร์ด','ค่าคอมมิชชัน','ทัวร์นาเมนต์','สร้าง','ผู้เข้าร่วม','แบร็กเก็ต','การเงิน','ตั้งค่า'],login:'เข้าสู่ระบบ',register:'ลงทะเบียน',email:'อีเมล',password:'รหัสผ่าน',community:'ชื่อชุมชน',btn_login:'🔑 เข้าสู่ระบบ',btn_register:'🚀 สร้างบัญชี',dash_title:'แดชบอร์ด',dash_sub:'ภาพรวมแบบเรียลไทม์',active_t:'ทัวร์นาเมนต์ที่ใช้งาน',revenue_lbl:'รายได้',quick:'การดำเนินการด่วน',btn_create:'＋ สร้างทัวร์นาเมนต์',btn_comm:'📈 ค่าคอมมิชชัน',btn_part:'👥 ผู้เข้าร่วม',no_active:'ไม่มีทัวร์นาเมนต์',tourn_title:'ทัวร์นาเมนต์',btn_create_t:'＋ สร้าง',no_tourn:'ไม่มีทัวร์นาเมนต์',share:'🔗 แชร์',live_btn:'▶ ไลฟ์',close_btn:'■ ปิด',activate:'✓ เปิดใช้งาน',create_title:'＋ สร้างทัวร์นาเมนต์',edit_title:'✏ แก้ไข',tourn_name:'ชื่อ *',game:'เกม',format:'รูปแบบ',city:'เมือง *',date:'วันที่ *',prize:'รางวัล *',entry:'ค่าธรรมเนียม *',slots:'ที่นั่ง',desc:'คำอธิบาย',btn_save:'💾 บันทึก',btn_create2:'🚀 สร้าง',btn_cancel:'ยกเลิก',teams_title:'ผู้เข้าร่วมและทีม',all:'ทั้งหมด',btn_reg_team:'＋ ลงทะเบียนทีม',team_name:'ชื่อทีม *',captain:'กัปตัน *',contact:'โทรศัพท์',members:'สมาชิก',tournament:'ทัวร์นาเมนต์ *',paid_lbl:'ชำระแล้ว',btn_reg2:'ลงทะเบียน',no_teams:'ยังไม่มีทีม',finance_title:'การเงิน',total_entry:'ค่าธรรมเนียมรวม',comm_lbl:'ค่าคอมมิชชัน 15%',done:'เสร็จสิ้น',settings_title:'การตั้งค่า',account:'บัญชีผู้จัดงาน',connected:'✓ เชื่อมต่อแล้ว',bank_title:'💳 ข้อมูลการชำระเงิน',bank_desc:'แสดงให้ผู้เข้าร่วมเห็น',bank_name:'ชื่อธนาคาร',acc_num:'เลขบัญชี',acc_owner:'ชื่อเจ้าของบัญชี',wa_confirm:'WhatsApp ยืนยัน',btn_save_bank:'💾 บันทึก',saved:'✓ บันทึกแล้ว!',expansion:'การขยายตัวอาเซียน',prize_pool:'เงินรางวัลรวม',slots_left:'ที่นั่งที่เหลือ',slot_filled:'ที่นั่งที่จอง',about:'เกี่ยวกับ',reg_teams:'ทีมที่ลงทะเบียน',full:'❌ เต็มแล้ว',reg_now:'✅ ลงทะเบียน →',closed_msg:'ปิดรับสมัคร',reg_title:'ลงทะเบียนทีม',pay_title:'วิธีชำระ',amount:'จำนวนเงิน',transfer_to:'โอนไปที่:',acc_no:'เลขบัญชี:',an:'ชื่อ:',confirm_wa:'ยืนยันผ่าน WA:',contact_org:'📱 ติดต่อ',btn_submit:'🚀 ส่ง',registering:'กำลังลงทะเบียน...',success_title:'สำเร็จ!',success_msg:'ลงทะเบียนใน',back:'← กลับ',back_detail:'← ดูรายละเอียด',rev_title:'📈 รายงาน',rev_sub:'รายได้เรียลไทม์',saldo:'ยอดคงเหลือ',income:'รายรับ:',withdrawn:'ถอนออก:',withdraw_btn:'💸 ถอนเงิน',withdraw_title:'💸 ถอนเงิน',saldo_lbl:'ยอดคงเหลือ',amount_lbl:'จำนวน',acc_lbl:'บัญชี',btn_wd:'💸 ถอน',comm_per:'ค่าคอมมิชชันต่อทัวร์',no_tourn_yet:'สร้างทัวร์นาเมนต์แรก!',online:'ออนไลน์',logout:'ออกจากระบบ',select_bank:'-- เลือกธนาคาร --',preview_lbl:'ตัวอย่าง',lang_lbl:'ภาษา',edit:'✏ แก้ไข',profile_title:'โปรไฟล์',change_photo:'คลิกเพื่อเปลี่ยนรูป',name_lbl:'ชื่อผู้จัดงาน',save_profile:'💾 บันทึก',profile_saved:'✓ บันทึกแล้ว!',portal_peserta:'พอร์ทัลผู้แข่งขัน',masuk_tim:'เข้าสู่ระบบทีม',cara_masuk:'วิธีเข้าสู่ระบบ',nama_tim_label:'ชื่อทีม *',nohp_label:'หมายเลขโทรศัพท์ *',nama_tim_ph:'ชื่อทีมตอนลงทะเบียน...',nohp_ph:'หมายเลขโทรศัพท์',btn_masuk_tim:'⚡ เข้าสู่แดชบอร์ดทีม',belum_daftar:'ยังไม่ได้ลงทะเบียน?',portal_sub:'เข้าถึงแดชบอร์ดและดูสด'},
  zh:{nav:['仪表板','佣金','锦标赛','创建','参与者','对阵表','财务','设置'],login:'登录',register:'注册',email:'邮箱',password:'密码',community:'社区名称',btn_login:'🔑 登录',btn_register:'🚀 创建账户',dash_title:'仪表板',dash_sub:'实时概览',active_t:'进行中的锦标赛',revenue_lbl:'收入',quick:'快速操作',btn_create:'＋ 创建锦标赛',btn_comm:'📈 佣金',btn_part:'👥 参与者',no_active:'暂无锦标赛',tourn_title:'锦标赛',btn_create_t:'＋ 创建',no_tourn:'暂无锦标赛',share:'🔗 分享',live_btn:'▶ 直播',close_btn:'■ 关闭',activate:'✓ 激活',create_title:'＋ 创建锦标赛',edit_title:'✏ 编辑',tourn_name:'名称 *',game:'游戏',format:'格式',city:'城市 *',date:'日期 *',prize:'奖金池 *',entry:'报名费 *',slots:'名额',desc:'描述',btn_save:'💾 保存',btn_create2:'🚀 创建',btn_cancel:'取消',teams_title:'参与者和队伍',all:'全部',btn_reg_team:'＋ 注册队伍',team_name:'队伍名称 *',captain:'队长 *',contact:'电话',members:'成员',tournament:'锦标赛 *',paid_lbl:'已支付',btn_reg2:'注册',no_teams:'暂无队伍',finance_title:'财务',total_entry:'总报名费',comm_lbl:'佣金 15%',done:'已完成',settings_title:'设置',account:'主办方账户',connected:'✓ 已连接',bank_title:'💳 支付信息',bank_desc:'显示给参与者。',bank_name:'银行名称',acc_num:'账号',acc_owner:'账户持有人',wa_confirm:'WhatsApp 确认',btn_save_bank:'💾 保存',saved:'✓ 已保存!',expansion:'东南亚扩张',prize_pool:'总奖金池',slots_left:'剩余名额',slot_filled:'已报名',about:'关于',reg_teams:'已注册队伍',full:'❌ 已满',reg_now:'✅ 立即报名 →',closed_msg:'已截止',reg_title:'注册队伍',pay_title:'如何支付',amount:'金额',transfer_to:'转账至:',acc_no:'账号:',an:'姓名:',confirm_wa:'通过WA确认:',contact_org:'📱 联系主办方',btn_submit:'🚀 提交',registering:'注册中...',success_title:'成功!',success_msg:'已报名参加',back:'← 返回',back_detail:'← 查看详情',rev_title:'📈 佣金报告',rev_sub:'实时收入',saldo:'可用余额',income:'收入:',withdrawn:'已提现:',withdraw_btn:'💸 提现',withdraw_title:'💸 提现',saldo_lbl:'余额',amount_lbl:'金额',acc_lbl:'账户',btn_wd:'💸 提现',comm_per:'各锦标赛佣金',no_tourn_yet:'创建第一个锦标赛!',online:'在线',logout:'退出',select_bank:'-- 选择银行 --',preview_lbl:'参与者预览',lang_lbl:'语言',edit:'✏ 编辑',profile_title:'主办方资料',change_photo:'点击更换头像',name_lbl:'名称',save_profile:'💾 保存',profile_saved:'✓ 已保存!',portal_peserta:'参赛者门户',masuk_tim:'队伍登录',cara_masuk:'登录方法',nama_tim_label:'队伍名称 *',nohp_label:'手机号码 *',nama_tim_ph:'注册时的队伍名称...',nohp_ph:'手机号码',btn_masuk_tim:'⚡ 进入队伍仪表板',belum_daftar:'还没注册？',portal_sub:'访问队伍仪表板并观看直播'},
  ms:{nav:['Papan Pemuka','Komisen','Kejohanan','Cipta','Peserta','Bracket','🔴 Live','🏅 Kedudukan','Kewangan','Tetapan'],login:'Log Masuk',register:'Daftar',email:'E-mel',password:'Kata Laluan',community:'Nama Komuniti',btn_login:'🔑 Log Masuk',btn_register:'🚀 Buat Akaun',dash_title:'Papan Pemuka',dash_sub:'Gambaran masa nyata',active_t:'KEJOHANAN AKTIF',revenue_lbl:'PENDAPATAN',quick:'TINDAKAN PANTAS',btn_create:'＋ Cipta Kejohanan',btn_comm:'📈 Komisen',btn_part:'👥 Peserta',no_active:'Tiada kejohanan aktif',tourn_title:'Kejohanan',btn_create_t:'＋ Cipta',no_tourn:'TIADA KEJOHANAN',share:'🔗 Kongsi',live_btn:'▶ Langsung',close_btn:'■ Tutup',activate:'✓ Aktifkan',create_title:'＋ CIPTA KEJOHANAN',edit_title:'✏ SUNTING',tourn_name:'Nama *',game:'Permainan',format:'Format',city:'Bandar *',date:'Tarikh *',prize:'Hadiah *',entry:'Yuran *',slots:'Slot',desc:'Penerangan',btn_save:'💾 Simpan',btn_create2:'🚀 Cipta',btn_cancel:'Batal',teams_title:'Peserta & Pasukan',all:'Semua',btn_reg_team:'＋ Daftar Pasukan',team_name:'Nama Pasukan *',captain:'Kapten *',contact:'Telefon',members:'Ahli',tournament:'Kejohanan *',paid_lbl:'Yuran dibayar',btn_reg2:'Daftar',no_teams:'Tiada pasukan',finance_title:'Kewangan',total_entry:'Jumlah Yuran',comm_lbl:'Komisen 15%',done:'Selesai',settings_title:'Tetapan',account:'AKAUN PENGANJUR',connected:'✓ Disambungkan',bank_title:'💳 MAKLUMAT BAYARAN',bank_desc:'Dipaparkan kepada peserta.',bank_name:'Nama Bank',acc_num:'Nombor Akaun',acc_owner:'Nama Pemilik',wa_confirm:'WhatsApp Pengesahan',btn_save_bank:'💾 Simpan',saved:'✓ Tersimpan!',expansion:'PENGEMBANGAN SEA',prize_pool:'Jumlah Hadiah',slots_left:'Slot Berbaki',slot_filled:'Slot Diisi',about:'TENTANG',reg_teams:'PASUKAN BERDAFTAR',full:'❌ Penuh',reg_now:'✅ Daftar Sekarang →',closed_msg:'PENDAFTARAN TUTUP',reg_title:'DAFTAR PASUKAN',pay_title:'CARA BAYAR',amount:'Jumlah Yuran',transfer_to:'Pindah ke:',acc_no:'No. Akaun:',an:'Nama:',confirm_wa:'Sahkan WA:',contact_org:'📱 Hubungi',btn_submit:'🚀 Hantar',registering:'Mendaftar...',success_title:'BERJAYA!',success_msg:'didaftarkan dalam',back:'← Kembali',back_detail:'← Lihat',rev_title:'📈 LAPORAN',rev_sub:'Pendapatan masa nyata',saldo:'BAKI',income:'Masuk:',withdrawn:'Keluar:',withdraw_btn:'💸 Keluarkan',withdraw_title:'💸 PENGELUARAN',saldo_lbl:'BAKI',amount_lbl:'Jumlah',acc_lbl:'Akaun',btn_wd:'💸 Keluarkan',comm_per:'KOMISEN PER KEJOHANAN',no_tourn_yet:'Cipta kejohanan pertama!',online:'DALAM TALIAN',logout:'Log Keluar',select_bank:'-- Pilih Bank --',preview_lbl:'PRATONTON',lang_lbl:'Bahasa',edit:'✏ Sunting',profile_title:'PROFIL PENGANJUR',change_photo:'Klik untuk tukar foto',name_lbl:'Nama Penganjur',save_profile:'💾 Simpan',profile_saved:'✓ Tersimpan!',portal_peserta:'PORTAL PESERTA',masuk_tim:'Log Masuk Pasukan',cara_masuk:'Cara Log Masuk',nama_tim_label:'NAMA PASUKAN *',nohp_label:'NO. TELEFON *',nama_tim_ph:'Nama pasukan semasa mendaftar...',nohp_ph:'Nombor telefon',btn_masuk_tim:'⚡ Masuk Dashboard Pasukan',belum_daftar:'Belum daftar?',portal_sub:'Akses dashboard pasukan & tonton perlawanan langsung'},
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
const GAMES=['Mobile Legends','PUBG Mobile','Free Fire','Free Fire MAX','Valorant','Clash Royale','Clash of Clans','Dota 2','League of Legends','Honor of Kings','Genshin Impact','Street Fighter 6','Tekken 8','EA Sports FC','NBA 2K25','Pokémon Unite','Wild Rift','Arena of Valor','Chess','Other']
const GAME_EMOJI={'Mobile Legends':'⚔','PUBG Mobile':'🔫','Free Fire':'🔥','Free Fire MAX':'🔥','Valorant':'🎯','Clash Royale':'⚡','Clash of Clans':'🏰','Dota 2':'🌀','League of Legends':'🏹','Honor of Kings':'👑','Genshin Impact':'🌸','Street Fighter 6':'🥊','Tekken 8':'🤜','EA Sports FC':'⚽','NBA 2K25':'🏀','Pokémon Unite':'🎮','Wild Rift':'🗡','Arena of Valor':'🛡','Chess':'♟','Other':'🎮'}
const getGameEmoji=g=>GAME_EMOJI[g]||'🎮'
const FORMATS=['Single Elimination','Double Elimination','Round Robin','Swiss','Group Stage + Knockout','Battle Royale','League','Custom']
const SLOT_OPTIONS=[4,8,16,32,64,128]
const fmtRp=n=>'Rp '+Number(n).toLocaleString('id-ID')
const exportCSV=(rows,filename)=>{
  const headers=Object.keys(rows[0]||{})
  const csv=[headers.join(','),...rows.map(r=>headers.map(h=>JSON.stringify(r[h]??'')).join(','))].join('\n')
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'})
  const url=URL.createObjectURL(blob)
  const a=document.createElement('a')
  a.href=url;a.download=filename;a.click()
  URL.revokeObjectURL(url)
}
const uid=()=>Math.random().toString(36).slice(2,18)
const NAV_IDS=['dashboard','revenue','tournaments','create','teams','bracket','live','leaderboard','finance','settings']
const SHORTCUTS={'d':'dashboard','r':'revenue','t':'tournaments','n':'create','p':'teams','b':'bracket','l':'live','m':'leaderboard','f':'finance','s':'settings'}

const css=`*{margin:0;padding:0;box-sizing:border-box;}html,body{background:#050508;color:#e8e8f0;}:root{--bg:#050508;--bg2:#0a0a12;--bg3:#0f0f1a;--panel:#13131f;--border:#1a1a2e;--border2:#252540;--cyan:#00e5ff;--orange:#ff6b00;--green:#00ff88;--red:#ff2d55;--yellow:#ffd700;--text:#e8e8f0;--text2:#b0b0c8;--muted:#4a4a6a;--fh:'Orbitron',system-ui,sans-serif;--fb:'Rajdhani',system-ui,sans-serif;--fm:'Share Tech Mono',ui-monospace,monospace;--shadow:0 8px 32px rgba(0,0,0,0.4);--glow-cyan:0 0 20px rgba(0,229,255,0.15);--trans:all 0.3s cubic-bezier(0.4,0,0.2,1);}[data-theme="light"]{--bg:#f0f2f8;--bg2:#e4e6f4;--bg3:#d8daee;--panel:#ffffff;--border:#d0d2e8;--border2:#c0c2d8;--cyan:#0077aa;--orange:#dd4400;--green:#006633;--red:#bb0022;--yellow:#996600;--text:#1a1a2e;--text2:#4a4a6a;--muted:#8a8aaa;--shadow:0 4px 16px rgba(0,0,0,0.08);--glow-cyan:0 0 12px rgba(0,119,170,0.1);}body,body *{transition:background-color 0.35s ease,border-color 0.35s ease,color 0.35s ease;}body{background:var(--bg);color:var(--text);font-family:var(--fb);background-image:radial-gradient(ellipse at 20% 50%,rgba(0,229,255,0.025) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(255,107,0,0.018) 0%,transparent 60%);}[data-theme="light"] body{background-image:radial-gradient(ellipse at 20% 50%,rgba(0,119,170,0.04) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(221,68,0,0.03) 0%,transparent 60%);}::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:var(--cyan);border-radius:2px;opacity:0.5;}@keyframes slide-in{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}@keyframes slide-in-r{from{opacity:0;transform:translateX(14px);}to{opacity:1;transform:translateX(0);}}@keyframes fade-in{from{opacity:0;}to{opacity:1;}}@keyframes glow-pulse{0%,100%{text-shadow:0 0 10px var(--cyan),0 0 30px var(--cyan),0 0 60px rgba(0,229,255,0.3);}50%{text-shadow:0 0 6px var(--cyan),0 0 15px var(--cyan);}}@keyframes flicker{0%,19%,21%,25%,54%,56%,100%{opacity:1;}20%,24%,55%{opacity:0.3;}}@keyframes bar-fill{from{width:0!important;}}@keyframes spin{to{transform:rotate(360deg);}}@keyframes pop-in{from{opacity:0;transform:scale(0.92);}to{opacity:1;transform:scale(1);}}@keyframes bounce-in{0%{transform:translateY(40px);opacity:0;}60%{transform:translateY(-4px);}100%{transform:translateY(0);opacity:1;}}@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}
@keyframes twinkle{0%,100%{opacity:0;transform:scale(0);}50%{opacity:1;transform:scale(1);}}
@keyframes drift{0%{transform:translateY(0) translateX(0) rotate(0deg);}33%{transform:translateY(-20px) translateX(10px) rotate(120deg);}66%{transform:translateY(-10px) translateX(-8px) rotate(240deg);}100%{transform:translateY(0) translateX(0) rotate(360deg);}}
@keyframes energy-pulse{0%,100%{box-shadow:0 0 10px rgba(0,229,255,0.3),0 0 30px rgba(0,229,255,0.1);}50%{box-shadow:0 0 20px rgba(0,229,255,0.6),0 0 60px rgba(0,229,255,0.2),0 0 100px rgba(0,229,255,0.05);}}
@keyframes neon-text{0%,100%{text-shadow:0 0 7px var(--cyan),0 0 20px var(--cyan);}50%{text-shadow:0 0 4px var(--cyan),0 0 10px var(--cyan);}}
@keyframes aurora{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
.neon-text{animation:neon-text 3s ease-in-out infinite;}
.energy-glow{animation:energy-pulse 3s ease-in-out infinite;}
.aurora-text{background:linear-gradient(135deg,var(--cyan),#fff,var(--orange),var(--cyan));background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:aurora 4s ease infinite;}
.gaming-card{background:linear-gradient(135deg,rgba(0,229,255,0.05) 0%,rgba(255,107,0,0.03) 50%,rgba(138,43,226,0.05) 100%);border:1px solid rgba(0,229,255,0.15);border-radius:12px;position:relative;overflow:hidden;}
.gaming-card::before{content:'';position:absolute;top:-1px;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--cyan),var(--orange),var(--cyan),transparent);animation:aurora 3s linear infinite;background-size:200% 100%;}
[data-theme="light"] .aurora-text{-webkit-text-fill-color:var(--text);}
@keyframes scan-line{0%{transform:translateX(-100%);}100%{transform:translateX(200%);}}
@keyframes count-up{from{opacity:0;transform:translateY(4px);}to{opacity:1;transform:translateY(0);}}
@keyframes border-glow{0%,100%{box-shadow:0 0 0 0 rgba(0,229,255,0);}50%{box-shadow:0 0 0 3px rgba(0,229,255,0.15);}}.animate-in{animation:slide-in 0.35s cubic-bezier(0.4,0,0.2,1) both;;position:relative;z-index:1;}
.animate-in>*:nth-child(1){animation-delay:0s}
.animate-in>*:nth-child(2){animation-delay:0.04s}
.animate-in>*:nth-child(3){animation-delay:0.08s}
.animate-in>*:nth-child(4){animation-delay:0.12s}
.animate-in>*:nth-child(5){animation-delay:0.16s}
.animate-in>*:nth-child(6){animation-delay:0.20s}.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border:none;border-radius:7px;font-family:var(--fh);font-size:10px;font-weight:700;letter-spacing:1.5px;cursor:pointer;transition:var(--trans);text-transform:uppercase;position:relative;overflow:hidden;}.btn::after{content:'';position:absolute;inset:0;background:rgba(255,255,255,0.12);opacity:0;transition:opacity 0.2s;border-radius:inherit;}.btn:hover::after{opacity:1;}.btn:active{transform:scale(0.97);}.btn:disabled{opacity:0.4;cursor:not-allowed;}.btn:disabled::after{display:none;}.btn-cyan{background:linear-gradient(135deg,var(--cyan),#0099bb);color:#000;box-shadow:0 4px 14px rgba(0,229,255,0.25);}.btn-cyan:not(:disabled):hover{box-shadow:0 4px 22px rgba(0,229,255,0.5),0 0 40px rgba(0,229,255,0.15);transform:translateY(-2px);}.btn-orange{background:linear-gradient(135deg,var(--orange),#cc4400);color:#fff;}.btn-orange:not(:disabled):hover{box-shadow:0 4px 22px rgba(255,107,0,0.4);transform:translateY(-1px);}.btn-ghost{background:transparent;color:var(--cyan);border:1px solid rgba(0,229,255,0.3);}.btn-ghost:not(:disabled):hover{background:rgba(0,229,255,0.08);border-color:var(--cyan);}.btn-danger{background:linear-gradient(135deg,var(--red),#cc0033);color:#fff;}.btn-green{background:linear-gradient(135deg,var(--green),#00bb55);color:#000;}.btn-dark{background:var(--panel);color:var(--text);border:1px solid var(--border);}.btn-dark:hover{border-color:rgba(0,229,255,0.3);}.btn-sm{padding:5px 12px;font-size:9px;}.btn-full{width:100%;justify-content:center;}.card{background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:20px;position:relative;overflow:hidden;transition:var(--trans);}.card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:0.3;transition:opacity 0.3s;}.card:hover::before{opacity:0.8;}.card:hover{border-color:var(--border2);box-shadow:var(--shadow);}
.card-glass{background:rgba(19,19,31,0.6);backdrop-filter:blur(12px);border:1px solid rgba(0,229,255,0.12);border-radius:12px;padding:20px;position:relative;overflow:hidden;transition:var(--trans);}
[data-theme="light"] .card-glass{background:rgba(255,255,255,0.7);border-color:rgba(0,119,170,0.15);}
.card-glass:hover{border-color:rgba(0,229,255,0.25);box-shadow:var(--shadow);}
.metric-chip{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:20px;font-family:var(--fm);font-size:9px;font-weight:600;letter-spacing:1px;}
.metric-up{background:rgba(0,255,136,0.1);color:var(--green);border:1px solid rgba(0,255,136,0.2);}
.metric-down{background:rgba(255,45,85,0.1);color:var(--red);border:1px solid rgba(255,45,85,0.2);}
.metric-neutral{background:rgba(0,229,255,0.08);color:var(--cyan);border:1px solid rgba(0,229,255,0.2);}.stat-card{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:18px;position:relative;overflow:hidden;transition:var(--trans);}.stat-card:hover{border-color:rgba(0,229,255,0.4);transform:translateY(-4px) scale(1.01);box-shadow:0 12px 40px rgba(0,0,0,0.5),0 0 30px rgba(0,229,255,0.2),0 0 60px rgba(0,229,255,0.05);cursor:pointer;}.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent-color,var(--cyan)),transparent);}.stat-card::after{content:'';position:absolute;top:-30px;right:-30px;width:80px;height:80px;background:var(--accent-color,var(--cyan));opacity:0.04;border-radius:50%;transition:var(--trans);}.stat-card:hover::after{transform:scale(1.3);}.tag{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:4px;font-family:var(--fm);font-size:9px;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;}.mobile-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}.mobile-table-wrap table{min-width:480px;}.tag-active{background:rgba(0,255,136,0.1);color:var(--green);border:1px solid rgba(0,255,136,0.2);}.tag-pending{background:rgba(255,215,0,0.1);color:var(--yellow);border:1px solid rgba(255,215,0,0.2);}.tag-closed{background:rgba(74,74,106,0.1);color:var(--muted);border:1px solid var(--border);}.tag-live{background:rgba(255,45,85,0.12);color:var(--red);border:1px solid rgba(255,45,85,0.35);animation:flicker 2s infinite;font-weight:900;}input,select,textarea{background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:7px;color:var(--text);font-family:var(--fb);font-size:14px;padding:10px 14px;width:100%;outline:none;transition:var(--trans);}[data-theme="light"] input,[data-theme="light"] select,[data-theme="light"] textarea{background:rgba(0,0,0,0.03);}input:focus,select:focus,textarea:focus{border-color:var(--cyan);box-shadow:0 0 0 3px rgba(0,229,255,0.07);outline:none;}input:hover,select:hover,textarea:hover{border-color:var(--border2);}input::placeholder,textarea::placeholder{color:var(--muted);}label{display:block;font-size:10px;font-family:var(--fm);color:var(--muted);margin-bottom:5px;text-transform:uppercase;letter-spacing:1px;}.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}@media(max-width:900px){.g4{grid-template-columns:1fr 1fr;}.g3{grid-template-columns:1fr 1fr;}}@media(max-width:600px){.g2,.g3,.g4{grid-template-columns:1fr;}}hr.div{border:none;border-top:1px solid var(--border);margin:16px 0;}.pbar{height:4px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;}[data-theme="light"] .pbar{background:rgba(0,0,0,0.06);}.pfill{height:100%;border-radius:4px;animation:bar-fill 0.9s cubic-bezier(0.4,0,0.2,1);}.sidebar{width:220px;min-width:220px;background:linear-gradient(180deg,rgba(8,8,20,0.98) 0%,rgba(5,5,15,0.99) 100%);border-right:1px solid rgba(0,229,255,0.12);display:flex;flex-direction:column;height:100vh;position:sticky;top:0;z-index:100;transition:var(--trans);}.sidebar::after{content:'';position:absolute;top:0;right:0;width:1px;height:100%;background:linear-gradient(180deg,transparent,var(--cyan),transparent);opacity:0.15;}.nav-item{display:flex;align-items:center;gap:9px;padding:9px 13px;border-radius:7px;cursor:pointer;font-family:var(--fb);font-size:13px;font-weight:500;color:var(--muted);transition:var(--trans);border:none;background:none;width:100%;text-align:left;margin-bottom:2px;position:relative;overflow:hidden;}.nav-item::before{content:'';position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(90deg,rgba(0,229,255,0.1),transparent);transition:width 0.3s ease;border-radius:7px;}.nav-item:hover{color:var(--text);}.nav-item:hover::before{width:100%;}.nav-item.active{color:var(--cyan);background:linear-gradient(90deg,rgba(0,229,255,0.1),transparent);border-left:2px solid var(--cyan);padding-left:11px;}.nav-item.active::before{width:100%;}.nav-icon{font-size:15px;width:20px;text-align:center;flex-shrink:0;}.nav-live-dot{width:7px;height:7px;border-radius:50%;background:var(--red);animation:pulse 0.8s infinite;display:inline-block;margin-left:auto;flex-shrink:0;}.theme-toggle-btn{display:flex;align-items:center;justify-content:space-between;padding:8px 10px;border-radius:7px;border:1px solid var(--border);background:rgba(255,255,255,0.03);cursor:pointer;transition:var(--trans);width:100%;margin-bottom:6px;}.theme-toggle-btn:hover{border-color:rgba(0,229,255,0.3);background:rgba(0,229,255,0.04);}.tt-label{font-family:var(--fm);font-size:9px;color:var(--muted);letter-spacing:1px;}.tt-track{width:34px;height:18px;border-radius:9px;background:var(--border);position:relative;transition:background 0.3s ease;flex-shrink:0;}.tt-track.on{background:var(--cyan);}.tt-knob{width:13px;height:13px;background:#fff;border-radius:50%;position:absolute;top:2.5px;left:2.5px;transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);}.tt-track.on .tt-knob{transform:translateX(16px);}.bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;background:var(--bg2);border-top:1px solid var(--border);z-index:200;padding:0;grid-template-columns:repeat(8,1fr);backdrop-filter:blur(10px);}.bnav-item{display:flex;flex-direction:column;align-items:center;gap:1px;padding:6px 2px;border:none;background:none;cursor:pointer;color:var(--muted);font-family:var(--fm);font-size:6px;text-transform:uppercase;transition:var(--trans);flex:1;min-height:52px;justify-content:center;}.bnav-item.active{color:var(--cyan);}.bnav-icon{font-size:18px;line-height:1.2;}.toast-wrap{position:fixed;bottom:80px;right:14px;z-index:9999;display:flex;flex-direction:column;gap:6px;}@media(min-width:769px){.toast-wrap{bottom:18px;}}.toast{background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:10px 14px;font-size:12px;animation:slide-in-r 0.3s cubic-bezier(0.4,0,0.2,1);display:flex;align-items:center;gap:8px;max-width:290px;box-shadow:var(--shadow);}.toast-success{border-left:3px solid var(--green);}.toast-error{border-left:3px solid var(--red);}.toast-info{border-left:3px solid var(--cyan);}.overlay{position:fixed;inset:0;background:rgba(0,0,0,0.82);backdrop-filter:blur(8px);z-index:500;display:flex;align-items:center;justify-content:center;padding:16px;animation:fade-in 0.2s ease;}.modal{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:24px;width:100%;max-width:520px;max-height:90vh;overflow-y:auto;animation:pop-in 0.25s cubic-bezier(0.4,0,0.2,1);box-shadow:var(--shadow);}.auth-bg{min-height:100vh;min-height:-webkit-fill-available;background:var(--bg);position:relative;z-index:1;display:flex;align-items:center;justify-content:center;padding:20px;background-image:radial-gradient(ellipse at 20% 50%,rgba(0,229,255,0.05) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(255,107,0,0.04) 0%,transparent 60%);}.live-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:pulse 1.5s infinite;display:inline-block;margin-right:5px;vertical-align:middle;}.b-match{background:var(--panel);border:1px solid var(--border);border-radius:5px;width:140px;overflow:hidden;}@media(max-width:768px){.b-match{width:120px;}.b-team{font-size:9px;padding:5px 7px;}}.b-team{padding:7px 10px;font-size:11px;font-weight:600;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);}.b-team:last-child{border-bottom:none;}.b-team.winner{background:rgba(0,255,136,0.06);color:var(--green);}.b-team.loser{color:var(--muted);}.lang-btn{background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:5px;padding:4px 7px;cursor:pointer;transition:var(--trans);display:inline-flex;align-items:center;gap:4px;}[data-theme="light"] .lang-btn{background:rgba(0,0,0,0.03);}.lang-btn:hover,.lang-btn.active{border-color:var(--cyan);background:rgba(0,229,255,0.08);}.lang-flag{width:20px;height:13px;object-fit:cover;border-radius:2px;display:block;}.lang-code{font-size:9px;color:var(--muted);font-family:var(--fm);line-height:1;}.lang-btn.active .lang-code{color:var(--cyan);}

/* ===== CSS-ONLY PARTICLE STARS ===== */
.particle-field{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;}
.particle-field::before,.particle-field::after{content:'';position:absolute;width:2px;height:2px;border-radius:50%;animation:particle-drift 15s linear infinite;}
@keyframes particle-drift{0%{transform:translateY(100vh) translateX(0);opacity:0;}10%{opacity:0.8;}90%{opacity:0.3;}100%{transform:translateY(-100px) translateX(100px);opacity:0;}}
.p-star{position:absolute;border-radius:50%;animation:twinkle-star linear infinite;}
@keyframes twinkle-star{0%{opacity:0;transform:scale(0);}50%{opacity:1;transform:scale(1);}100%{opacity:0;transform:scale(0);}}@media(max-width:768px){.sidebar{display:none;}.bottom-nav{display:grid;}main{padding-bottom:68px;}.card{padding:14px;}.card-glass{padding:14px;}.modal{padding:18px;border-radius:10px;}.stat-card{padding:14px;}.stat-card:hover{transform:none;}.btn{padding:10px 14px;font-size:10px;min-height:42px;}.btn-sm{padding:8px 12px;font-size:9px;min-height:36px;}input,select,textarea{font-size:16px !important;padding:12px 14px;}label{font-size:11px;margin-bottom:6px;}.g2{grid-template-columns:1fr;}.g3{grid-template-columns:1fr;}.g4{grid-template-columns:1fr 1fr;}.bnav-item{font-size:7px;padding:6px 2px;}.bnav-icon{font-size:18px;}.b-match{width:130px;}.b-team{font-size:10px;padding:6px 8px;}.tag{font-size:8px;}.chip{font-size:8px;}}
@media(max-width:768px){.create-layout{grid-template-columns:1fr !important;}.page-content>div[style]{max-width:100% !important;}.page-content-sm{padding:12px 12px !important;}}@media print{.sidebar,.bottom-nav,.btn,.toast-wrap{display:none!important;}body{background:#fff!important;color:#000!important;}main{padding:0!important;}.card{border:1px solid #ccc!important;background:#fff!important;}.animate-in{animation:none!important;}}@media(min-width:769px){.bottom-nav{display:none !important;}}button:focus-visible{outline:2px solid var(--cyan);outline-offset:2px;}*{-webkit-tap-highlight-color:transparent;}
.nav-item{position:relative;}
.nav-item::after{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--cyan);transform:scaleY(0);transition:transform 0.2s ease;border-radius:0 2px 2px 0;}
.nav-item.active::after{transform:scaleY(1);}
@keyframes number-pop{0%{transform:scale(1.3);color:var(--green);}100%{transform:scale(1);}}
.stat-card:hover .stat-val{animation:number-pop 0.3s ease;}
@keyframes border-scan{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.gaming-card-active{background-size:200% 200%;animation:border-scan 3s ease infinite;}
input:focus,select:focus,textarea:focus{transform:none;}
.btn-cyan:not(:disabled):active,.btn-orange:not(:disabled):active{transform:scale(0.95) translateY(1px);}
@keyframes slide-up-in{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.page-enter{animation:slide-up-in 0.3s cubic-bezier(0.22,1,0.36,1) both;}
.skeleton{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 75%);background-size:400px 100%;animation:shimmer 1.5s infinite;}
@keyframes shimmer{0%{background-position:-400px 0;}100%{background-position:400px 0;}}
.tooltip{position:relative;}.tooltip::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.9);color:#fff;padding:4px 8px;border-radius:4px;font-family:var(--fm);font-size:9px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity 0.2s;z-index:100;}.tooltip:hover::after{opacity:1;}
[data-theme='light'] .skeleton{background:linear-gradient(90deg,rgba(0,0,0,0.04) 25%,rgba(0,0,0,0.08) 50%,rgba(0,0,0,0.04) 75%);}
.chip{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:12px;font-family:var(--fm);font-size:9px;font-weight:600;letter-spacing:0.5px;border:1px solid var(--border);background:rgba(255,255,255,0.04);color:var(--text2);}`
try{const styleEl=document.createElement('style');styleEl.textContent=css;document.head.appendChild(styleEl)}catch(e){console.warn('CSS inject failed',e)}
// Add Google Fonts if not present
if(!document.getElementById('arenagg-fonts')){const lk=document.createElement('link');lk.id='arenagg-fonts';lk.rel='stylesheet';lk.href='https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap';document.head.appendChild(lk)}
// Ensure proper mobile viewport
if(!document.querySelector('meta[name="viewport"]')){const vm=document.createElement('meta');vm.name='viewport';vm.content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no';document.head.appendChild(vm)}
// Init theme from localStorage
const savedTheme=localStorage.getItem('arenagg_theme');if(savedTheme==='light')document.documentElement.setAttribute('data-theme','light')


// ============================================================
// IN-APP NOTIFICATION SYSTEM
// ============================================================
const NOTIF_KEY='arenagg_notifications'
function loadNotifs(){try{return JSON.parse(localStorage.getItem(NOTIF_KEY)||'[]')}catch(e){return[]}}
function saveNotifs(ns){try{localStorage.setItem(NOTIF_KEY,JSON.stringify(ns.slice(0,50)))}catch(e){}}
function addNotif(msg,type,link){
  type=type||'info';link=link||''
  const ns=loadNotifs()
  ns.unshift({id:uid(),msg,type,link,ts:Date.now(),read:false})
  saveNotifs(ns)
  window.dispatchEvent(new Event('arenagg-notif'))
}
function NotifBell({setPage}){
  const[open,setOpen]=useState(false)
  const[notifs,setNotifs]=useState(loadNotifs)
  const unread=notifs.filter(function(n){return !n.read}).length
  useEffect(function(){
    var refresh=function(){setNotifs(loadNotifs())}
    window.addEventListener('arenagg-notif',refresh)
    return function(){window.removeEventListener('arenagg-notif',refresh)}
  },[])
  var markAll=function(){var ns=notifs.map(function(n){return Object.assign({},n,{read:true})});setNotifs(ns);saveNotifs(ns)}
  var dismiss=function(id){var ns=notifs.filter(function(n){return n.id!==id});setNotifs(ns);saveNotifs(ns)}
  var clearAll=function(){setNotifs([]);saveNotifs([])}
  var timeAgo=function(ts){
    var d=Date.now()-ts
    if(d<60000)return 'baru saja'
    if(d<3600000)return Math.floor(d/60000)+'m lalu'
    if(d<86400000)return Math.floor(d/3600000)+'j lalu'
    return Math.floor(d/86400000)+'h lalu'
  }
  var typeIcon={info:'ℹ',success:'✅',warning:'⚠',error:'❌',tournament:'🏆',payment:'💰',team:'👥',live:'🔴'}
  return <div style={{position:'relative'}}>
    <button onClick={function(){setOpen(function(o){return !o});if(!open)markAll()}} style={{position:'relative',background:'none',border:'1px solid var(--border)',borderRadius:8,padding:'6px 8px',cursor:'pointer',color:'var(--text)',display:'flex',alignItems:'center',gap:4}}>
      <span style={{fontSize:16}}>🔔</span>
      {unread>0&&<span style={{position:'absolute',top:-4,right:-4,background:'var(--red)',color:'#fff',borderRadius:'50%',width:16,height:16,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--fm)',fontSize:9,fontWeight:700,border:'2px solid var(--bg)'}}>{unread>9?'9+':unread}</span>}
    </button>
    {open&&<div style={{position:'absolute',top:40,right:0,width:300,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,boxShadow:'0 8px 32px rgba(0,0,0,0.5)',zIndex:999,overflow:'hidden'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 14px',borderBottom:'1px solid var(--border)'}}>
        <span style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1}}>🔔 NOTIFIKASI</span>
        <div style={{display:'flex',gap:6}}>
          {notifs.length>0&&<button onClick={clearAll} style={{background:'none',border:'none',cursor:'pointer',fontSize:9,color:'var(--muted)',fontFamily:'var(--fm)'}}>Hapus semua</button>}
          <button onClick={function(){setOpen(false)}} style={{background:'none',border:'none',cursor:'pointer',fontSize:16,color:'var(--muted)',lineHeight:1}}>×</button>
        </div>
      </div>
      <div style={{maxHeight:300,overflowY:'auto'}}>
        {notifs.length===0
          ?<div style={{padding:24,textAlign:'center',color:'var(--muted)',fontSize:11}}><div style={{fontSize:32,marginBottom:8}}>🔕</div>Belum ada notifikasi</div>
          :notifs.map(function(n){return(
            <div key={n.id} style={{padding:'10px 14px',borderBottom:'1px solid rgba(255,255,255,0.04)',background:n.read?'transparent':'rgba(0,229,255,0.04)',cursor:n.link?'pointer':'default'}}
              onClick={function(){if(n.link){setPage(n.link);setOpen(false)}}}>
              <div style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                <span style={{fontSize:14,flexShrink:0,marginTop:1}}>{typeIcon[n.type]||'ℹ'}</span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:11,lineHeight:1.4}}>{n.msg}</div>
                  <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',marginTop:3}}>{timeAgo(n.ts)}</div>
                </div>
                <button onClick={function(e){e.stopPropagation();dismiss(n.id)}} style={{background:'none',border:'none',cursor:'pointer',color:'var(--muted)',fontSize:12,flexShrink:0,padding:2}}>×</button>
              </div>
            </div>
          )})
        }
      </div>
    </div>}
    {open&&<div style={{position:'fixed',inset:0,zIndex:998}} onClick={function(){setOpen(false)}}/>}
  </div>
}

function Spinner({size=16,color='var(--cyan)'}){return <span style={{width:size,height:size,border:`2px solid rgba(0,229,255,0.15)`,borderTopColor:color,borderRadius:'50%',animation:'spin 0.7s linear infinite',display:'inline-block',flexShrink:0}}/>}
function Toasts({list}){
  return <div className="toast-wrap">
    {list.map(t=><div key={t.id} className={`toast toast-${t.type}`} style={{cursor:'default'}}>
      <span style={{fontSize:14,flexShrink:0}}>{t.type==='success'?'✓':t.type==='error'?'✗':t.type==='warning'?'⚠':'ℹ'}</span>
      <span style={{flex:1}}>{t.msg}</span>
    </div>)}
  </div>
}

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
  return <div>
    {liveT.length>0&&<div style={{background:'linear-gradient(90deg,rgba(255,45,85,0.95),rgba(255,107,0,0.9))',padding:'8px 14px',display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',boxShadow:'0 2px 20px rgba(255,45,85,0.3)'}}>
      <span style={{width:10,height:10,borderRadius:'50%',background:'#fff',animation:'pulse 0.8s infinite',display:'inline-block',flexShrink:0}}/>
      <span style={{fontFamily:'var(--fh)',fontSize:11,color:'#fff',letterSpacing:2,fontWeight:900}}>🔴 LIVE NOW</span>
      {liveT.map(t=><span key={t.id} style={{fontFamily:'var(--fh)',fontSize:10,color:'#fff',background:'rgba(0,0,0,0.2)',padding:'2px 10px',borderRadius:20,border:'1px solid rgba(255,255,255,0.2)'}}>⚔ {t.name}</span>)}
    </div>}
    <AdBanner compact={true}/>
  </div>
}



// ============================================================
// AD BANNER SYSTEM — Game ads with animated SVG art + epic animations
// ============================================================

// Animated inline SVG logos — 100% reliable, no CORS, rich art
const SVG_LOGOS = {
  ml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="mlg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0a3a8c"/><stop offset="100%" stop-color="#00c8ff"/></linearGradient>
      <linearGradient id="mlg2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ffd700"/><stop offset="100%" stop-color="#ffaa00"/></linearGradient>
      <filter id="mlglow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="100" height="100" rx="16" fill="#020d2e"/>
    <circle cx="50" cy="50" r="42" fill="none" stroke="url(#mlg1)" stroke-width="2" opacity="0.6"/>
    <polygon points="50,12 88,34 88,66 50,88 12,66 12,34" fill="url(#mlg1)" opacity="0.15"/>
    <polygon points="50,12 88,34 88,66 50,88 12,66 12,34" fill="none" stroke="url(#mlg2)" stroke-width="1.5"/>
    <path d="M30,55 L45,35 L50,42 L55,35 L70,55 L62,55 L58,47 L50,58 L42,47 L38,55 Z" fill="url(#mlg2)" filter="url(#mlglow)"/>
    <text x="50" y="80" text-anchor="middle" fill="#ffd700" font-size="8" font-family="Arial Black,sans-serif" letter-spacing="2" opacity="0.9">MOBILE LEGENDS</text>
  </svg>`,

  pubg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="pg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f5a623"/><stop offset="100%" stop-color="#c85000"/></linearGradient>
      <filter id="pglow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="100" height="100" rx="8" fill="#0d0800"/>
    <rect x="6" y="6" width="88" height="88" rx="6" fill="none" stroke="#f5a623" stroke-width="1.5" opacity="0.5"/>
    <circle cx="50" cy="38" r="16" fill="none" stroke="url(#pg1)" stroke-width="3" filter="url(#pglow)"/>
    <circle cx="50" cy="38" r="8" fill="#f5a623" opacity="0.3"/>
    <circle cx="50" cy="38" r="3" fill="#f5a623"/>
    <rect x="46" y="52" width="8" height="18" rx="3" fill="url(#pg1)"/>
    <rect x="36" y="56" width="28" height="4" rx="2" fill="url(#pg1)"/>
    <text x="50" y="83" text-anchor="middle" fill="#f5a623" font-size="11" font-family="Arial Black,sans-serif" font-weight="900" letter-spacing="3">PUBG</text>
    <text x="50" y="93" text-anchor="middle" fill="#888" font-size="7" font-family="Arial,sans-serif" letter-spacing="2">MOBILE</text>
  </svg>`,

  ff: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="ffg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff2200"/><stop offset="100%" stop-color="#ffcc00"/></linearGradient>
      <filter id="ffglow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="100" height="100" fill="#100000"/>
    <polygon points="50,5 95,27 95,73 50,95 5,73 5,27" fill="none" stroke="url(#ffg1)" stroke-width="2"/>
    <polygon points="50,18 82,34 82,66 50,82 18,66 18,34" fill="#ff220011"/>
    <text x="50" y="52" text-anchor="middle" fill="url(#ffg1)" font-size="32" font-family="Arial Black,sans-serif" font-weight="900" filter="url(#ffglow)">FF</text>
    <text x="50" y="68" text-anchor="middle" fill="#ffcc00" font-size="9" font-family="Arial Black,sans-serif" letter-spacing="2">FREE FIRE</text>
    <rect x="30" y="72" width="40" height="2" fill="url(#ffg1)" rx="1"/>
    <text x="50" y="86" text-anchor="middle" fill="#ff6600" font-size="8" font-family="Arial,sans-serif" letter-spacing="2">MAX</text>
  </svg>`,

  val: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="vg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ff4655"/><stop offset="100%" stop-color="#ff0018"/></linearGradient>
      <filter id="vglow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="100" height="100" fill="#050000"/>
    <path d="M50,8 L92,28 L92,55 L50,92 L8,55 L8,28 Z" fill="none" stroke="#ff4655" stroke-width="1.5" opacity="0.7"/>
    <path d="M50,22 L50,78 L22,52 Z" fill="url(#vg1)" opacity="0.9" filter="url(#vglow)"/>
    <path d="M50,22 L78,52 L50,78 Z" fill="#ff465533" opacity="0.6"/>
    <rect x="10" y="62" width="35" height="2" fill="#ff4655" rx="1"/>
    <rect x="55" y="62" width="35" height="2" fill="#00e5ff" rx="1"/>
    <text x="50" y="92" text-anchor="middle" fill="#ff4655" font-size="9" font-family="Arial Black,sans-serif" letter-spacing="2">VALORANT</text>
  </svg>`,

  cr: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="crg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#c084fc"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient>
      <filter id="crglow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="100" height="100" rx="18" fill="#06000e"/>
    <rect x="5" y="5" width="90" height="90" rx="14" fill="none" stroke="url(#crg1)" stroke-width="2"/>
    <polygon points="50,12 60,35 85,35 65,52 72,76 50,62 28,76 35,52 15,35 40,35" fill="url(#crg1)" opacity="0.2"/>
    <polygon points="50,12 60,35 85,35 65,52 72,76 50,62 28,76 35,52 15,35 40,35" fill="none" stroke="#fbbf24" stroke-width="1.5" filter="url(#crglow)"/>
    <text x="50" y="57" text-anchor="middle" fill="#fbbf24" font-size="18" font-family="serif">♛</text>
    <text x="50" y="85" text-anchor="middle" fill="#c084fc" font-size="8" font-family="Arial Black,sans-serif" letter-spacing="1">CLASH ROYALE</text>
  </svg>`,
}

// Convert SVG to data URL
const svgToUrl = svg => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

const DEFAULT_ADS = [
  {
    id:'ml',game:'Mobile Legends: Bang Bang',
    logo: svgToUrl(SVG_LOGOS.ml),
    tagline:'Jadilah Legenda Sejati di Arena!',
    sub:'5v5 MOBA · Terpopuler Asia · 1 Milyar+ Download',
    cta:'Main Sekarang',
    color:'#1a6fd4',accent:'#ffd700',
    bg:'linear-gradient(135deg,#010818 0%,#061845 40%,#0a2060 70%,#030f2e 100%)',
    particles:['#ffd700','#00aaff','#ffffff'],
    url:'https://mobilelegends.com'
  },
  {
    id:'pubg',game:'PUBG Mobile',
    logo: svgToUrl(SVG_LOGOS.pubg),
    tagline:'100 Players. 1 Winner. Are You Ready?',
    sub:'Battle Royale #1 di Dunia · Gratis',
    cta:'Drop In Now',
    color:'#f5a623',accent:'#ff6b00',
    bg:'linear-gradient(135deg,#0a0500 0%,#1f0e00 40%,#2a1400 70%,#0d0700 100%)',
    particles:['#ff6b00','#ffd700','#ff4400'],
    url:'https://pubgmobile.com'
  },
  {
    id:'ff',game:'Free Fire MAX',
    logo: svgToUrl(SVG_LOGOS.ff),
    tagline:'Survive. Eliminate. Be The Last!',
    sub:'48 Pemain · 10 Menit · 1 Juara · Gratis',
    cta:'Main Gratis',
    color:'#ff4400',accent:'#ffcc00',
    bg:'linear-gradient(135deg,#0e0000 0%,#2a0000 40%,#3d0500 70%,#120000 100%)',
    particles:['#ff4400','#ffcc00','#ff8800'],
    url:'https://garena.com/freefire'
  },
  {
    id:'val',game:'Valorant',
    logo: svgToUrl(SVG_LOGOS.val),
    tagline:'Lock In. Execute. Dominate.',
    sub:'5v5 Tactical Shooter · PC · Gratis',
    cta:'Play Free',
    color:'#ff4655',accent:'#00e5ff',
    bg:'linear-gradient(135deg,#050000 0%,#160004 40%,#1a0005 70%,#080000 100%)',
    particles:['#ff4655','#00e5ff','#ffffff'],
    url:'https://playvalorant.com'
  },
  {
    id:'cr',game:'Clash Royale',
    logo: svgToUrl(SVG_LOGOS.cr),
    tagline:'Battle Players Around the World!',
    sub:'Real-time PvP Card Strategy · Supercell',
    cta:'Play Now',
    color:'#a855f7',accent:'#fbbf24',
    bg:'linear-gradient(135deg,#06000e 0%,#12003a 40%,#1a0050 70%,#080015 100%)',
    particles:['#a855f7','#fbbf24','#e879f9'],
    url:'https://clashroyale.com'
  },
]

const AD_STORAGE_KEY = 'arenagg_custom_ads'
function getCustomAds(){try{return JSON.parse(localStorage.getItem(AD_STORAGE_KEY)||'[]')}catch(e){return[]}}
function saveCustomAds(ads){try{localStorage.setItem(AD_STORAGE_KEY,JSON.stringify(ads))}catch(e){}}

// Floating particles for ad banner
function AdParticles({colors=[]}) {
  const pts = Array.from({length:8},(_,i)=>({
    id:i,
    color:colors[i%colors.length]||'#fff',
    size: 2+Math.random()*3,
    x: 5+Math.random()*90,
    dur: 3+Math.random()*4,
    delay: Math.random()*4,
    drift: -20+Math.random()*40,
  }))
  return <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
    {pts.map(p=>(
      <div key={p.id} style={{
        position:'absolute',
        left:p.x+'%',
        bottom:'-10px',
        width:p.size+'px',
        height:p.size+'px',
        borderRadius:'50%',
        background:p.color,
        opacity:0.7,
        boxShadow:`0 0 ${p.size*2}px ${p.color}`,
        animation:`ad-float-up ${p.dur}s ${p.delay}s ease-in infinite`,
      }}/>
    ))}
  </div>
}

// Inject ad-specific keyframes once
const AD_KEYFRAMES = `
@keyframes ad-float-up{0%{transform:translateY(0) translateX(0);opacity:0.8}50%{opacity:0.5}100%{transform:translateY(-120px) translateX(var(--dx,20px));opacity:0}}
@keyframes ad-slide-in{from{opacity:0;transform:translateX(32px) scale(0.97)}to{opacity:1;transform:translateX(0) scale(1)}}
@keyframes ad-logo-pop{0%{transform:scale(0.8) rotate(-4deg);opacity:0}60%{transform:scale(1.08) rotate(1deg)}100%{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes ad-glow-pulse{0%,100%{box-shadow:0 0 20px var(--ad-glow,#ffd700),0 0 40px var(--ad-glow,#ffd700)33}50%{box-shadow:0 0 35px var(--ad-glow,#ffd700),0 0 70px var(--ad-glow,#ffd700)55,0 0 100px var(--ad-glow,#ffd700)22}}
@keyframes ad-shimmer{0%{left:-100%}100%{left:200%}}
@keyframes ad-ticker-in{from{transform:translateX(-16px);opacity:0}to{transform:translateX(0);opacity:1}}
@keyframes ad-cta-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
`
if(!document.getElementById('ad-keyframes')){const s=document.createElement('style');s.id='ad-keyframes';s.textContent=AD_KEYFRAMES;document.head.appendChild(s)}

function AdBanner({compact=false}){
  const customAds = getCustomAds()
  const allAds = [...DEFAULT_ADS, ...customAds.filter(a=>a.active)]
  const[current,setCurrent]=useState(0)
  const[prev,setPrev]=useState(null)
  const[paused,setPaused]=useState(false)
  const[animKey,setAnimKey]=useState(0)
  const[logoErr,setLogoErr]=useState({})

  useEffect(()=>{
    if(paused||allAds.length<=1)return
    const t=setInterval(()=>{
      setCurrent(c=>{
        setPrev(c)
        setAnimKey(k=>k+1)
        return(c+1)%allAds.length
      })
    },4500)
    return()=>clearInterval(t)
  },[paused,allAds.length])

  const goTo=(i)=>{setPrev(current);setCurrent(i);setAnimKey(k=>k+1)}

  const ad = allAds[current]
  if(!ad)return null
  const isCustom=ad.isCustom

  // ── COMPACT MODE (top ticker bar) ──────────────────────────
  if(compact){
    return <div style={{background:ad.bg||'#0d1b4b',borderBottom:'1px solid rgba(255,255,255,0.07)',padding:'6px 20px',display:'flex',alignItems:'center',gap:10,overflow:'hidden',position:'relative',minHeight:34}}>
      {/* shimmer sweep */}
      <div style={{position:'absolute',top:0,width:'40%',height:'100%',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)',animation:'ad-shimmer 3s linear infinite',pointerEvents:'none'}}/>
      {/* AD badge */}
      <span style={{fontFamily:'var(--fh)',fontSize:7,color:'rgba(255,255,255,0.35)',letterSpacing:2,padding:'1px 5px',border:'1px solid rgba(255,255,255,0.1)',borderRadius:2,flexShrink:0}}>AD</span>
      {/* Logo or emoji */}
      <div style={{width:20,height:20,borderRadius:4,overflow:'hidden',flexShrink:0,background:'rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        {ad.logo&&!logoErr[ad.id]
          ?<img src={ad.logo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt={ad.game} onError={()=>setLogoErr(e=>({...e,[ad.id]:true}))}/>
          :<span style={{fontSize:12}}>{ad.emoji||'🎮'}</span>
        }
      </div>
      {/* Game name */}
      <span key={'n'+animKey} style={{fontFamily:'var(--fh)',fontSize:10,color:ad.accent||'#ffd700',letterSpacing:1,fontWeight:700,flexShrink:0,animation:'ad-ticker-in 0.35s ease both'}}>{ad.game}</span>
      <span style={{fontSize:10,color:'rgba(255,255,255,0.6)',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ad.tagline}</span>
      <a href={ad.url||'#'} target="_blank" rel="noreferrer"
        style={{flexShrink:0,padding:'3px 11px',background:ad.accent||'#ffd700',color:'#000',borderRadius:3,fontFamily:'var(--fh)',fontSize:8,fontWeight:900,letterSpacing:1,textDecoration:'none',animation:'ad-cta-pulse 2.5s ease infinite'}}>
        {ad.cta}
      </a>
      {/* Progress dots */}
      <div style={{display:'flex',gap:3,flexShrink:0}}>
        {allAds.map((_,i)=><div key={i} onClick={()=>goTo(i)}
          style={{width:i===current?14:5,height:4,borderRadius:2,background:i===current?ad.accent||'#fff':'rgba(255,255,255,0.18)',cursor:'pointer',transition:'all 0.4s ease'}}/>)}
      </div>
    </div>
  }

  // ── FULL BANNER ─────────────────────────────────────────────
  return <div
    onMouseEnter={()=>setPaused(true)}
    onMouseLeave={()=>setPaused(false)}
    style={{
      background:ad.bg||'linear-gradient(135deg,#0d1b4b,#1a3a7a)',
      borderRadius:14,
      border:`1.5px solid ${ad.accent||'#ffd700'}44`,
      padding:'0',
      marginBottom:18,
      boxShadow:`0 8px 40px rgba(0,0,0,0.6), 0 0 60px ${ad.accent||'#ffd700'}15`,
      position:'relative',
      overflow:'hidden',
      cursor:'pointer',
      minHeight:90,
      '--ad-glow':ad.accent||'#ffd700',
    }}
    onClick={()=>ad.url&&window.open(ad.url,'_blank','noopener')}
  >
    {/* Floating particles */}
    <AdParticles colors={ad.particles||[ad.accent||'#ffd700']}/>

    {/* Shimmer sweep */}
    <div style={{position:'absolute',top:0,width:'35%',height:'100%',background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)',animation:'ad-shimmer 4s linear infinite',pointerEvents:'none',zIndex:1}}/>

    {/* Top accent line */}
    <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${ad.accent||'#ffd700'},${ad.color||'#1a6fd4'},transparent)`,opacity:0.8}}/>

    {/* Main content */}
    <div key={animKey} style={{display:'flex',alignItems:'center',gap:16,padding:'14px 18px 18px',animation:'ad-slide-in 0.45s cubic-bezier(0.22,1,0.36,1) both',position:'relative',zIndex:2}}>

      {/* Game Logo */}
      <div style={{
        width:66,height:66,borderRadius:14,overflow:'hidden',flexShrink:0,
        background:`linear-gradient(135deg,${ad.color||'#1a6fd4'}44,${ad.accent||'#ffd700'}22)`,
        border:`1.5px solid ${ad.accent||'#ffd700'}44`,
        display:'flex',alignItems:'center',justifyContent:'center',
        animation:'ad-logo-pop 0.5s cubic-bezier(0.22,1,0.36,1) both',
        animationDelay:'0.05s',
        boxShadow:`0 0 22px ${ad.color||'#1a6fd4'}55`,
      }}>
        {ad.logo&&!logoErr[ad.id]
          ?<img src={ad.logo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt={ad.game}
              onError={()=>setLogoErr(e=>({...e,[ad.id]:true}))}/>
          :<span style={{fontSize:30}}>{ad.emoji||'🎮'}</span>
        }
      </div>

      {/* Text content */}
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:4}}>
          <span style={{fontFamily:'var(--fh)',fontSize:8,color:ad.accent||'#ffd700',letterSpacing:2,opacity:0.8}}>🎮 GAME AD</span>
          {isCustom&&<span style={{fontFamily:'var(--fh)',fontSize:7,color:ad.accent||'#ffd700',background:`${ad.accent||'#ffd700'}18`,padding:'1px 5px',borderRadius:2,border:`1px solid ${ad.accent||'#ffd700'}33`}}>SPONSOR</span>}
        </div>
        <div style={{fontFamily:'var(--fm)',fontSize:10,color:ad.accent||'#ffd700',letterSpacing:1.5,marginBottom:3,fontWeight:700}}>{ad.game.toUpperCase()}</div>
        <div style={{fontFamily:'var(--fh)',fontSize:16,fontWeight:900,color:'#fff',marginBottom:4,lineHeight:1.2,textShadow:`0 0 20px ${ad.accent||'#ffd700'}44`}}>{ad.tagline}</div>
        <div style={{fontSize:10,color:'rgba(255,255,255,0.55)'}}>{ad.sub||ad.description}</div>
      </div>

      {/* CTA */}
      <div style={{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        <div style={{
          padding:'10px 18px',
          background:`linear-gradient(135deg,${ad.accent||'#ffd700'},${ad.color||'#1a6fd4'})`,
          color:'#000',borderRadius:8,
          fontFamily:'var(--fh)',fontSize:9,fontWeight:900,letterSpacing:1.5,
          boxShadow:`0 4px 18px ${ad.accent||'#ffd700'}55`,
          whiteSpace:'nowrap',
          animation:'ad-cta-pulse 2s ease infinite',
          animationDelay:'1s',
        }}>{ad.cta}</div>
        {/* Dots */}
        <div style={{display:'flex',gap:4}}>
          {allAds.map((_,i)=>(
            <div key={i} onClick={e=>{e.stopPropagation();goTo(i)}}
              style={{width:i===current?14:5,height:5,borderRadius:3,background:i===current?ad.accent||'#ffd700':'rgba(255,255,255,0.2)',cursor:'pointer',transition:'all 0.4s cubic-bezier(0.4,0,0.2,1)',boxShadow:i===current?`0 0 8px ${ad.accent||'#ffd700'}`:'none'}}/>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom glow line */}
    <div style={{position:'absolute',bottom:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${ad.color||'#1a6fd4'},${ad.accent||'#ffd700'},transparent)`,opacity:0.4}}/>
  </div>
}

// Ad Manager for Settings
function AdManager({toast}){
  const[ads,setAds]=useState(getCustomAds)
  const[form,setForm]=useState({name:'',tagline:'',description:'',url:'',cta:'Kunjungi',emoji:'🎮',color:'#00e5ff',accent:'#ffd700',active:true})
  const[showForm,setShowForm]=useState(false)
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}))
  
  const save=()=>{
    if(!form.name||!form.tagline){toast('Nama & tagline wajib!','error');return}
    const newAd={...form,id:'custom_'+Date.now(),isCustom:true,game:form.name,bg:`linear-gradient(135deg,${form.color}22,${form.accent}11)`}
    const updated=[...ads,newAd]
    setAds(updated);saveCustomAds(updated)
    setForm({name:'',tagline:'',description:'',url:'',cta:'Kunjungi',emoji:'🎮',color:'#00e5ff',accent:'#ffd700',active:true})
    setShowForm(false)
    toast('✓ Iklan sponsor ditambahkan!','success')
  }
  
  const toggle=(id)=>{
    const updated=ads.map(a=>a.id===id?{...a,active:!a.active}:a)
    setAds(updated);saveCustomAds(updated)
  }
  
  const remove=(id)=>{
    const updated=ads.filter(a=>a.id!==id)
    setAds(updated);saveCustomAds(updated)
    toast('Iklan dihapus','info')
  }
  
  return <div>
    <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:2,marginBottom:12}}>📺 SLOT IKLAN AKTIF</div>
    
    {/* Default ads list */}
    <div style={{marginBottom:14}}>
      <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:1,marginBottom:8}}>IKLAN BAWAAN (AUTO)</div>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        {DEFAULT_ADS.map(ad=>(
          <div key={ad.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',background:'rgba(255,255,255,0.03)',borderRadius:7,border:'1px solid var(--border)'}}>
            <span style={{fontSize:18}}>{ad.emoji||'🎮'}</span>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600}}>{ad.game}</div><div style={{fontSize:10,color:'var(--muted)'}}>{ad.tagline}</div></div>
            <span className="tag tag-active" style={{fontSize:8}}>● AKTIF</span>
          </div>
        ))}
      </div>
    </div>
    
    {/* Custom sponsor ads */}
    {ads.length>0&&<div style={{marginBottom:14}}>
      <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--orange)',letterSpacing:1,marginBottom:8}}>IKLAN SPONSOR KAMU</div>
      {ads.map(ad=>(
        <div key={ad.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',background:'rgba(255,107,0,0.05)',borderRadius:7,border:'1px solid rgba(255,107,0,0.2)',marginBottom:6}}>
          <span style={{fontSize:18}}>{ad.emoji||'🎮'}</span>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:700}}>{ad.game}</div>
            <div style={{fontSize:10,color:'var(--muted)'}}>{ad.tagline}</div>
          </div>
          <button onClick={()=>toggle(ad.id)} style={{background:'none',border:'none',cursor:'pointer',fontSize:18}}>{ad.active?'✅':'⬜'}</button>
          <button onClick={()=>remove(ad.id)} className="btn btn-danger btn-sm" style={{padding:'3px 8px',fontSize:9}}>✕</button>
        </div>
      ))}
    </div>}
    
    {/* Add Sponsor Form */}
    {!showForm
      ?<button className="btn btn-orange btn-full" onClick={()=>setShowForm(true)} style={{fontSize:10}}>＋ TAMBAH IKLAN SPONSOR</button>
      :<div style={{background:'rgba(255,107,0,0.04)',border:'1px solid rgba(255,107,0,0.25)',borderRadius:10,padding:'16px 14px'}}>
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--orange)',letterSpacing:1,marginBottom:14}}>📢 IKLAN SPONSOR BARU</div>
        <div className="g2" style={{marginBottom:10}}>
          <div><label>Nama Brand / Game *</label><input value={form.name} onChange={set('name')} placeholder="Misal: Garena FF"/></div>
          <div><label>Emoji</label><input value={form.emoji} onChange={set('emoji')} style={{width:60}}/></div>
        </div>
        <div style={{marginBottom:10}}><label>Tagline *</label><input value={form.tagline} onChange={set('tagline')} placeholder="Kalimat iklan singkat..."/></div>
        <div style={{marginBottom:10}}><label>Deskripsi (opsional)</label><input value={form.description} onChange={set('description')} placeholder="Info tambahan..."/></div>
        <div className="g2" style={{marginBottom:10}}>
          <div><label>URL Tujuan</label><input value={form.url} onChange={set('url')} placeholder="https://..."/></div>
          <div><label>Teks Tombol</label><input value={form.cta} onChange={set('cta')} placeholder="Kunjungi"/></div>
        </div>
        <div className="g2" style={{marginBottom:14}}>
          <div><label>Warna Utama</label><input type="color" value={form.color} onChange={set('color')} style={{height:36,padding:'4px 8px',cursor:'pointer'}}/></div>
          <div><label>Warna Aksen</label><input type="color" value={form.accent} onChange={set('accent')} style={{height:36,padding:'4px 8px',cursor:'pointer'}}/></div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-orange" onClick={save} style={{flex:1,justifyContent:'center'}}>💾 Simpan Iklan</button>
          <button className="btn btn-ghost" onClick={()=>setShowForm(false)}>Batal</button>
        </div>
      </div>
    }
  </div>
}



// ============================================================
// LIVE MATCH SYSTEM — Live Score, Chat, Shareable Link
// ============================================================

// --- Supabase realtime chat helpers ---
const CHAT_KEY_PREFIX = 'arenagg_chat_'
function getChatHistory(tournId){try{return JSON.parse(localStorage.getItem(CHAT_KEY_PREFIX+tournId)||'[]')}catch(e){return[]}}
function saveChatHistory(tournId,msgs){try{localStorage.setItem(CHAT_KEY_PREFIX+tournId,JSON.stringify(msgs.slice(-200)))}catch(e){}}

// --- Score storage helpers ---
const SCORES_KEY = 'arenagg_scores'
function getScores(){try{return JSON.parse(localStorage.getItem(SCORES_KEY)||'{}')}catch(e){return{}}}
function saveScores(s){try{localStorage.setItem(SCORES_KEY,JSON.stringify(s))}catch(e){}}

// Supabase score sync (fire & forget)
async function syncScoresToSupabase(tournamentId, scores){
  try{
    const entries = Object.entries(scores)
    if(!entries.length) return
    const rows = entries.map(([match_key, score]) => ({tournament_id:tournamentId,match_key,score}))
    await supabase.from('match_scores').upsert(rows, {onConflict:'tournament_id,match_key'})
  }catch(e){}
}
async function loadScoresFromSupabase(tournamentId){
  try{
    const {data} = await supabase.from('match_scores').select('match_key,score').eq('tournament_id',tournamentId)
    if(data?.length){ const s={}; data.forEach(r=>{s[r.match_key]=r.score}); return s }
  }catch(e){}
  return null
}
// Payment submission to Supabase
async function submitPaymentSupa(teamId, tournamentId, payload){
  try{
    const {error} = await supabase.from('payment_submissions').insert({
      team_id:teamId, tournament_id:tournamentId,
      method:payload.method, proof:payload.proof, note:payload.note||'',
      amount:payload.amount, status:'pending'
    })
    return !error
  }catch(e){ return false }
}

// Live status badge component
function LiveStatusBadge({status,size='sm'}){
  if(status==='live') return <span style={{display:'inline-flex',alignItems:'center',gap:4,padding:size==='lg'?'4px 10px':'2px 7px',background:'rgba(255,45,85,0.15)',border:'1px solid rgba(255,45,85,0.4)',borderRadius:4,fontFamily:'var(--fh)',fontSize:size==='lg'?11:9,color:'var(--red)',fontWeight:900,letterSpacing:1,animation:'flicker 2s infinite'}}><span style={{width:6,height:6,borderRadius:'50%',background:'var(--red)',animation:'pulse 0.8s infinite',display:'inline-block'}}/>LIVE</span>
  if(status==='active') return <span style={{display:'inline-flex',alignItems:'center',gap:4,padding:'2px 7px',background:'rgba(0,255,136,0.1)',border:'1px solid rgba(0,255,136,0.2)',borderRadius:4,fontFamily:'var(--fh)',fontSize:9,color:'var(--green)'}}><span style={{width:5,height:5,borderRadius:'50%',background:'var(--green)',display:'inline-block'}}/>AKTIF</span>
  return <span className={`tag tag-${status}`}>{status}</span>
}

// ============================================================
// LIVE MATCH VIEW — Score tracker, bracket, share link
// ============================================================
function LiveMatchView({tournament,teams,toast,onBack}){
  const t = tournament
  const[scores,setScores]=useState(()=>{const s=getScores();return s[t?.id]||{}})
  // Load fresh scores from Supabase on mount
  useEffect(()=>{
    if(!t?.id) return
    loadScoresFromSupabase(t.id).then(s=>{
      if(s && Object.keys(s).length>0){
        setScores(s)
        const all=getScores(); all[t.id]=s; saveScores(all)
      }
    })
    // Realtime subscription for score updates
    const ch = supabase.channel('scores-'+t.id)
      .on('postgres_changes',{event:'*',schema:'public',table:'match_scores',filter:`tournament_id=eq.${t.id}`},
        async()=>{
          const fresh=await loadScoresFromSupabase(t.id)
          if(fresh) setScores({...fresh})
        }
      ).subscribe()
    return()=>supabase.removeChannel(ch)
  },[t?.id])
  const[chatMsg,setChatMsg]=useState('')
  const[chatHistory,setChatHistory]=useState(()=>getChatHistory(t?.id||''))
  const[chatName,setChatName]=useState(()=>{try{return localStorage.getItem('arenagg_chat_name')||''}catch(e){return''}})
  const[nameInput,setNameInput]=useState('')
  const[activeTab,setActiveTab]=useState('score') // score | chat | info
  const[copied,setCopied]=useState(false)
  const chatEndRef = {current:null}
  // Match timer
  const[timerRunning,setTimerRunning]=useState(false)
  const[timerSec,setTimerSec]=useState(0)
  const[timerMatchId,setTimerMatchId]=useState(null)
  React.useEffect(()=>{
    if(!timerRunning)return
    const iv=setInterval(()=>setTimerSec(s=>s+1),1000)
    return()=>clearInterval(iv)
  },[timerRunning])
  const fmtTimer=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`
  const startTimer=(matchId)=>{setTimerMatchId(matchId);setTimerSec(0);setTimerRunning(true)}
  const stopTimer=()=>setTimerRunning(false)

  // Build match pairs from teams
  const tTeams = teams.filter(x=>x.tournament_id===t?.id)
  const pairs = []
  for(let i=0;i<Math.min(tTeams.length,16);i+=2){
    pairs.push({id:'m'+i,a:tTeams[i],b:tTeams[i+1],scoreA:scores['m'+i+'_a']||0,scoreB:scores['m'+i+'_b']||0})
  }

  // Persist scores to localStorage + Supabase
  const updateScore=(matchId,side,val)=>{
    const newS={...scores,[`${matchId}_${side}`]:Math.max(0,val)}
    setScores(newS)
    const all=getScores()
    all[t.id]=newS
    saveScores(all)
    syncScoresToSupabase(t.id, newS) // sync to Supabase
    // Broadcast to other tabs/windows
    try{window.dispatchEvent(new StorageEvent('storage',{key:SCORES_KEY}))}catch(e){}
  }

  // Chat: send message
  const sendChat=()=>{
    if(!chatMsg.trim()||!chatName)return
    const msg={id:Date.now(),name:chatName,text:chatMsg.trim(),time:new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}),isOrg:true}
    const updated=[...chatHistory,msg]
    setChatHistory(updated)
    saveChatHistory(t.id,updated)
    setChatMsg('')
  }

  // Share link
  const shareLink = `${window.location.origin}/#/live/${t?.id}`
  const copyLink=()=>{
    const fb=()=>{const el=document.createElement('textarea');el.value=shareLink;el.style.cssText='position:fixed;opacity:0';document.body.appendChild(el);el.select();document.execCommand('copy');document.body.removeChild(el)}
    if(navigator.clipboard)navigator.clipboard.writeText(shareLink).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);toast('✓ Link live disalin!','success')}).catch(fb)
    else{fb();setCopied(true);setTimeout(()=>setCopied(false),2000)}
  }

  // Share WA
  const waText=encodeURIComponent(`🔴 SEDANG LIVE SEKARANG!\n⚔ ${t?.name}\n🎮 ${t?.game} · 📍 ${t?.city}\n🏆 Prize: Rp ${Number(t?.prize).toLocaleString('id-ID')}\n\n👉 Tonton di sini:\n${shareLink}`)

  if(!t) return <div className="animate-in" style={{padding:'24px 28px',textAlign:'center',color:'var(--muted)'}}><div style={{fontSize:40,marginBottom:12}}>📡</div><div>Turnamen tidak ditemukan</div><button className="btn btn-ghost" onClick={onBack} style={{marginTop:12}}>← Kembali</button></div>

  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    {/* HEADER */}
    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',gap:12}}>
      <div>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
          <button onClick={onBack} style={{background:'none',border:'none',color:'var(--muted)',cursor:'pointer',fontSize:18,padding:0,lineHeight:1}}>←</button>
          <LiveStatusBadge status={t.status} size="lg"/>
          <h1 style={{fontFamily:'var(--fh)',fontSize:16,fontWeight:900}}>{t.name}</h1>
        </div>
        <div style={{fontSize:11,color:'var(--muted)',marginLeft:28}}>🎮 {t.game} · 📍 {t.city} · 🏆 {`Rp ${Number(t.prize).toLocaleString('id-ID')}`} · 👥 {tTeams.length} Tim</div>
      </div>
      {/* SHARE BUTTONS */}
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <button onClick={copyLink} className="btn btn-ghost btn-sm" style={{gap:5}}>{copied?'✓ Tersalin!':'🔗 Copy Link Live'}</button>
        <a href={`https://wa.me/?text=${waText}`} target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:5,padding:'5px 12px',background:'#25D366',borderRadius:6,color:'white',textDecoration:'none',fontFamily:'var(--fh)',fontSize:9,fontWeight:700,letterSpacing:1,boxShadow:'0 4px 12px rgba(37,211,102,0.25)'}}>📱 Share WA</a>
        <button className="btn btn-danger btn-sm" style={{animation:t.status==='live'?'pulse 2s infinite':'none'}} onClick={()=>toast('Update status di halaman Turnamen','info')}>🔴 {t.status==='live'?'SEDANG LIVE':'SET LIVE'}</button>
      </div>
    </div>

    {/* SHAREABLE LINK BOX */}
    <div style={{background:'rgba(0,229,255,0.04)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:9,padding:'10px 14px',display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
      <span style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:1,flexShrink:0}}>🔗 LINK LIVE</span>
      <span style={{flex:1,fontFamily:'var(--fm)',fontSize:10,color:'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{shareLink}</span>
      <button onClick={copyLink} className="btn btn-cyan btn-sm">{copied?'✓':'SALIN'}</button>
    </div>

    {/* TABS */}
    <div style={{display:'flex',gap:4,background:'rgba(255,255,255,0.04)',padding:4,borderRadius:8,border:'1px solid var(--border)',marginBottom:16,width:'fit-content'}}>
      {[{id:'score',icon:'⚡',label:'Skor Live'},{id:'chat',icon:'💬',label:'Obrolan Live'},{id:'info',icon:'ℹ',label:'Info'}].map(tab=>(
        <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{display:'flex',alignItems:'center',gap:5,padding:'7px 14px',border:'none',borderRadius:6,cursor:'pointer',fontFamily:'var(--fh)',fontSize:9,letterSpacing:1,transition:'var(--trans)',background:activeTab===tab.id?'var(--cyan)':'transparent',color:activeTab===tab.id?'#000':'var(--muted)',fontWeight:700}}>
          <span>{tab.icon}</span><span>{tab.label}</span>
          {tab.id==='chat'&&chatHistory.length>0&&<span style={{background:activeTab==='chat'?'rgba(0,0,0,0.15)':'rgba(0,229,255,0.2)',color:activeTab==='chat'?'#000':'var(--cyan)',padding:'0 5px',borderRadius:8,fontSize:8}}>{chatHistory.length}</span>}
        </button>
      ))}
    </div>

    {/* SCORE TAB */}
    {activeTab==='score'&&<div>
      {pairs.length===0
        ?<div className="card" style={{textAlign:'center',padding:'32px',color:'var(--muted)'}}><div style={{fontSize:40,marginBottom:12,animation:'float 3s ease-in-out infinite'}}>⚡</div><div style={{fontFamily:'var(--fh)',fontSize:11,letterSpacing:2}}>BELUM ADA TIM TERDAFTAR</div><div style={{fontSize:11,marginTop:8}}>Tambah tim di menu Peserta terlebih dahulu</div></div>
        :<div style={{display:'flex',flexDirection:'column',gap:10}}>
          {pairs.map((match,idx)=>(
            <div key={match.id} className="card" style={{padding:16,borderColor:match.scoreA>match.scoreB?'rgba(0,255,136,0.2)':match.scoreB>match.scoreA?'rgba(0,229,255,0.2)':'var(--border)'}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10,justifyContent:'space-between'}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1}}>MATCH {idx+1}</span>
                  {(match.scoreA>0||match.scoreB>0)&&<span className="tag tag-live" style={{fontSize:8,padding:'1px 6px'}}>● BERMAIN</span>}
                </div>
                <div style={{display:'flex',alignItems:'center',gap:6}}>
                  {timerRunning&&timerMatchId===match.id&&<span style={{fontFamily:'var(--fm)',fontSize:12,color:'var(--red)',letterSpacing:2,fontWeight:700,animation:'pulse 1s infinite'}}>⏱ {fmtTimer(timerSec)}</span>}
                  {timerRunning&&timerMatchId===match.id
                    ?<button onClick={stopTimer} style={{background:'rgba(255,45,85,0.1)',border:'1px solid rgba(255,45,85,0.3)',borderRadius:4,padding:'2px 8px',cursor:'pointer',fontFamily:'var(--fm)',fontSize:8,color:'var(--red)'}}>■ Stop</button>
                    :<button onClick={()=>startTimer(match.id)} style={{background:'rgba(0,229,255,0.08)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:4,padding:'2px 8px',cursor:'pointer',fontFamily:'var(--fm)',fontSize:8,color:'var(--cyan)'}}>▶ Timer</button>}
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:8,alignItems:'center'}}>
                {/* TEAM A */}
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:14,fontWeight:700,marginBottom:6,color:match.scoreA>match.scoreB?'var(--green)':'var(--text)'}}>{match.a?.name||<span style={{color:'var(--muted)',fontStyle:'italic'}}>BYE</span>}</div>
                  <div style={{fontSize:10,color:'var(--muted)'}}>👤 {match.a?.captain||'—'}</div>
                </div>
                {/* SCORE */}
                <div style={{textAlign:'center',padding:'0 8px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:6}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                      <button onClick={()=>updateScore(match.id,'a',match.scoreA+1)} style={{width:28,height:28,borderRadius:6,background:'rgba(0,255,136,0.1)',border:'1px solid rgba(0,255,136,0.2)',color:'var(--green)',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>+</button>
                      <div style={{fontFamily:'var(--fh)',fontSize:'clamp(24px,5vw,36px)',fontWeight:900,color:match.scoreA>match.scoreB?'var(--green)':'var(--text)',lineHeight:1,minWidth:40,textAlign:'center',textShadow:match.scoreA>match.scoreB?'0 0 20px rgba(0,255,136,0.5)':'none',transition:'all 0.2s'}}>{match.scoreA}</div>
                      <button onClick={()=>updateScore(match.id,'a',match.scoreA-1)} style={{width:28,height:28,borderRadius:6,background:'rgba(255,45,85,0.08)',border:'1px solid rgba(255,45,85,0.15)',color:'var(--red)',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
                    </div>
                    <div style={{fontFamily:'var(--fh)',fontSize:14,color:'var(--muted)',fontWeight:700}}>VS</div>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
                      <button onClick={()=>updateScore(match.id,'b',match.scoreB+1)} style={{width:28,height:28,borderRadius:6,background:'rgba(0,255,136,0.1)',border:'1px solid rgba(0,255,136,0.2)',color:'var(--green)',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>+</button>
                      <div style={{fontFamily:'var(--fh)',fontSize:'clamp(24px,5vw,36px)',fontWeight:900,color:match.scoreB>match.scoreA?'var(--cyan)':'var(--text)',lineHeight:1,minWidth:40,textAlign:'center',textShadow:match.scoreB>match.scoreA?'0 0 20px rgba(0,229,255,0.5)':'none',transition:'all 0.2s'}}>{match.scoreB}</div>
                      <button onClick={()=>updateScore(match.id,'b',match.scoreB-1)} style={{width:28,height:28,borderRadius:6,background:'rgba(255,45,85,0.08)',border:'1px solid rgba(255,45,85,0.15)',color:'var(--red)',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>−</button>
                    </div>
                  </div>
                  {(match.scoreA!==match.scoreB)&&<div style={{fontSize:9,fontFamily:'var(--fm)',color:'var(--green)',marginTop:4,letterSpacing:1,textAlign:'center'}}>✓ {match.scoreA>match.scoreB?match.a?.name:match.b?.name} UNGGUL</div>}
                </div>
                {/* TEAM B */}
                <div>
                  <div style={{fontSize:14,fontWeight:700,marginBottom:6,color:match.scoreB>match.scoreA?'var(--cyan)':'var(--text)'}}>{match.b?.name||<span style={{color:'var(--muted)',fontStyle:'italic'}}>BYE</span>}</div>
                  <div style={{fontSize:10,color:'var(--muted)'}}>👤 {match.b?.captain||'—'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>}

    {/* CHAT TAB */}
    {activeTab==='chat'&&<div style={{display:'flex',flexDirection:'column',height:480}}>
      {!chatName
        ?<div className="card" style={{maxWidth:380,margin:'0 auto',textAlign:'center',padding:24}}>
          <div style={{fontSize:32,marginBottom:12}}>💬</div>
          <div style={{fontFamily:'var(--fh)',fontSize:12,marginBottom:8}}>MASUKKAN NAMA</div>
          <div style={{fontSize:11,color:'var(--muted)',marginBottom:16}}>Nama yang tampil di obrolan live</div>
          <input value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder="Nama kamu..." onKeyDown={e=>{if(e.key==='Enter'&&nameInput.trim()){setChatName(nameInput.trim());localStorage.setItem('arenagg_chat_name',nameInput.trim())}}} style={{marginBottom:12}}/>
          <button className="btn btn-cyan btn-full" onClick={()=>{if(nameInput.trim()){setChatName(nameInput.trim());localStorage.setItem('arenagg_chat_name',nameInput.trim())}}} disabled={!nameInput.trim()}>Masuk Obrolan →</button>
        </div>
        :<>
          {/* Chat messages */}
          <div style={{flex:1,overflow:'auto',display:'flex',flexDirection:'column',gap:8,padding:'0 4px',marginBottom:12}}>
            {chatHistory.length===0&&<div style={{textAlign:'center',padding:'40px 20px',color:'var(--muted)'}}><div style={{fontSize:32,marginBottom:8}}>💬</div><div style={{fontSize:11,fontFamily:'var(--fm)',letterSpacing:2}}>BELUM ADA PESAN</div><div style={{fontSize:11,marginTop:4}}>Mulai obrolan sekarang!</div></div>}
            {chatHistory.map(msg=>(
              <div key={msg.id} style={{display:'flex',gap:10,alignItems:'flex-start',animation:'slide-in 0.2s ease'}}>
                <div style={{width:30,height:30,borderRadius:'50%',background:`linear-gradient(135deg,var(--cyan),var(--orange))`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:11,color:'#000',flexShrink:0}}>{msg.name[0].toUpperCase()}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
                    <span style={{fontWeight:700,fontSize:12}}>{msg.name}</span>
                    {msg.isOrg&&<span style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--cyan)',background:'rgba(0,229,255,0.1)',padding:'1px 5px',borderRadius:3,letterSpacing:1}}>ORG</span>}
                    <span style={{fontSize:9,color:'var(--muted)',fontFamily:'var(--fm)'}}>{msg.time}</span>
                  </div>
                  <div style={{fontSize:13,lineHeight:1.5,background:'rgba(255,255,255,0.04)',borderRadius:'0 8px 8px 8px',padding:'7px 11px',border:'1px solid var(--border)',maxWidth:400}}>{msg.text}</div>
                </div>
              </div>
            ))}
            <div ref={el=>{chatEndRef.current=el}}/>
          </div>
          {/* Chat input */}
          <div style={{display:'flex',gap:8,background:'var(--panel)',borderTop:'1px solid var(--border)',paddingTop:12}}>
            <div style={{display:'flex',alignItems:'center',gap:5,padding:'4px 8px',background:'rgba(0,229,255,0.06)',borderRadius:6,border:'1px solid rgba(0,229,255,0.2)',flexShrink:0}}>
              <span style={{fontSize:11,fontWeight:700,color:'var(--cyan)'}}>{chatName}</span>
              <button onClick={()=>{setChatName('');setNameInput('')}} style={{background:'none',border:'none',cursor:'pointer',fontSize:11,color:'var(--muted)',padding:0,lineHeight:1}}>✕</button>
            </div>
            <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} placeholder="Tulis pesan..." onKeyDown={e=>e.key==='Enter'&&sendChat()} style={{flex:1}}/>
            <button onClick={sendChat} disabled={!chatMsg.trim()} className="btn btn-cyan" style={{padding:'8px 14px',fontSize:10}}>Kirim →</button>
          </div>
        </>
      }
    </div>}

    {/* INFO TAB */}
    {activeTab==='info'&&<div>
      <div className="g2" style={{gap:14}}>
        <div className="card">
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:14}}>INFO TURNAMEN</div>
          {[
            {label:'Nama',val:t.name},
            {label:'Game',val:t.game},
            {label:'Format',val:t.format},
            {label:'Kota',val:t.city},
            {label:'Tanggal',val:t.date+(t.time?' · ⏰ '+t.time+' WIB':'')},
            {label:'Jam Mulai',val:t.time?t.time+' WIB':'—'},
            {label:'Prize Pool',val:`Rp ${Number(t.prize).toLocaleString('id-ID')}`},
            {label:'Entry Fee',val:`Rp ${Number(t.entry).toLocaleString('id-ID')}/tim`},
            {label:'Slot',val:`${t.registered||0}/${t.slots} Tim`},
          ].map(s=>(
            <div key={s.label} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
              <span style={{fontFamily:'var(--fm)',fontSize:10,color:'var(--muted)'}}>{s.label}</span>
              <span style={{fontSize:12,fontWeight:600}}>{s.val}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:14}}>TIM TERDAFTAR ({tTeams.length})</div>
          {tTeams.length===0
            ?<div style={{color:'var(--muted)',fontSize:11,textAlign:'center',padding:20}}>Belum ada tim</div>
            :tTeams.map((tm,idx)=>(
              <div key={tm.id} style={{display:'flex',alignItems:'center',gap:10,padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                <div style={{width:28,height:28,borderRadius:7,background:'linear-gradient(135deg,var(--cyan),var(--orange))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:11,color:'#000',flexShrink:0}}>{idx+1}</div>
                <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600}}>{tm.name}</div><div style={{fontSize:10,color:'var(--muted)'}}>👤 {tm.captain}</div></div>
                {tm.paid&&<span className="tag tag-active" style={{fontSize:8}}>✓ LUNAS</span>}
              </div>
            ))
          }
        </div>
      </div>
    </div>}
  </div>
}

// ============================================================
// PUBLIC LIVE VIEW — shareable link untuk penonton luar
// ============================================================
function PublicLivePage({tid,onBack,toast}){
  const[t,setT]=useState(null)
  const[teams,setTeams]=useState([])
  const[scores,setScores]=useState({})
  const[chatMsg,setChatMsg]=useState('')
  const[chatHistory,setChatHistory]=useState([])
  const[chatName,setChatName]=useState(()=>{try{return localStorage.getItem('arenagg_chat_name')||''}catch(e){return''}})
  const[nameInput,setNameInput]=useState('')
  const[loading,setL]=useState(true)
  const[activeTab,setActiveTab]=useState('score')
  const[lang,setLangState]=useState(getLang())
  const i=T[lang]||T.id

  useEffect(()=>{
    if(!tid){setL(false);return}
    const load=async()=>{
      try{
        const[{data:td},{data:tms}]=await Promise.all([
          supabase.from('tournaments').select('*').eq('id',tid.trim()).single(),
          supabase.from('teams').select('*').eq('tournament_id',tid.trim()).order('created_at')
        ])
        if(td){setT(td);setTeams(tms||[])}
        // Load scores: try Supabase first, fallback to localStorage
        const supScores = await loadScoresFromSupabase(tid.trim())
        if(supScores && Object.keys(supScores).length > 0){
          setScores(supScores)
          // Also update localStorage cache
          const all=getScores(); all[tid.trim()]=supScores; saveScores(all)
        } else {
          const s=getScores(); if(s[tid.trim()])setScores(s[tid.trim()])
        }
        // Load chat
        setChatHistory(getChatHistory(tid.trim()))
      }catch(e){console.error(e)}
      setL(false)
    }
    load()
    // Poll every 5s for live updates (from Supabase if available, else localStorage)
    const poll=setInterval(async()=>{
      const supScores = await loadScoresFromSupabase(tid.trim())
      if(supScores && Object.keys(supScores).length>0){ setScores({...supScores}) }
      else { const s=getScores(); if(s[tid])setScores({...s[tid]}) }
      setChatHistory([...getChatHistory(tid)])
    },5000)
    // Also listen for storage events (instant sync same browser)
    const onStorage=()=>{
      const s=getScores()
      if(s[tid])setScores({...s[tid]})
    }
    window.addEventListener('storage',onStorage)
    return()=>{clearInterval(poll);window.removeEventListener('storage',onStorage)}
  },[tid])

  const sendChat=()=>{
    if(!chatMsg.trim()||!chatName)return
    const msg={id:Date.now(),name:chatName,text:chatMsg.trim(),time:new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}),isOrg:false}
    const updated=[...chatHistory,msg]
    setChatHistory(updated)
    saveChatHistory(tid,updated)
    setChatMsg('')
  }

  const tTeams = teams
  const pairs = []
  for(let i2=0;i2<Math.min(tTeams.length,16);i2+=2){
    pairs.push({id:'m'+i2,a:tTeams[i2],b:tTeams[i2+1],scoreA:scores['m'+i2+'_a']||0,scoreB:scores['m'+i2+'_b']||0})
  }

  if(loading)return <div style={{minHeight:'100vh',background:'#050508',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{textAlign:'center'}}><div style={{fontFamily:'var(--fh)',fontSize:18,color:'var(--cyan)',letterSpacing:3,animation:'glow-pulse 2s infinite',marginBottom:16}}>⚔ ARENAGG</div><Spinner size={32} color="var(--cyan)"/></div></div>
  if(!t)return <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}><div style={{textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>📡</div><div style={{color:'var(--muted)',fontFamily:'var(--fm)',letterSpacing:2}}>TURNAMEN TIDAK DITEMUKAN</div><button className="btn btn-ghost" onClick={onBack} style={{marginTop:16}}>← Kembali</button></div></div>

  return <div style={{minHeight:'100vh',background:'var(--bg)'}}>
    {/* TOPBAR */}
    <div style={{background:'rgba(5,5,8,0.97)',borderBottom:'1px solid var(--border)',padding:'10px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50,backdropFilter:'blur(10px)',boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{fontFamily:'var(--fh)',fontSize:14,color:'var(--cyan)',letterSpacing:2,fontWeight:900}}>⚔ ARENAGG</div>
        <div style={{width:1,height:20,background:'var(--border)'}}/>
        <LiveStatusBadge status={t.status} size="sm"/>
        <span style={{fontFamily:'var(--fh)',fontSize:11,fontWeight:700}}>{t.name}</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <LangSelector lang={lang} setLangFn={l=>{setLangState(l);setLang(l)}}/>
        <button onClick={()=>{window.location.hash='#/peserta'}} style={{background:'rgba(255,107,0,0.1)',border:'1px solid rgba(255,107,0,0.3)',borderRadius:5,padding:'5px 11px',color:'var(--orange)',cursor:'pointer',fontSize:9,fontFamily:'var(--fh)',letterSpacing:1,fontWeight:700}}>⚡ Portal Peserta</button>
        <button onClick={onBack} style={{background:'none',border:'1px solid var(--border)',borderRadius:4,padding:'4px 10px',color:'var(--muted)',cursor:'pointer',fontSize:10,fontFamily:'var(--fm)'}}>{i.back}</button>
      </div>
    </div>

    {/* LIVE BANNER */}
    {t.status==='live'&&<div style={{background:'linear-gradient(90deg,rgba(255,45,85,0.95),rgba(255,107,0,0.9))',padding:'8px 20px',display:'flex',alignItems:'center',gap:10}}>
      <span style={{width:8,height:8,borderRadius:'50%',background:'#fff',animation:'pulse 0.8s infinite',display:'inline-block'}}/>
      <span style={{fontFamily:'var(--fh)',fontSize:10,color:'#fff',letterSpacing:2,fontWeight:900}}>🔴 STREAMING LIVE · {t.game}</span>
      <span style={{flex:1}}/>
      <span style={{fontSize:11,color:'rgba(255,255,255,0.8)'}}>🏆 Prize: Rp {Number(t.prize).toLocaleString('id-ID')}</span>
    </div>}

    <div style={{maxWidth:700,margin:'0 auto',padding:'20px 16px'}}>
      {/* HERO CARD */}
      <div style={{background:'linear-gradient(135deg,rgba(0,229,255,0.08),rgba(255,107,0,0.05))',border:'1px solid rgba(0,229,255,0.2)',borderRadius:14,padding:'20px 18px',marginBottom:16,textAlign:'center'}}>
        <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:3,marginBottom:6}}>🎮 {t.game} · {t.format}</div>
        <div style={{fontFamily:'var(--fh)',fontSize:22,fontWeight:900,marginBottom:6}}>{t.name}</div>
        <div style={{fontSize:11,color:'var(--muted)',marginBottom:12}}>📍 {t.city} · 📅 {t.date}{t.time&&<span style={{color:'var(--cyan)'}}> · ⏰ {t.time} WIB</span>}</div>
        <div style={{fontFamily:'var(--fh)',fontSize:28,color:'var(--yellow)',fontWeight:900}}>Rp {Number(t.prize).toLocaleString('id-ID')}</div>
        <div style={{fontSize:9,color:'var(--muted)',fontFamily:'var(--fm)',marginTop:3}}>PRIZE POOL</div>
      </div>

      {/* TABS */}
      <div style={{display:'flex',gap:4,background:'rgba(255,255,255,0.04)',padding:4,borderRadius:8,border:'1px solid var(--border)',marginBottom:16}}>
        {[{id:'score',icon:'⚡',label:'Skor Live'},{id:'chat',icon:'💬',label:chatHistory.length>0?`Obrolan (${chatHistory.length})`:'Obrolan'}].map(tab=>(
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:5,padding:'8px 14px',border:'none',borderRadius:6,cursor:'pointer',fontFamily:'var(--fh)',fontSize:9,letterSpacing:1,transition:'var(--trans)',background:activeTab===tab.id?'var(--cyan)':'transparent',color:activeTab===tab.id?'#000':'var(--muted)',fontWeight:700}}>
            <span>{tab.icon}</span><span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SCORE TAB */}
      {activeTab==='score'&&<div style={{display:'flex',flexDirection:'column',gap:10}}>
        {pairs.length===0
          ?<div style={{textAlign:'center',padding:'40px 20px',color:'var(--muted)'}}><div style={{fontSize:40,marginBottom:12,animation:'float 3s ease-in-out infinite'}}>📡</div><div style={{fontFamily:'var(--fh)',fontSize:10,letterSpacing:2}}>MENUNGGU PERTANDINGAN</div></div>
          :pairs.map((match,idx)=>(
            <div key={match.id} style={{background:'var(--panel)',border:`1px solid ${match.scoreA!==match.scoreB?'rgba(0,229,255,0.2)':'var(--border)'}`,borderRadius:12,padding:'16px 18px'}}>
              <div style={{textAlign:'center',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:12}}>MATCH {idx+1}</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:12,alignItems:'center'}}>
                <div style={{textAlign:'right'}}>
                  <div style={{fontSize:14,fontWeight:700,color:match.scoreA>match.scoreB?'var(--green)':'var(--text)',marginBottom:4}}>{match.a?.name||'—'}</div>
                  <div style={{fontSize:10,color:'var(--muted)'}}>👤 {match.a?.captain||'—'}</div>
                </div>
                <div style={{textAlign:'center'}}>
                  <div style={{display:'flex',alignItems:'center',gap:12,justifyContent:'center'}}>
                    <div style={{fontFamily:'var(--fh)',fontSize:36,fontWeight:900,color:match.scoreA>match.scoreB?'var(--green)':'var(--text)',minWidth:44,textAlign:'center'}}>{match.scoreA}</div>
                    <div style={{fontFamily:'var(--fh)',fontSize:12,color:'var(--muted)',fontWeight:700}}>:</div>
                    <div style={{fontFamily:'var(--fh)',fontSize:36,fontWeight:900,color:match.scoreB>match.scoreA?'var(--cyan)':'var(--text)',minWidth:44,textAlign:'center'}}>{match.scoreB}</div>
                  </div>
                  {match.scoreA!==match.scoreB&&<div style={{fontSize:9,fontFamily:'var(--fm)',color:'var(--green)',letterSpacing:1,marginTop:4}}>UNGGUL</div>}
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:match.scoreB>match.scoreA?'var(--cyan)':'var(--text)',marginBottom:4}}>{match.b?.name||'—'}</div>
                  <div style={{fontSize:10,color:'var(--muted)'}}>👤 {match.b?.captain||'—'}</div>
                </div>
              </div>
            </div>
          ))
        }
        <div style={{textAlign:'center',padding:'10px',fontSize:10,color:'var(--muted)',fontFamily:'var(--fm)'}}>🔄 Skor diperbarui otomatis setiap 5 detik</div>
      </div>}

      {/* CHAT TAB */}
      {activeTab==='chat'&&<div>
        {!chatName
          ?<div className="card" style={{textAlign:'center',padding:24}}>
            <div style={{fontSize:32,marginBottom:12}}>💬</div>
            <div style={{fontFamily:'var(--fh)',fontSize:12,marginBottom:8}}>MASUKKAN NAMA</div>
            <input value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder="Nama kamu..." onKeyDown={e=>e.key==='Enter'&&nameInput.trim()&&(setChatName(nameInput.trim()),localStorage.setItem('arenagg_chat_name',nameInput.trim()))} style={{marginBottom:12}}/>
            <button className="btn btn-cyan btn-full" onClick={()=>{if(nameInput.trim()){setChatName(nameInput.trim());localStorage.setItem('arenagg_chat_name',nameInput.trim())}}} disabled={!nameInput.trim()}>Masuk Obrolan →</button>
          </div>
          :<div>
            <div style={{height:350,overflow:'auto',display:'flex',flexDirection:'column',gap:8,marginBottom:12,padding:'0 4px'}}>
              {chatHistory.length===0&&<div style={{textAlign:'center',padding:'40px 20px',color:'var(--muted)'}}><div style={{fontSize:32,marginBottom:8}}>💬</div><div style={{fontSize:11}}>Jadilah yang pertama berkomentar!</div></div>}
              {chatHistory.map(msg=>(
                <div key={msg.id} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <div style={{width:30,height:30,borderRadius:'50%',background:`linear-gradient(135deg,${msg.isOrg?'var(--cyan)':'var(--orange)'},#222)`,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:11,color:msg.isOrg?'#000':'#fff',flexShrink:0}}>{msg.name[0].toUpperCase()}</div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:2}}>
                      <span style={{fontWeight:700,fontSize:12}}>{msg.name}</span>
                      {msg.isOrg&&<span style={{fontFamily:'var(--fm)',fontSize:7,color:'var(--cyan)',background:'rgba(0,229,255,0.1)',padding:'1px 4px',borderRadius:3}}>ORG</span>}
                      <span style={{fontSize:9,color:'var(--muted)'}}>{msg.time}</span>
                    </div>
                    <div style={{fontSize:13,background:'rgba(255,255,255,0.04)',borderRadius:'0 8px 8px 8px',padding:'6px 10px',border:'1px solid var(--border)',maxWidth:360}}>{msg.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:8}}>
              <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} placeholder={`${chatName}: tulis pesan...`} onKeyDown={e=>e.key==='Enter'&&sendChat()} style={{flex:1}}/>
              <button onClick={sendChat} disabled={!chatMsg.trim()} className="btn btn-cyan" style={{padding:'8px 14px',fontSize:10}}>→</button>
            </div>
            <div style={{fontSize:9,color:'var(--muted)',marginTop:6,textAlign:'center',fontFamily:'var(--fm)'}}>🔄 Chat diperbarui setiap 5 detik</div>
          </div>
        }
      </div>}
    </div>
  </div>
}



// ============================================================
// LIVE PAGE — navigasi turnamen live dari sidebar
// ============================================================
function LivePage({tournaments,teams,toast,lang}){
  const i=T[lang]||T.id
  const liveT=tournaments.filter(t=>t.status==='live')
  const activeT=tournaments.filter(t=>t.status==='active'||t.status==='live')
  const[selId,setSelId]=useState(liveT[0]?.id||activeT[0]?.id||null)
  const selT=tournaments.find(t=>t.id===selId)

  if(tournaments.length===0)return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{marginBottom:16}}><h1 style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:700}}>🔴 Live Turnamen</h1></div>
    <div className="card" style={{textAlign:'center',padding:'48px 20px',color:'var(--muted)'}}>
      <div style={{fontSize:48,marginBottom:12,animation:'float 3s ease-in-out infinite'}}>📡</div>
      <div style={{fontFamily:'var(--fh)',fontSize:11,letterSpacing:2,marginBottom:8}}>BELUM ADA TURNAMEN</div>
      <div style={{fontSize:11,marginBottom:16}}>Buat turnamen terlebih dahulu, lalu ubah status menjadi Live</div>
      <button className="btn btn-cyan" onClick={()=>{}}>＋ Buat Turnamen</button>
    </div>
  </div>

  if(selId&&selT)return <LiveMatchView tournament={selT} teams={teams} toast={toast} onBack={()=>setSelId(null)}/>

  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{marginBottom:20}}>
      <h1 style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:700}}>🔴 Live Turnamen</h1>
      <p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)'}}>SKOR REAL-TIME · OBROLAN LANGSUNG · LINK BISA DIBAGIKAN</p>
    </div>

    {/* LIVE NOW */}
    {liveT.length>0&&<div style={{marginBottom:20}}>
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--red)',letterSpacing:2,marginBottom:10,display:'flex',alignItems:'center',gap:6}}><span style={{width:7,height:7,borderRadius:'50%',background:'var(--red)',animation:'pulse 0.8s infinite',display:'inline-block'}}/>SEDANG LIVE SEKARANG</div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {liveT.map(t=>(
          <div key={t.id} onClick={()=>setSelId(t.id)} style={{background:'linear-gradient(135deg,rgba(255,45,85,0.1),rgba(255,107,0,0.07))',border:'1px solid rgba(255,45,85,0.35)',borderRadius:12,padding:'16px 20px',cursor:'pointer',transition:'var(--trans)',display:'flex',alignItems:'center',gap:14}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform=''}>
            <div style={{width:48,height:48,borderRadius:12,background:'rgba(255,45,85,0.15)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,flexShrink:0,border:'1px solid rgba(255,45,85,0.3)',animation:'pulse 2s infinite'}}>🔴</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3}}>
                <LiveStatusBadge status="live" size="sm"/>
                <span style={{fontFamily:'var(--fh)',fontSize:15,fontWeight:900}}>{t.name}</span>
              </div>
              <div style={{fontSize:11,color:'var(--muted)'}}>{getGameEmoji(t.game)} {t.game} · 📍 {t.city}{t.time?' · ⏰ '+t.time+' WIB':''} · 👥 {t.registered||0}/{t.slots} Tim · 🏆 Rp {Number(t.prize).toLocaleString('id-ID')}</div>
            </div>
            <button className="btn btn-danger" style={{flexShrink:0,animation:'pulse 2s infinite'}}>⚡ Lihat Live</button>
          </div>
        ))}
      </div>
    </div>}

    {/* ACTIVE TOURNAMENTS */}
    {activeT.filter(t=>t.status==='active').length>0&&<div style={{marginBottom:20}}>
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--green)',letterSpacing:2,marginBottom:10,display:'flex',alignItems:'center',gap:6}}><span style={{width:7,height:7,borderRadius:'50%',background:'var(--green)',display:'inline-block'}}/>TURNAMEN AKTIF</div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {activeT.filter(t=>t.status==='active').map(t=>(
          <div key={t.id} onClick={()=>setSelId(t.id)} style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:10,padding:'14px 18px',cursor:'pointer',transition:'var(--trans)',display:'flex',alignItems:'center',gap:12}} onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(0,229,255,0.3)'} onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
            <div style={{width:40,height:40,borderRadius:10,background:'rgba(0,255,136,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0,border:'1px solid rgba(0,255,136,0.2)'}}>⚡</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:2}}>
                <LiveStatusBadge status="active"/>
                <span style={{fontFamily:'var(--fh)',fontSize:13,fontWeight:700}}>{t.name}</span>
              </div>
              <div style={{fontSize:11,color:'var(--muted)'}}>🎮 {t.game} · 📍 {t.city} · 👥 {t.registered||0}/{t.slots} Tim</div>
            </div>
            <button className="btn btn-ghost btn-sm">Masuk →</button>
          </div>
        ))}
      </div>
    </div>}

    {/* GUIDE */}
    <div className="card" style={{background:'rgba(0,229,255,0.03)',borderColor:'rgba(0,229,255,0.15)'}}>
      <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:12}}>📖 CARA MENGGUNAKAN FITUR LIVE</div>
      {[
        {icon:'1️⃣',title:'Set Status LIVE',desc:'Buka halaman Turnamen → klik ■ Aktifkan → ubah ke Live'},
        {icon:'2️⃣',title:'Buka Halaman Live',desc:'Klik turnamen di atas untuk masuk ke Live Tracker'},
        {icon:'3️⃣',title:'Update Skor',desc:'Tekan tombol + dan − di setiap match untuk update skor real-time'},
        {icon:'4️⃣',title:'Share ke Penonton',desc:'Klik "🔗 Copy Link Live" atau "📱 Share WA" — penonton bisa lihat skor + chat tanpa login'},
        {icon:'5️⃣',title:'Obrolan Live',desc:'Organizer & penonton bisa chat di tab 💬 Obrolan Live'},
      ].map((s,i)=>(
        <div key={i} style={{display:'flex',gap:12,padding:'8px 0',borderBottom:i<4?'1px solid rgba(255,255,255,0.04)':'none'}}>
          <span style={{fontSize:20,flexShrink:0}}>{s.icon}</span>
          <div><div style={{fontSize:12,fontWeight:600,marginBottom:2}}>{s.title}</div><div style={{fontSize:11,color:'var(--muted)'}}>{s.desc}</div></div>
        </div>
      ))}
    </div>
  </div>
}



// ============================================================

// ============================================================
// EXPORT CSV
// ============================================================
function exportCSVData(filename,headers,rows){
  var escape=function(v){return '"'+(String(v||'').replace(/"/g,'""'))+'"'}
  var csv=[headers.map(escape).join(',')].concat(rows.map(function(r){return r.map(escape).join(',')})).join('\n')
  var blob=new Blob([csv],{type:'text/csv;charset=utf-8;'})
  var url=URL.createObjectURL(blob)
  var a=document.createElement('a');a.href=url;a.download=filename
  document.body.appendChild(a);a.click();document.body.removeChild(a)
  setTimeout(function(){URL.revokeObjectURL(url)},1000)
}
function ExportButton({tournaments,teams,toast}){
  const[open,setOpen]=useState(false)
  var exportTeams=function(){
    var headers=['No','Nama Tim','Kapten','No HP','Turnamen','Game','Kota','Status Bayar']
    var rows=teams.map(function(t,i){
      var tourn=tournaments.find(function(x){return x.id===t.tournament_id})||{}
      return[i+1,t.name,t.captain,t.contact,tourn.name||'—',tourn.game||'—',tourn.city||'—',t.paid?'Lunas':'Belum Lunas']
    })
    exportCSVData('ArenaGG_Peserta_'+new Date().toISOString().slice(0,10)+'.csv',headers,rows)
    toast('✅ Data peserta diexport!','success');setOpen(false)
    addNotif('📥 Export peserta berhasil','success')
  }
  var exportTournaments=function(){
    var headers=['No','Nama Turnamen','Game','Format','Kota','Tanggal','Prize Pool','Entry Fee','Slot','Terdaftar','Status']
    var rows=tournaments.map(function(t,i){return[i+1,t.name,t.game,t.format,t.city,t.date,'Rp '+Number(t.prize).toLocaleString('id-ID'),'Rp '+Number(t.entry).toLocaleString('id-ID'),t.slots,t.registered||0,t.status]})
    exportCSVData('ArenaGG_Turnamen_'+new Date().toISOString().slice(0,10)+'.csv',headers,rows)
    toast('✅ Data turnamen diexport!','success');setOpen(false)
    addNotif('📥 Export turnamen berhasil','success')
  }
  var exportFinance=function(){
    var headers=['Turnamen','Game','Total Entry (Rp)','Komisi 15% (Rp)','Tim Lunas','Total Tim']
    var rows=tournaments.map(function(t){
      var tms=teams.filter(function(x){return x.tournament_id===t.id})
      var paid=tms.filter(function(x){return x.paid}).length
      var totalEntry=paid*Number(t.entry)
      return[t.name,t.game,totalEntry,Math.round(totalEntry*0.15),paid,tms.length]
    })
    exportCSVData('ArenaGG_Keuangan_'+new Date().toISOString().slice(0,10)+'.csv',headers,rows)
    toast('✅ Data keuangan diexport!','success');setOpen(false)
  }
  return <div style={{position:'relative'}}>
    <button className="btn btn-dark btn-sm" onClick={function(){setOpen(function(o){return !o})}}>📥 Export</button>
    {open&&<div style={{position:'absolute',top:36,right:0,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:6,zIndex:200,minWidth:180,boxShadow:'0 8px 24px rgba(0,0,0,0.4)'}}>
      {[{icon:'👥',label:'Export Peserta (.csv)',fn:exportTeams},{icon:'🏆',label:'Export Turnamen (.csv)',fn:exportTournaments},{icon:'💰',label:'Export Keuangan (.csv)',fn:exportFinance}].map(function(item){
        return <button key={item.label} onClick={item.fn} style={{display:'flex',alignItems:'center',gap:8,width:'100%',padding:'8px 10px',background:'none',border:'none',cursor:'pointer',borderRadius:6,fontFamily:'var(--fb)',fontSize:12,color:'var(--text)',textAlign:'left'}}
          onMouseEnter={function(e){e.currentTarget.style.background='rgba(0,229,255,0.08)'}}
          onMouseLeave={function(e){e.currentTarget.style.background='none'}}>
          <span>{item.icon}</span>{item.label}
        </button>
      })}
    </div>}
    {open&&<div style={{position:'fixed',inset:0,zIndex:199}} onClick={function(){setOpen(false)}}/>}
  </div>
}

// LEADERBOARD — rankings & achievements  
// ============================================================
function Leaderboard({tournaments,teams,lang}){
  const i=T[lang]||T.id
  const[view,setView]=useState('teams') // teams | organizer
  
  // Team stats
  const teamStats=teams.map(t=>{
    const tourn=tournaments.find(x=>x.id===t.tournament_id)
    return{...t,tournName:tourn?.name||'—',game:tourn?.game||'—',prize:tourn?.prize||0}
  })
  const paidTeams=teamStats.filter(t=>t.paid).sort((a,b)=>b.prize-a.prize)
  
  // Game stats
  const gameCount={}
  tournaments.forEach(t=>{if(t.game)gameCount[t.game]=(gameCount[t.game]||0)+1})
  const topGames=Object.entries(gameCount).sort((a,b)=>b[1]-a[1])
  
  // City stats
  const cityCount={}
  tournaments.forEach(t=>{if(t.city)cityCount[t.city]=(cityCount[t.city]||0)+1})
  const topCities=Object.entries(cityCount).sort((a,b)=>b[1]-a[1]).slice(0,5)
  
  const medals=['🥇','🥈','🥉','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟']
  // Extra stats
  const totalPrizeLb=tournaments.reduce((s,t)=>s+Number(t.prize),0)
  const totalEntryCollected=teams.filter(t=>t.paid).reduce((s,tm)=>{const tour=tournaments.find(x=>x.id===tm.tournament_id);return s+Number(tour?.entry||0)},0)
  const avgTeamsPerTournament=tournaments.length?Math.round(teams.length/tournaments.length):0
  
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:900}}>
    <div style={{marginBottom:20}}>
      <h1 style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:700}}>🏅 Leaderboard</h1>
      <p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)'}}>RANKING TIM & STATISTIK PLATFORM</p>
    </div>
    
    {/* OVERVIEW STATS */}
    <div className="g4" style={{marginBottom:20}}>
      {[
        {icon:'🏆',label:'Total Turnamen',val:tournaments.length,color:'var(--cyan)'},
        {icon:'👥',label:'Total Tim',val:teams.length,color:'var(--green)'},
        {icon:'✅',label:'Tim Lunas',val:teams.filter(t=>t.paid).length,color:'var(--yellow)'},
        {icon:'🎮',label:'Jenis Game',val:Object.keys(gameCount).length,color:'var(--orange)'},
      ].map((s,idx)=>(
        <div key={idx} className="stat-card" style={{'--accent-color':s.color}}>
          <div style={{fontSize:22,marginBottom:8}}>{s.icon}</div>
          <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1}}>{s.label}</div>
          <div style={{fontFamily:'var(--fh)',fontSize:22,fontWeight:900,color:s.color,marginTop:4}}>{s.val}</div>
        </div>
      ))}
    </div>

    <div className="g2" style={{gap:14}}>
      {/* TOP TEAMS */}
      <div className="card">
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--yellow)',letterSpacing:1,marginBottom:14}}>🏅 TOP TIM (BERDASAR PRIZE)</div>
        {paidTeams.length===0
          ?<div style={{color:'var(--muted)',fontSize:11,textAlign:'center',padding:20}}>Belum ada tim yang lunas</div>
          :paidTeams.slice(0,10).map((t,idx)=>(
            <div key={t.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:idx<paidTeams.length-1?'1px solid rgba(255,255,255,0.03)':'none'}}>
              <span style={{fontSize:18,flexShrink:0,width:28,textAlign:'center'}}>{medals[idx]||`${idx+1}`}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:700,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.name}</div>
                <div style={{fontSize:10,color:'var(--muted)'}}>👤 {t.captain} · 🎮 {t.game}</div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{fontFamily:'var(--fh)',fontSize:11,color:'var(--yellow)'}}>Rp {Number(t.prize).toLocaleString('id-ID')}</div>
                <div style={{fontSize:9,color:'var(--muted)',fontFamily:'var(--fm)'}}>{t.tournName.slice(0,16)}</div>
              </div>
            </div>
          ))
        }
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {/* TOP GAMES */}
        <div className="card">
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:12}}>🎮 GAME TERPOPULER</div>
          {topGames.length===0
            ?<div style={{color:'var(--muted)',fontSize:11,textAlign:'center',padding:12}}>Belum ada data</div>
            :topGames.map(([game,count],idx)=>{
              const maxCount=topGames[0][1]||1
              return <div key={game} style={{marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                  <span style={{fontSize:12,fontWeight:600}}>{game}</span>
                  <span style={{fontFamily:'var(--fh)',fontSize:11,color:'var(--cyan)'}}>{count} turnamen</span>
                </div>
                <div className="pbar"><div className="pfill" style={{width:`${Math.round(count/maxCount*100)}%`,background:'linear-gradient(90deg,var(--cyan),var(--orange))'}}/></div>
              </div>
            })
          }
        </div>

        {/* TOP CITIES */}
        <div className="card">
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--orange)',letterSpacing:1,marginBottom:12}}>📍 KOTA TERBANYAK</div>
          {topCities.length===0
            ?<div style={{color:'var(--muted)',fontSize:11,textAlign:'center',padding:12}}>Belum ada data</div>
            :topCities.map(([city,count],idx)=>(
              <div key={city} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                <span style={{fontSize:12,fontWeight:600}}>{medals[idx]} {city}</span>
                <span className="badge badge-cyan" style={{fontSize:9}}>{count}x</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  </div>
}


// ============================================================
// PARTICIPANT PORTAL — Login/Register + Dashboard Peserta
// ============================================================

const PARTICIPANT_KEY = 'arenagg_participant'

function getParticipant(){
  try{return JSON.parse(localStorage.getItem(PARTICIPANT_KEY)||'null')}catch(e){return null}
}
function saveParticipant(p){
  try{localStorage.setItem(PARTICIPANT_KEY,JSON.stringify(p))}catch(e){}
}
function clearParticipant(){
  try{localStorage.removeItem(PARTICIPANT_KEY)}catch(e){}
}

// Auth peserta — login via nama tim + no HP (no email needed)
function ParticipantAuth({onLogin,toast}){
  const[mode,setMode]=useState('login')
  const[teamName,setTeamName]=useState('')
  const[contact,setContact]=useState('')
  const[captain,setCaptain]=useState('')
  const[loading,setL]=useState(false)
  const[err,setErr]=useState('')
  const[lang,setLangState]=useState(getLang())
  const i=T[lang]||T.id

  const login=async()=>{
    if(!teamName.trim()||!contact.trim()){setErr('Isi nama tim dan no. HP');return}
    setErr('');setL(true)
    try{
      // Find team by name + contact
      const{data,error}=await supabase.from('teams').select('*,tournaments(*)').ilike('name',teamName.trim()).eq('contact',contact.trim()).single()
      if(error||!data){setErr('Tim tidak ditemukan. Pastikan nama tim dan no. HP sesuai saat pendaftaran.');setL(false);return}
      const participant={
        id:data.id,name:data.name,captain:data.captain,contact:data.contact,
        members:data.members,photo:data.photo,paid:data.paid,
        tournamentId:data.tournament_id,
        tournament:data.tournaments,
        loginAt:Date.now()
      }
      saveParticipant(participant)
      toast('✓ Selamat datang, '+data.name+'!','success')
      onLogin(participant)
    }catch(e){setErr('Error: '+e.message)}
    setL(false)
  }

  return <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',padding:20,backgroundImage:'radial-gradient(ellipse at 30% 50%,rgba(0,229,255,0.05) 0%,transparent 60%),radial-gradient(ellipse at 70% 20%,rgba(255,107,0,0.04) 0%,transparent 60%)'}}>
    <div style={{width:'100%',maxWidth:400}}>
      {/* LOGO */}
      <div style={{textAlign:'center',marginBottom:28}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:8}}>
          <div style={{width:40,height:40,borderRadius:10,background:'linear-gradient(135deg,var(--cyan),#0055aa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,boxShadow:'0 8px 24px rgba(0,229,255,0.3)',animation:'float 3s ease-in-out infinite'}}>⚔</div>
          <div style={{fontFamily:'var(--fh)',fontSize:22,fontWeight:900,color:'var(--cyan)',letterSpacing:3,animation:'glow-pulse 3s infinite'}}>ARENAGG</div>
        </div>
        <div style={{fontSize:11,color:'var(--orange)',fontFamily:'var(--fh)',letterSpacing:2,fontWeight:700}}>{i.portal_peserta||'PORTAL PESERTA'}</div>
        <div style={{fontSize:9,color:'var(--muted)',fontFamily:'var(--fm)',letterSpacing:2,marginTop:4}}>{i.portal_sub||'Akses dashboard tim & pantau pertandingan live'}</div>
        <div style={{marginTop:12}}><LangSelector lang={lang} setLangFn={l=>{setLangState(l);setLang(l)}}/></div>
      </div>

      {/* CARD */}
      <div style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:14,padding:'28px 24px',boxShadow:'var(--shadow),0 0 40px rgba(255,107,0,0.05)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,var(--orange),var(--cyan),transparent)'}}/>

        {/* TABS */}
        <div style={{display:'flex',background:'rgba(255,255,255,0.04)',borderRadius:8,padding:4,marginBottom:22,gap:4}}>
          {[{id:'login',label:i.masuk_tim||'Masuk Tim'},{id:'info',label:i.cara_masuk||'Cara Masuk'}].map(t=>(
            <button key={t.id} onClick={()=>{setMode(t.id);setErr('')}} style={{flex:1,padding:9,border:'none',borderRadius:6,cursor:'pointer',fontFamily:'var(--fh)',fontSize:9,letterSpacing:1.5,transition:'var(--trans)',background:mode===t.id?'var(--orange)':'transparent',color:mode===t.id?'#fff':'var(--muted)',fontWeight:700}}>{t.label}</button>
          ))}
        </div>

        {mode==='login'&&<>
          <div style={{marginBottom:12}}>
            <label style={{display:'block',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:5}}>{`⚔ ${i.nama_tim_label||'NAMA TIM *'}`}</label>
            <input value={teamName} onChange={e=>setTeamName(e.target.value)} placeholder={i.nama_tim_ph||"Nama tim saat daftar..."} onKeyDown={e=>e.key==='Enter'&&login()} style={{fontSize:13}}/>
          </div>
          <div style={{marginBottom:20}}>
            <label style={{display:'block',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:5}}>{`📱 ${i.nohp_label||'NO. HP (SAAT DAFTAR) *'}`}</label>
            <input value={contact} onChange={e=>setContact(e.target.value)} placeholder={i.nohp_ph||"08xxxxxxxxxx"} type="tel" onKeyDown={e=>e.key==='Enter'&&login()} style={{fontSize:13}}/>
          </div>
          {err&&<div style={{color:'var(--red)',fontSize:11,marginBottom:14,padding:'9px 12px',background:'rgba(255,45,85,0.07)',borderRadius:7,border:'1px solid rgba(255,45,85,0.2)',display:'flex',gap:6}}><span>⚠</span><span>{err}</span></div>}
          <button className="btn btn-orange btn-full" onClick={login} disabled={!teamName.trim()||!contact.trim()||loading} style={{fontSize:11,padding:13,borderRadius:8}}>
            {loading?<><Spinner size={14} color="#fff"/> Mencari...</>:'⚡ Masuk ke Dashboard Tim'}
          </button>
          <div style={{textAlign:'center',marginTop:14,fontSize:11,color:'var(--muted)'}}>{i.belum_daftar||'Belum daftar?'} <a href={window.location.origin} style={{color:'var(--cyan)',textDecoration:'none',fontWeight:600}}>Daftar tim →</a></div>
        </>}

        {mode==='info'&&<div style={{fontSize:12,lineHeight:1.9,color:'var(--muted)'}}>
          <div style={{fontFamily:'var(--fh)',fontSize:11,color:'var(--orange)',marginBottom:12,letterSpacing:1}}>CARA MASUK PORTAL PESERTA</div>
          {[
            {icon:'1️⃣',title:'Daftar Tim',desc:'Buka link turnamen → isi form pendaftaran tim'},
            {icon:'2️⃣',title:'Simpan Data',desc:'Catat Nama Tim dan No. HP yang kamu daftarkan'},
            {icon:'3️⃣',title:'Login di sini',desc:'Masukkan Nama Tim + No. HP → klik Masuk'},
            {icon:'4️⃣',title:'Akses Dashboard',desc:'Lihat status tim, pantau jadwal & skor live'},
            {icon:'5️⃣',title:'Saat Bertanding',desc:'Buka tab Live di dashboard untuk skor real-time & chat'},
          ].map(s=>(
            <div key={s.icon} style={{display:'flex',gap:10,padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
              <span style={{fontSize:18,flexShrink:0}}>{s.icon}</span>
              <div><b style={{color:'var(--text)'}}>{s.title}</b> — {s.desc}</div>
            </div>
          ))}
        </div>}
      </div>
      <div style={{textAlign:'center',marginTop:14,fontSize:9,color:'rgba(255,255,255,0.12)',fontFamily:'var(--fm)',letterSpacing:2}}>© 2026 ARENAGG · PORTAL PESERTA</div>
    </div>
  </div>
}

// Dashboard Peserta — setelah login
function ParticipantDashboard({participant,onLogout,toast}){
  const t=participant.tournament
  const[activeTab,setActiveTab]=useState('home')
  const[chatMsg,setChatMsg]=useState('')
  const[chatHistory,setChatHistory]=useState(()=>getChatHistory(participant.tournamentId||''))
  const[chatName]=useState(participant.name)
  const[scores,setScores]=useState(()=>{const s=getScores();return s[participant.tournamentId]||{}})
  const[lang,setLangState]=useState(getLang())
  const i=T[lang]||T.id
  const fmtRp2=n=>'Rp '+Number(n).toLocaleString('id-ID')

  // Bank info organizer (tersimpan di localStorage oleh organizer)
  const bank=(()=>{try{return JSON.parse(localStorage.getItem('arenagg_bank_info')||'{}')}catch(e){return{}}})()

  // Wallet state
  const WALLET_KEY='arenagg_wallet_'+participant.id
  const getWallet=()=>{try{return JSON.parse(localStorage.getItem(WALLET_KEY)||'{}')}catch(e){return{}}}
  const saveWallet=w=>{try{localStorage.setItem(WALLET_KEY,JSON.stringify(w))}catch(e){}}
  const[wallet,setWallet]=useState(()=>getWallet())
  const[payProof,setPayProof]=useState('')
  const[payNote,setPayNote]=useState('')
  const[payMethod,setPayMethod]=useState(bank.bankName||'Transfer Bank')
  const[submitting,setSubmitting]=useState(false)
  const entryFee=Number(participant.tournament?.entry||0)

  // Submit bukti bayar (ke Supabase + localStorage backup)
  const submitPayment=async()=>{
    if(!payProof.trim()){toast('Isi nomor bukti transfer / referensi pembayaran','error');return}
    setSubmitting(true)
    const payload={amount:entryFee,method:payMethod,proof:payProof,note:payNote}
    // Try Supabase first
    const ok = await submitPaymentSupa(participant.id, participant.tournamentId, payload)
    // Also save locally as backup
    const rec={id:'pay_'+Date.now(),amount:entryFee,method:payMethod,proof:payProof,note:payNote,submittedAt:new Date().toLocaleString('id-ID'),status:'pending',syncedToSupabase:ok}
    const updated={...wallet,payments:[...(wallet.payments||[]),rec],lastSubmit:Date.now()}
    setWallet(updated);saveWallet(updated)
    setPayProof('');setPayNote('')
    toast(ok?'✓ Bukti bayar terkirim ke sistem! Tunggu konfirmasi organizer.':'✓ Bukti bayar tersimpan! Hubungi organizer untuk konfirmasi.','success')
    setSubmitting(false)
  }

  // Poll for updates every 5s (scores from Supabase, chat from localStorage)
  useEffect(()=>{
    const poll=setInterval(async()=>{
      setChatHistory([...getChatHistory(participant.tournamentId||'')])
      // Try Supabase for scores
      const supScores = await loadScoresFromSupabase(participant.tournamentId||'')
      if(supScores && Object.keys(supScores).length>0) setScores({...supScores})
      else{ const s=getScores();if(s[participant.tournamentId])setScores({...s[participant.tournamentId]}) }
    },5000)
    return()=>clearInterval(poll)
  },[])

  const sendChat=()=>{
    if(!chatMsg.trim())return
    const msg={id:Date.now(),name:chatName,text:chatMsg.trim(),time:new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit'}),isOrg:false,isPlayer:true}
    const updated=[...chatHistory,msg]
    setChatHistory(updated)
    saveChatHistory(participant.tournamentId,updated)
    setChatMsg('')
  }

  // Build match data for this team
  const matchScores=Object.entries(scores)
  const fmtRpLocal=n=>'Rp '+Number(n).toLocaleString('id-ID')

  const TABS=[
    {id:'home',icon:'🏠',label:'Beranda'},
    {id:'wallet',icon:'💳',label:'Wallet'},
    {id:'live',icon:'🔴',label:'Live'},
    {id:'chat',icon:'💬',label:'Chat'+(chatHistory.length>0?` (${chatHistory.length})`:'')},
    {id:'info',icon:'ℹ',label:'Info'},
  ]

  return <div style={{minHeight:'100vh',background:'var(--bg)'}}>
    {/* TOP NAV */}
    <div style={{background:'rgba(5,5,8,0.97)',borderBottom:'1px solid var(--border)',padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50,backdropFilter:'blur(10px)'}}>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{fontFamily:'var(--fh)',fontSize:13,color:'var(--cyan)',letterSpacing:2,fontWeight:900}}>⚔ ARENAGG</div>
        <div style={{width:1,height:16,background:'var(--border)'}}/>
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--orange)',letterSpacing:1}}>PORTAL PESERTA</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{fontFamily:'var(--fh)',fontSize:10,fontWeight:700,color:'var(--cyan)'}}>{participant.name}</div>
        <LangSelector lang={lang} setLangFn={l=>{setLangState(l);setLang(l)}}/>
        <button onClick={onLogout} style={{background:'none',border:'1px solid var(--border)',borderRadius:4,padding:'3px 9px',color:'var(--muted)',cursor:'pointer',fontSize:9,fontFamily:'var(--fm)'}}>Keluar</button>
      </div>
    </div>

    {/* LIVE BANNER */}
    {t?.status==='live'&&<div style={{background:'linear-gradient(90deg,rgba(255,45,85,0.95),rgba(255,107,0,0.9))',padding:'8px 16px',display:'flex',alignItems:'center',gap:8}}>
      <span style={{width:8,height:8,borderRadius:'50%',background:'#fff',animation:'pulse 0.8s infinite',display:'inline-block'}}/>
      <span style={{fontFamily:'var(--fh)',fontSize:10,color:'#fff',letterSpacing:2,fontWeight:900}}>🔴 TURNAMEN SEDANG LIVE!</span>
      <button onClick={()=>setActiveTab('live')} style={{marginLeft:'auto',background:'rgba(255,255,255,0.2)',border:'none',borderRadius:4,padding:'3px 10px',color:'#fff',cursor:'pointer',fontFamily:'var(--fh)',fontSize:9,letterSpacing:1}}>LIHAT LIVE →</button>
    </div>}

    <div style={{maxWidth:600,margin:'0 auto',padding:'16px 14px'}}>
      {/* TABS */}
      <div style={{display:'flex',gap:4,background:'rgba(255,255,255,0.04)',padding:4,borderRadius:9,border:'1px solid var(--border)',marginBottom:16}}>
        {TABS.map(tab=>(
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:2,padding:'7px 4px',border:'none',borderRadius:6,cursor:'pointer',fontFamily:'var(--fh)',fontSize:8,letterSpacing:0.8,transition:'var(--trans)',background:activeTab===tab.id?'var(--orange)':'transparent',color:activeTab===tab.id?'#fff':'var(--muted)',fontWeight:700}}>
            <span style={{fontSize:16}}>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* HOME TAB */}
      {activeTab==='home'&&<div className="animate-in">
        {/* Tim Card */}
        <div style={{background:'linear-gradient(135deg,rgba(255,107,0,0.1),rgba(0,229,255,0.06))',border:'1px solid rgba(255,107,0,0.25)',borderRadius:14,padding:'18px',marginBottom:14,display:'flex',gap:14,alignItems:'center'}}>
          <div style={{width:56,height:56,borderRadius:14,background:'linear-gradient(135deg,var(--orange),var(--cyan))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:20,color:'#000',flexShrink:0,overflow:'hidden',border:'2px solid rgba(255,107,0,0.3)'}}>
            {participant.photo?<img src={participant.photo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt=""/>:<span>⚔</span>}
          </div>
          <div style={{flex:1}}>
            <div style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:900,marginBottom:3}}>{participant.name}</div>
            <div style={{fontSize:11,color:'var(--muted)',marginBottom:5}}>👤 Kapten: {participant.captain} · 👥 {participant.members} orang</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              <span className={`tag tag-${participant.paid?'active':'pending'}`} style={{fontSize:8}}>{participant.paid?'✓ LUNAS':'⏳ BELUM BAYAR'}</span>
              {t&&<span style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--cyan)',background:'rgba(0,229,255,0.08)',padding:'2px 7px',borderRadius:3,border:'1px solid rgba(0,229,255,0.15)'}}>{t.game}</span>}
            </div>
          </div>
        </div>

        {/* Tournament Info */}
        {t&&<div className="card" style={{marginBottom:14}}>
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:12}}>🏆 INFO TURNAMEN</div>
          <div style={{fontFamily:'var(--fh)',fontSize:16,fontWeight:700,marginBottom:4}}>{t.name}</div>
          <div style={{fontSize:11,color:'var(--muted)',marginBottom:12}}>{getGameEmoji(t.game)} {t.game} · 📍 {t.city} · 📅 {t.date}{t.time&&<span style={{color:'var(--cyan)'}}> · ⏰ {t.time} WIB</span>}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
            {[
              {label:'Prize Pool',val:fmtRpLocal(t.prize),color:'var(--yellow)'},
              {label:'Entry Fee',val:fmtRpLocal(t.entry)+'/tim',color:'var(--text)'},
              {label:'Format',val:t.format,color:'var(--text)'},
              {label:'Status',val:t.status,color:t.status==='live'?'var(--red)':t.status==='active'?'var(--green)':'var(--muted)'},
            ].map(s=><div key={s.label} style={{background:'rgba(255,255,255,0.03)',borderRadius:6,padding:'8px 10px'}}>
              <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:1}}>{s.label}</div>
              <div style={{fontSize:12,fontWeight:600,color:s.color,marginTop:2}}>{s.val}</div>
            </div>)}
          </div>
          {t.status==='live'&&<button className="btn btn-danger btn-full" onClick={()=>setActiveTab('live')} style={{fontSize:10,animation:'pulse 2s infinite'}}>🔴 Lihat Pertandingan Live →</button>}
        </div>}

        {/* Payment reminder */}
        {!participant.paid&&<div style={{background:'rgba(255,215,0,0.06)',border:'1px solid rgba(255,215,0,0.25)',borderRadius:10,padding:'14px',marginBottom:14,cursor:'pointer',transition:'var(--trans)'}} onClick={()=>setActiveTab('wallet')} onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(255,215,0,0.5)'} onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,215,0,0.25)'}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--yellow)',letterSpacing:1}}>⚠ ENTRY FEE BELUM DIBAYAR</div>
            <span className="tag tag-pending" style={{fontSize:8,animation:'pulse 2s infinite'}}>TAP UNTUK BAYAR</span>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontSize:11,color:'var(--muted)'}}>Buka Wallet untuk info rekening & kirim bukti bayar</div>
            <div style={{fontFamily:'var(--fh)',fontSize:20,fontWeight:900,color:'var(--yellow)'}}>{fmtRp2(entryFee)}</div>
          </div>
        </div>}
      </div>}

      {/* WALLET TAB */}
      {activeTab==='wallet'&&<div className="animate-in">
        <div style={{fontFamily:'var(--fh)',fontSize:14,fontWeight:700,marginBottom:16}}>💳 WALLET PESERTA</div>

        {/* STATUS PEMBAYARAN */}
        <div style={{background:participant.paid?'linear-gradient(135deg,rgba(0,255,136,0.1),rgba(0,229,255,0.06))':'linear-gradient(135deg,rgba(255,215,0,0.1),rgba(255,107,0,0.06))',border:`1px solid ${participant.paid?'rgba(0,255,136,0.3)':'rgba(255,215,0,0.3)'}`,borderRadius:14,padding:'18px',marginBottom:14}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
            <div>
              <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:4}}>{participant.paid?'✓ STATUS PEMBAYARAN':'⏳ STATUS PEMBAYARAN'}</div>
              <div style={{fontFamily:'var(--fh)',fontSize:22,fontWeight:900,color:participant.paid?'var(--green)':'var(--yellow)'}}>{participant.paid?'LUNAS':'BELUM BAYAR'}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:3}}>ENTRY FEE</div>
              <div style={{fontFamily:'var(--fh)',fontSize:22,fontWeight:900,color:'var(--yellow)'}}>{fmtRp2(entryFee)}</div>
            </div>
          </div>
          {participant.paid
            ?<div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 12px',background:'rgba(0,255,136,0.08)',borderRadius:7,border:'1px solid rgba(0,255,136,0.2)'}}>
              <span style={{fontSize:20}}>✅</span>
              <div>
                <div style={{fontSize:12,fontWeight:700,color:'var(--green)'}}>Pembayaran Terkonfirmasi</div>
                <div style={{fontSize:10,color:'var(--muted)'}}>Slot kamu di turnamen sudah terjamin. Semangat bertanding!</div>
              </div>
            </div>
            :<div>
              <div style={{fontSize:11,color:'var(--muted)',marginBottom:10}}>Segera lakukan pembayaran entry fee untuk mengonfirmasi keikutsertaan timmu.</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {bank.waNumber&&<a href={`https://wa.me/${bank.waNumber.replace(/[^0-9]/g,'').replace(/^0/,'62')}?text=${encodeURIComponent('Halo, saya ingin konfirmasi pembayaran entry fee\nNama Tim: '+participant.name+'\nKapten: '+participant.captain+'\nTurnamen: '+(participant.tournament?.name||''))}`} target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:5,padding:'8px 14px',background:'#25D366',borderRadius:6,color:'#fff',textDecoration:'none',fontFamily:'var(--fh)',fontSize:9,fontWeight:700,letterSpacing:1}}>📱 Konfirmasi via WA</a>}
              </div>
            </div>
          }
        </div>

        {/* INFO REKENING ORGANIZER */}
        {(bank.bankName||bank.accNumber)&&<div className="card" style={{marginBottom:14,borderColor:'rgba(255,215,0,0.2)',background:'rgba(255,215,0,0.03)'}}>
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--yellow)',letterSpacing:1,marginBottom:12}}>🏦 INFO PEMBAYARAN ORGANIZER</div>
          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            {[
              {label:'Bank / E-Wallet',val:bank.bankName,icon:'🏦'},
              {label:'Nomor Rekening / HP',val:bank.accNumber,icon:'💳',copy:true},
              {label:'Atas Nama',val:bank.accName,icon:'👤'},
              {label:'WhatsApp',val:bank.waNumber,icon:'📱'},
            ].filter(s=>s.val).map(s=>(
              <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                <span style={{fontSize:11,color:'var(--muted)'}}>{s.icon} {s.label}</span>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontFamily:s.copy?'var(--fm)':'inherit',fontSize:13,fontWeight:700,color:s.copy?'var(--cyan)':'var(--text)',letterSpacing:s.copy?1:0}}>{s.val}</span>
                  {s.copy&&<button onClick={()=>{if(navigator.clipboard)navigator.clipboard.writeText(s.val).then(()=>toast('✓ Disalin!','success')).catch(()=>{})}} style={{background:'rgba(0,229,255,0.1)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:4,padding:'2px 7px',cursor:'pointer',fontFamily:'var(--fm)',fontSize:8,color:'var(--cyan)'}}>SALIN</button>}
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop:12,padding:'10px 12px',background:'rgba(0,229,255,0.04)',borderRadius:7,border:'1px solid rgba(0,229,255,0.1)',fontSize:11,color:'var(--muted)'}}>
            💡 Transfer <b style={{color:'var(--yellow)'}}>{fmtRp2(entryFee)}</b> ke rekening di atas, lalu submit bukti bayar di bawah.
          </div>
        </div>}

        {/* METODE PEMBAYARAN */}
        {!bank.bankName&&!bank.accNumber&&<div className="card" style={{marginBottom:14,borderColor:'rgba(255,215,0,0.2)'}}>
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--yellow)',letterSpacing:1,marginBottom:8}}>💳 CARA PEMBAYARAN</div>
          <div style={{fontSize:11,color:'var(--muted)',lineHeight:1.8}}>Hubungi organizer untuk info rekening pembayaran entry fee.<br/>Gunakan tombol WA di atas atau tanyakan langsung ke panitia.</div>
        </div>}

        {/* FORM SUBMIT BUKTI BAYAR */}
        {!participant.paid&&<div className="card" style={{marginBottom:14,borderColor:'rgba(0,229,255,0.2)',background:'rgba(0,229,255,0.02)'}}>
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:14}}>📤 SUBMIT BUKTI PEMBAYARAN</div>
          <div style={{marginBottom:12}}>
            <label style={{display:'block',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:5}}>METODE PEMBAYARAN</label>
            <select value={payMethod} onChange={e=>setPayMethod(e.target.value)} style={{fontSize:13}}>
              {['Transfer Bank','DANA','OVO','GoPay','ShopeePay','QRIS','Tunai'].map(m=><option key={m}>{m}</option>)}
            </select>
          </div>
          <div style={{marginBottom:12}}>
            <label style={{display:'block',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:5}}>NO. REFERENSI / BUKTI TRANSFER *</label>
            <input value={payProof} onChange={e=>setPayProof(e.target.value)} placeholder="Contoh: REF1234567890 atau nomor transaksi" style={{fontSize:13}}/>
            <div style={{fontSize:9,color:'var(--muted)',marginTop:4,fontFamily:'var(--fm)'}}>Masukkan nomor referensi / kode unik transaksi dari bukti pembayaran</div>
          </div>
          <div style={{marginBottom:14}}>
            <label style={{display:'block',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:5}}>CATATAN (opsional)</label>
            <input value={payNote} onChange={e=>setPayNote(e.target.value)} placeholder="Keterangan tambahan..." style={{fontSize:13}}/>
          </div>
          <button className="btn btn-cyan btn-full" onClick={submitPayment} disabled={!payProof.trim()||submitting} style={{fontSize:11,padding:12}}>
            {submitting?<><Spinner size={13} color="#000"/> Mengirim...</>:'📤 Kirim Bukti Pembayaran'}
          </button>
          <div style={{fontSize:10,color:'var(--muted)',marginTop:8,textAlign:'center'}}>Setelah dikirim, organizer akan mengonfirmasi pembayaran kamu</div>
        </div>}

        {/* RIWAYAT PEMBAYARAN */}
        {(wallet.payments||[]).length>0&&<div className="card">
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:14}}>📋 RIWAYAT PENGIRIMAN BUKTI</div>
          {(wallet.payments||[]).slice().reverse().map((p,idx)=>(
            <div key={p.id} style={{padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
                <div style={{fontFamily:'var(--fh)',fontSize:13,fontWeight:700,color:'var(--cyan)'}}>{fmtRp2(p.amount)}</div>
                <span className={`tag ${p.status==='confirmed'?'tag-active':'tag-pending'}`} style={{fontSize:8}}>{p.status==='confirmed'?'✓ KONFIRMASI':'⏳ MENUNGGU'}</span>
              </div>
              <div style={{fontSize:11,color:'var(--muted)'}}>💳 {p.method} · Ref: <b style={{color:'var(--text)',fontFamily:'var(--fm)'}}>{p.proof}</b></div>
              {p.note&&<div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>📝 {p.note}</div>}
              <div style={{fontSize:9,color:'var(--muted)',marginTop:3,fontFamily:'var(--fm)'}}>📅 {p.submittedAt}</div>
            </div>
          ))}
        </div>}
      </div>}

      {/* LIVE TAB */}
      {activeTab==='live'&&<div className="animate-in">
        <div style={{marginBottom:14}}>
          <div style={{fontFamily:'var(--fh)',fontSize:14,fontWeight:700,marginBottom:4}}>🔴 Live Pertandingan</div>
          <div style={{fontSize:11,color:'var(--muted)'}}>{t?.name} · {t?.game}</div>
        </div>
        {t?.status!=='live'&&t?.status!=='active'
          ?<div className="card" style={{textAlign:'center',padding:'36px 20px',color:'var(--muted)'}}>
            <div style={{fontSize:48,marginBottom:12,animation:'float 3s ease-in-out infinite'}}>📡</div>
            <div style={{fontFamily:'var(--fh)',fontSize:11,letterSpacing:2,marginBottom:6}}>BELUM DIMULAI</div>
            <div style={{fontSize:11}}>Pertandingan akan dimulai saat turnamen aktif. Pantau terus halaman ini!</div>
          </div>
          :<div>
            {Object.keys(scores).length===0
              ?<div className="card" style={{textAlign:'center',padding:'32px 20px',color:'var(--muted)'}}>
                <div style={{fontSize:40,marginBottom:8,animation:'float 3s ease-in-out infinite'}}>⚡</div>
                <div style={{fontFamily:'var(--fh)',fontSize:11,letterSpacing:2}}>MENUNGGU SKOR</div>
                <div style={{fontSize:11,marginTop:6}}>Skor akan muncul saat organizer mulai update pertandingan</div>
                <div style={{fontSize:9,color:'var(--muted)',marginTop:8,fontFamily:'var(--fm)'}}>🔄 Auto-refresh setiap 5 detik</div>
              </div>
              :<div style={{display:'flex',flexDirection:'column',gap:10}}>
                {Array.from({length:Math.ceil(Object.keys(scores).filter(k=>k.includes('_a')).length)}).map((_,idx)=>{
                  const sA=scores['m'+idx*2+'_a']||scores['m'+idx+'_a']||0
                  const sB=scores['m'+idx*2+'_b']||scores['m'+idx+'_b']||0
                  return <div key={idx} style={{background:'var(--panel)',border:`1px solid ${sA!==sB?'rgba(0,229,255,0.2)':'var(--border)'}`,borderRadius:12,padding:'16px'}}>
                    <div style={{textAlign:'center',fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',marginBottom:10,letterSpacing:1}}>MATCH {idx+1}</div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',gap:8,alignItems:'center',textAlign:'center'}}>
                      <div style={{fontSize:14,fontWeight:700,color:sA>sB?'var(--green)':'var(--text)'}}>Tim A</div>
                      <div style={{fontFamily:'var(--fh)',fontSize:28,fontWeight:900}}>{sA} <span style={{color:'var(--muted)',fontSize:14}}>:</span> {sB}</div>
                      <div style={{fontSize:14,fontWeight:700,color:sB>sA?'var(--cyan)':'var(--text)'}}>Tim B</div>
                    </div>
                  </div>
                })}
                <div style={{textAlign:'center',fontSize:9,color:'var(--muted)',fontFamily:'var(--fm)'}}>🔄 Skor auto-refresh setiap 5 detik</div>
              </div>
            }
          </div>
        }
      </div>}

      {/* CHAT TAB */}
      {activeTab==='chat'&&<div className="animate-in" style={{display:'flex',flexDirection:'column',height:'60vh'}}>
        <div style={{fontFamily:'var(--fh)',fontSize:13,fontWeight:700,marginBottom:12}}>💬 Obrolan Live</div>
        <div style={{flex:1,overflow:'auto',display:'flex',flexDirection:'column',gap:8,marginBottom:12}}>
          {chatHistory.length===0&&<div style={{textAlign:'center',padding:'40px 20px',color:'var(--muted)'}}>
            <div style={{fontSize:32,marginBottom:8}}>💬</div>
            <div style={{fontSize:11}}>Belum ada pesan. Mulai obrolan!</div>
          </div>}
          {chatHistory.map(msg=>(
            <div key={msg.id} style={{display:'flex',gap:8,alignItems:'flex-start',flexDirection:msg.name===participant.name?'row-reverse':'row'}}>
              <div style={{width:28,height:28,borderRadius:'50%',background:msg.isOrg?'linear-gradient(135deg,var(--cyan),#003366)':msg.name===participant.name?'linear-gradient(135deg,var(--orange),#660022)':'linear-gradient(135deg,var(--green),#003322)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:10,color:'#fff',flexShrink:0}}>{msg.name[0].toUpperCase()}</div>
              <div style={{maxWidth:'75%'}}>
                <div style={{display:'flex',alignItems:'center',gap:5,marginBottom:2,flexDirection:msg.name===participant.name?'row-reverse':'row'}}>
                  <span style={{fontWeight:700,fontSize:11}}>{msg.name}</span>
                  {msg.isOrg&&<span style={{fontFamily:'var(--fm)',fontSize:7,color:'var(--cyan)',background:'rgba(0,229,255,0.1)',padding:'1px 4px',borderRadius:3}}>ORG</span>}
                  {msg.name===participant.name&&<span style={{fontFamily:'var(--fm)',fontSize:7,color:'var(--orange)',background:'rgba(255,107,0,0.1)',padding:'1px 4px',borderRadius:3}}>KAMU</span>}
                  <span style={{fontSize:8,color:'var(--muted)'}}>{msg.time}</span>
                </div>
                <div style={{fontSize:12,background:msg.name===participant.name?'rgba(255,107,0,0.12)':'rgba(255,255,255,0.05)',borderRadius:msg.name===participant.name?'8px 0 8px 8px':'0 8px 8px 8px',padding:'7px 10px',border:`1px solid ${msg.name===participant.name?'rgba(255,107,0,0.2)':'var(--border)'}`}}>{msg.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'flex',gap:8,borderTop:'1px solid var(--border)',paddingTop:10}}>
          <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)} placeholder={participant.name+': tulis pesan...'} onKeyDown={e=>e.key==='Enter'&&sendChat()} style={{flex:1,fontSize:13}}/>
          <button onClick={sendChat} disabled={!chatMsg.trim()} className="btn btn-orange" style={{padding:'8px 14px',fontSize:10}}>Kirim →</button>
        </div>
        <div style={{fontSize:8,color:'var(--muted)',textAlign:'center',marginTop:5,fontFamily:'var(--fm)'}}>🔄 Chat diperbarui setiap 5 detik</div>
      </div>}

      {/* INFO TAB */}
      {activeTab==='info'&&<div className="animate-in">
        <div style={{fontFamily:'var(--fh)',fontSize:13,fontWeight:700,marginBottom:14}}>ℹ Info & Bantuan</div>
        <div className="card" style={{marginBottom:12}}>
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:12}}>DATA TIM KAMU</div>
          {[
            {label:'Nama Tim',val:participant.name},
            {label:'Kapten',val:participant.captain},
            {label:'No. HP',val:participant.contact},
            {label:'Jumlah Member',val:participant.members+' orang'},
            {label:'Status Bayar',val:participant.paid?'✓ Lunas':'⏳ Belum Bayar'},
          ].map(s=>(
            <div key={s.label} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
              <span style={{fontSize:10,color:'var(--muted)',fontFamily:'var(--fm)'}}>{s.label}</span>
              <span style={{fontSize:12,fontWeight:600}}>{s.val}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--orange)',letterSpacing:1,marginBottom:12}}>PANDUAN PORTAL PESERTA</div>
          {[
            {icon:'🏠',title:'Beranda',desc:'Lihat info tim & turnamen, status pembayaran'},
            {icon:'🔴',title:'Live',desc:'Pantau skor pertandingan real-time saat turnamen berlangsung'},
            {icon:'💬',title:'Chat',desc:'Obrolan langsung dengan sesama peserta & organizer'},
            {icon:'🔄',title:'Auto-refresh',desc:'Skor & chat diperbarui otomatis setiap 5 detik'},
          ].map(s=>(
            <div key={s.icon} style={{display:'flex',gap:10,padding:'7px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
              <span style={{fontSize:18,flexShrink:0}}>{s.icon}</span>
              <div><b style={{fontSize:12}}>{s.title}</b><div style={{fontSize:11,color:'var(--muted)'}}>{s.desc}</div></div>
            </div>
          ))}
        </div>
        <button className="btn btn-dark btn-full" onClick={onLogout} style={{marginTop:12,fontSize:10,color:'var(--red)',borderColor:'rgba(255,45,85,0.2)'}}>Keluar dari Portal</button>
        <button className="btn btn-cyan btn-full" onClick={()=>setActiveTab('wallet')} style={{marginTop:8,fontSize:10}}>💳 Buka Wallet & Pembayaran</button>
      </div>}
    </div>
  </div>
}

// ============================================================
// BROWSER NOTIFICATION HELPER
// ============================================================
async function requestNotifPermission(){
  if(!('Notification' in window)) return false
  if(Notification.permission==='granted') return true
  const perm = await Notification.requestPermission()
  return perm==='granted'
}
function sendBrowserNotif(title, body, icon='⚔'){
  if(Notification.permission==='granted'){
    try{ new Notification(title, {body, icon:'/favicon.ico', badge:'/favicon.ico'}) }catch(e){}
  }
}

// Main Participant Portal wrapper
function ParticipantPortal({toast}){
  const[participant,setParticipant]=useState(()=>getParticipant())

  const login=p=>{setParticipant(p)}
  const logout=()=>{clearParticipant();setParticipant(null)}

  if(participant)return <ParticipantDashboard participant={participant} onLogout={logout} toast={toast}/>
  return <ParticipantAuth onLogin={login} toast={toast}/>
}

// QR memakai Google Charts API — dijamin berfungsi (fix: teams photo removed)
function QRImg({value,size=155}){
  const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&bgcolor=ffffff&color=000000&margin=8`
  return <img src={url} width={size} height={size} style={{borderRadius:7,display:'block',border:'4px solid white'}} alt="QR"/>
}

// AUTH — pilih bahasa hanya di sini
function AuthPage({onLogin,lang,setLangFn}){
  const i=T[lang]||T.id
  const[mode,setMode]=useState('login')
  const[email,setEmail]=useState('')
  const[pass,setPass]=useState('')
  const[name,setName]=useState('')
  const[loading,setL]=useState(false)
  const[err,setErr]=useState('')
  const[showPass,setShowPass]=useState(false)
  // Fungsi login peserta
  const doLogin=async()=>{
    if(!loginName.trim()||!loginContact.trim()){setLoginErr('Isi nama tim dan no. HP');return}
    setLoginErr('');setLoginL(true)
    try{
      const{data:teamData,error}=await supabase
        .from('teams').select('*,tournaments(*)')
        .ilike('name',loginName.trim())
        .eq('contact',loginContact.trim())
        .eq('tournament_id',tid.trim())
        .single()
      if(error||!teamData){
        setLoginErr('Tim tidak ditemukan di turnamen ini. Pastikan nama tim dan no. HP sesuai saat pendaftaran.')
        setLoginL(false);return
      }
      // Simpan ke localStorage dan redirect ke portal
      const participant={
        id:teamData.id,name:teamData.name,captain:teamData.captain,
        contact:teamData.contact,members:teamData.members,
        photo:teamData.photo,paid:teamData.paid,
        tournamentId:teamData.tournament_id,
        tournament:teamData.tournaments,
        loginAt:Date.now()
      }
      try{localStorage.setItem('arenagg_participant',JSON.stringify(participant))}catch(e){}
      // Redirect ke portal peserta
      window.location.hash='#/peserta'
      window.location.reload()
    }catch(e){setLoginErr('Error: '+e.message)}
    setLoginL(false)
  }

  const submit=async()=>{
    setErr('');
    if(!email.includes('@')||!email.includes('.')){setErr('Format email tidak valid.');return}
    if(pass.length<6){setErr('Password minimal 6 karakter.');return}
    if(mode==='register'&&pass.length<8){setErr('Password minimal 8 karakter untuk akun baru.');return}
    setL(true)
    try{
      if(mode==='login'){
        const{data,error}=await supabase.auth.signInWithPassword({email,password:pass})
        if(error)throw error
        onLogin(data.user)
      } else {
        const{data,error}=await supabase.auth.signUp({email,password:pass,options:{data:{organizer_name:name||email.split('@')[0]}}})
        if(error)throw error
        if(data.user&&!data.session){setErr('✓ Registrasi berhasil! Cek email kamu untuk konfirmasi akun.');setMode('login')}
        else if(data.user)onLogin(data.user)
      }
    }catch(e){setErr(e.message==='Invalid login credentials'?'Email atau password salah.':e.message||'Terjadi error, coba lagi.')}
    setL(false)
  }
  return <div className="auth-bg" style={{position:'relative',overflow:'hidden',background:'#050508',minHeight:'100vh'}}>
    {/* Animated background grid */}
    <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)',backgroundSize:'40px 40px',pointerEvents:'none'}}/>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(0,229,255,0.06) 0%,transparent 70%)',pointerEvents:'none'}}/>
    <div style={{width:'100%',maxWidth:440,position:'relative',zIndex:1}}>
      {/* Logo */}
      <div style={{textAlign:'center',marginBottom:32}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:10,marginBottom:8}}>
          <div style={{width:44,height:44,borderRadius:12,background:'linear-gradient(135deg,var(--cyan),#0055aa)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,boxShadow:'0 8px 24px rgba(0,229,255,0.3)',animation:'float 3s ease-in-out infinite'}}>⚔</div>
          <div style={{fontFamily:'var(--fh)',fontSize:26,fontWeight:900,color:'var(--cyan)',letterSpacing:4,animation:'glow-pulse 3s infinite'}}>ARENAGG</div>
        </div>
        <div style={{fontSize:9,color:'var(--muted)',fontFamily:'var(--fm)',letterSpacing:3}}>ESPORT TOURNAMENT PLATFORM · MULTILINGUAL</div>
        <div style={{marginTop:14,display:'flex',justifyContent:'center'}}><LangSelector lang={lang} setLangFn={setLangFn}/></div>
      </div>
      {/* Card */}
      <div style={{background:'var(--panel)',border:'1px solid var(--border)',borderRadius:16,padding:'32px 28px',boxShadow:'var(--shadow), 0 0 60px rgba(0,229,255,0.05)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:'linear-gradient(90deg,transparent,var(--cyan),var(--orange),transparent)'}}/>
        {/* Tabs */}
        <div style={{display:'flex',background:'rgba(255,255,255,0.04)',borderRadius:8,padding:4,marginBottom:24,gap:4}}>
          {[{id:'login',label:i.login},{id:'register',label:i.register}].map(t=>(
            <button key={t.id} onClick={()=>{setMode(t.id);setErr('')}} style={{flex:1,padding:10,border:'none',borderRadius:6,cursor:'pointer',fontFamily:'var(--fh)',fontSize:10,letterSpacing:1.5,transition:'var(--trans)',background:mode===t.id?'var(--cyan)':'transparent',color:mode===t.id?'#000':'var(--muted)',fontWeight:700}}>{t.label}</button>
          ))}
        </div>
        {/* Fields */}
        {mode==='register'&&(
          <div style={{marginBottom:14}}>
            <label style={{display:'flex',alignItems:'center',gap:6,marginBottom:6,fontSize:10,fontFamily:'var(--fm)',color:'var(--muted)',letterSpacing:1}}>🏢 {i.community}</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="GamingID Org" style={{paddingLeft:14}}/>
          </div>
        )}
        <div style={{marginBottom:14}}>
          <label style={{display:'flex',alignItems:'center',gap:6,marginBottom:6,fontSize:10,fontFamily:'var(--fm)',color:'var(--muted)',letterSpacing:1}}>✉ {i.email}</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="kamu@email.com" onKeyDown={e=>e.key==='Enter'&&submit()}/>
        </div>
        <div style={{marginBottom:22,position:'relative'}}>
          <label style={{display:'flex',alignItems:'center',gap:6,marginBottom:6,fontSize:10,fontFamily:'var(--fm)',color:'var(--muted)',letterSpacing:1}}>🔑 {i.password}</label>
          <input type={showPass?'text':'password'} value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==='Enter'&&submit()} style={{paddingRight:40}}/>
          <button onClick={()=>setShowPass(!showPass)} style={{position:'absolute',right:12,bottom:10,background:'none',border:'none',cursor:'pointer',fontSize:14,color:'var(--muted)',lineHeight:1}}>{showPass?'🙈':'👁'}</button>
        </div>
        {err&&<div style={{color:'var(--red)',fontSize:11,marginBottom:16,padding:'10px 14px',background:'rgba(255,45,85,0.06)',borderRadius:7,border:'1px solid rgba(255,45,85,0.2)',display:'flex',alignItems:'center',gap:8}}><span>⚠</span><span>{err}</span></div>}
        <button className="btn btn-cyan btn-full" onClick={submit} disabled={!email||!pass||loading} style={{fontSize:12,padding:14,borderRadius:8}}>
          {loading?<><Spinner size={14} color="#000"/> Memproses...</>:mode==='login'?i.btn_login:i.btn_register}
        </button>
        {mode==='login'&&<div style={{textAlign:'center',marginTop:16,fontSize:11,color:'var(--muted)'}}>Belum punya akun? <span onClick={()=>setMode('register')} style={{color:'var(--cyan)',cursor:'pointer',fontWeight:600}}>Daftar sekarang →</span></div>}
        {mode==='register'&&<div style={{textAlign:'center',marginTop:16,fontSize:11,color:'var(--muted)'}}>Sudah punya akun? <span onClick={()=>setMode('login')} style={{color:'var(--cyan)',cursor:'pointer',fontWeight:600}}>Masuk →</span></div>}
      </div>
      <div style={{textAlign:'center',marginTop:12,marginBottom:4}}>
        <a href="/#/peserta" style={{fontFamily:'var(--fh)',fontSize:9,color:'var(--orange)',letterSpacing:1,textDecoration:'none',padding:'5px 14px',border:'1px solid rgba(255,107,0,0.3)',borderRadius:20,background:'rgba(255,107,0,0.08)'}}>⚡ Portal Peserta →</a>
      </div>
      <div style={{textAlign:'center',marginTop:8,fontSize:9,color:'rgba(255,255,255,0.15)',fontFamily:'var(--fm)',letterSpacing:2}}>© 2026 ARENAGG · ESPORT PLATFORM SEA · v2.5</div>
    </div>
  </div>
}


function useData(userId,toast){
  const[tournaments,setT]=useState([]);const[teams,setTeams]=useState([]);const[loading,setL]=useState(true)
  const load=useCallback(async()=>{if(!userId){setL(false);return;}setL(true);try{const[{data:ts},{data:tms}]=await Promise.all([supabase.from('tournaments').select('*').eq('organizer_id',userId).order('created_at',{ascending:false}),supabase.from('teams').select('*,tournaments!inner(organizer_id)').eq('tournaments.organizer_id',userId)]);setT(ts||[]);setTeams((tms||[]).map(({tournaments:_,...rest})=>rest));}catch(e){toast('Error: '+e.message,'error')}setL(false)},[userId])
  useEffect(()=>{load()},[load])
  useEffect(()=>{
    if(!userId)return
    const ch=supabase.channel('db-changes')
      .on('postgres_changes',{event:'*',schema:'public',table:'tournaments'},load)
      .on('postgres_changes',{event:'INSERT',schema:'public',table:'teams'},(payload)=>{
        load()
        const teamName = payload.new?.name || 'Tim baru'
        if(toast) toast(`⚔ Tim baru mendaftar: ${teamName}!`, 'success')
        // Also send browser notification
        sendBrowserNotif('⚔ Tim Baru Mendaftar!', `${teamName} baru saja mendaftar ke turnamenmu`)
      })
      .on('postgres_changes',{event:'UPDATE',schema:'public',table:'teams'},(payload)=>{
        load()
        // Notify if paid status changed
        if(payload.new?.paid && !payload.old?.paid){
          const teamName = payload.new?.name || 'Tim'
          if(toast) toast(`✅ ${teamName} sudah dikonfirmasi lunas!`, 'success')
        }
      })
      .on('postgres_changes',{event:'INSERT',schema:'public',table:'payment_submissions'},()=>{
        if(toast) toast('💳 Ada bukti bayar masuk! Cek tab Peserta.', 'info')
      })
      .subscribe()
    return()=>supabase.removeChannel(ch)
  },[userId,load])
  const addT=async d=>{const{error}=await supabase.from('tournaments').insert({...d,organizer_id:userId});if(error){toast('Error: '+error.message,'error');return;}await load()}
  const updateT=async(id,d)=>{const{error}=await supabase.from('tournaments').update(d).eq('id',id).eq('organizer_id',userId);if(error){toast('Error: '+error.message,'error');return;}await load()}
  const deleteT=async id=>{await supabase.from('tournaments').delete().eq('id',id).eq('organizer_id',userId);await load()}
  const addTeam=async d=>{const{error}=await supabase.from('teams').insert(d);if(error){toast('Error: '+error.message,'error');return;}const cnt=teams.filter(t=>t.tournament_id===d.tournament_id).length+1;await supabase.from('tournaments').update({registered:cnt}).eq('id',d.tournament_id);await load()}
  const updateTeam=async(id,d)=>{await supabase.from('teams').update(d).eq('id',id);await load()}
  const deleteTeam=async(id,tid)=>{await supabase.from('teams').delete().eq('id',id);const cnt=teams.filter(t=>t.tournament_id===tid&&t.id!==id).length;await supabase.from('tournaments').update({registered:cnt}).eq('id',tid);await load()}
  return{tournaments,teams,loading,reload:load,addT,updateT,deleteT,addTeam,updateTeam,deleteTeam}
}


// ============================================================
// POSTER GENERATOR — Canvas-based tournament share card
// ============================================================
const GAME_COLORS={
  'Mobile Legends':['#00bfff','#0044aa'],
  'PUBG Mobile':['#f5a623','#c47a00'],
  'Free Fire':['#ff4500','#8b0000'],
  'Free Fire MAX':['#ff4500','#8b0000'],
  'Valorant':['#ff4655','#800000'],
  'Clash Royale':['#a855f7','#4c1d95'],
  'Clash of Clans':['#4ade80','#14532d'],
  'Dota 2':['#ef4444','#7f1d1d'],
  'League of Legends':['#c8a84b','#5a3e00'],
  'Honor of Kings':['#ffd700','#7a4f00'],
  'Genshin Impact':['#60a5fa','#1e3a5f'],
  'Wild Rift':['#00bcd4','#006064'],
  'Arena of Valor':['#ff9800','#e65100'],
  'Chess':['#a0a0a0','#303030'],
}
const getGameColors=g=>GAME_COLORS[g]||['#00e5ff','#003344']

async function generatePosterCanvas(t){
  const W=1080,H=1080
  const canvas=document.createElement('canvas')
  canvas.width=W;canvas.height=H
  const ctx=canvas.getContext('2d')
  const [c1,c2]=getGameColors(t.game)
  const emoji=getGameEmoji(t.game)

  // --- BG gradient
  const bg=ctx.createLinearGradient(0,0,W,H)
  bg.addColorStop(0,'#050508')
  bg.addColorStop(0.5,'#0a0a18')
  bg.addColorStop(1,'#050508')
  ctx.fillStyle=bg;ctx.fillRect(0,0,W,H)

  // --- Radial glow top-left
  const glow=ctx.createRadialGradient(200,200,0,200,200,520)
  glow.addColorStop(0,c1+'33')
  glow.addColorStop(1,'transparent')
  ctx.fillStyle=glow;ctx.fillRect(0,0,W,H)

  // --- Radial glow bottom-right
  const glow2=ctx.createRadialGradient(900,900,0,900,900,400)
  glow2.addColorStop(0,c2+'22')
  glow2.addColorStop(1,'transparent')
  ctx.fillStyle=glow2;ctx.fillRect(0,0,W,H)

  // --- Top accent bar
  const bar=ctx.createLinearGradient(0,0,W,0)
  bar.addColorStop(0,'transparent')
  bar.addColorStop(0.3,c1)
  bar.addColorStop(0.7,c2)
  bar.addColorStop(1,'transparent')
  ctx.fillStyle=bar;ctx.fillRect(0,0,W,5)

  // --- Bottom accent bar
  ctx.fillStyle=bar;ctx.fillRect(0,H-5,W,5)

  // --- Corner brackets
  const drawBracket=(x,y,sx,sy)=>{
    ctx.strokeStyle=c1+'88';ctx.lineWidth=3;ctx.lineCap='round'
    ctx.beginPath();ctx.moveTo(x,y+sy*50);ctx.lineTo(x,y);ctx.lineTo(x+sx*50,y);ctx.stroke()
  }
  drawBracket(40,40,1,1);drawBracket(W-40,40,-1,1)
  drawBracket(40,H-40,1,-1);drawBracket(W-40,H-40,-1,-1)

  // --- ARENAGG logo top
  ctx.font='bold 28px "Orbitron",system-ui,sans-serif'
  ctx.fillStyle=c1;ctx.textAlign='center'
  ctx.fillText('⚔ ARENAGG',W/2,80)

  // --- Horizontal divider
  const div=ctx.createLinearGradient(0,0,W,0)
  div.addColorStop(0,'transparent');div.addColorStop(0.5,c1+'66');div.addColorStop(1,'transparent')
  ctx.fillStyle=div;ctx.fillRect(100,100,W-200,1)

  // --- Game emoji big
  ctx.font='120px serif'
  ctx.textAlign='center'
  ctx.fillText(emoji,W/2,260)

  // --- Game name
  ctx.font='bold 32px "Orbitron",system-ui,sans-serif'
  ctx.fillStyle=c1+'cc'
  ctx.letterSpacing='4px'
  ctx.fillText(t.game.toUpperCase(),W/2,310)

  // --- TOURNAMENT NAME (wrapped)
  const name=t.name.toUpperCase()
  ctx.font='bold 68px "Orbitron",system-ui,sans-serif'
  ctx.fillStyle='#ffffff'
  ctx.shadowColor=c1;ctx.shadowBlur=30
  // Wrap if too long
  const maxW=W-120
  let fontSize=68
  ctx.font=`bold ${fontSize}px "Orbitron",system-ui,sans-serif`
  while(ctx.measureText(name).width>maxW&&fontSize>28){fontSize-=4;ctx.font=`bold ${fontSize}px "Orbitron",system-ui,sans-serif`}
  // Multi-line split
  const words=name.split(' ')
  const lines=[];let line=''
  for(const w of words){
    const test=line?line+' '+w:w
    if(ctx.measureText(test).width>maxW&&line){lines.push(line);line=w}
    else line=test
  }
  if(line)lines.push(line)
  const lineH=fontSize*1.2
  const totalH=lines.length*lineH
  let ty=400-totalH/2+lineH/2
  for(const l of lines){ctx.fillText(l,W/2,ty);ty+=lineH}
  ctx.shadowBlur=0

  // --- Divider center
  ctx.fillStyle=div;ctx.fillRect(100,480,W-200,1)

  // --- Info box
  const boxY=510,boxH=300,boxX=80,boxW=W-160
  ctx.fillStyle='rgba(255,255,255,0.03)'
  ctx.strokeStyle=c1+'44';ctx.lineWidth=1
  roundRect(ctx,boxX,boxY,boxW,boxH,16)
  ctx.fill();ctx.stroke()

  // Info items
  const infoItems=[
    {icon:'🏆',label:'PRIZE POOL',val:'Rp '+Number(t.prize).toLocaleString('id-ID'),color:'#ffd700'},
    {icon:'🎫',label:'ENTRY FEE',val:'Rp '+Number(t.entry).toLocaleString('id-ID')+' /tim',color:'#e8e8f0'},
    {icon:'👥',label:'SLOT',val:`${t.registered||0} / ${t.slots} TIM`,color:'#00ff88'},
    {icon:'📅',label:'TANGGAL',val:t.date+(t.time?' · '+t.time+' WIB':''),color:'#e8e8f0'},
    {icon:'📍',label:'KOTA',val:(t.city||'').toUpperCase(),color:'#e8e8f0'},
    {icon:'⚙',label:'FORMAT',val:(t.format||'').toUpperCase(),color:'#b0b0c8'},
  ]
  const cols=2,itemW=boxW/cols,itemH=boxH/3
  infoItems.forEach((item,idx)=>{
    const col=idx%cols,row=Math.floor(idx/cols)
    const ix=boxX+col*itemW+24,iy=boxY+row*itemH+32
    ctx.font='22px serif';ctx.textAlign='left';ctx.fillStyle='#ffffff'
    ctx.fillText(item.icon,ix,iy)
    ctx.font='bold 11px "Orbitron",system-ui,sans-serif'
    ctx.fillStyle='#666688';ctx.letterSpacing='2px'
    ctx.fillText(item.label,ix+36,iy-6)
    ctx.font='bold 20px "Rajdhani",system-ui,sans-serif'
    ctx.fillStyle=item.color;ctx.letterSpacing='0px'
    ctx.fillText(item.val,ix+36,iy+14)
  })

  // --- Bottom CTA
  const ctaY=850
  ctx.font='bold 18px "Rajdhani",system-ui,sans-serif'
  ctx.fillStyle='#e8e8f0cc';ctx.textAlign='center'
  ctx.fillText('DAFTARKAN TIM KAMU SEKARANG!',W/2,ctaY)

  // QR placeholder / link
  ctx.font='14px "Share Tech Mono",monospace'
  ctx.fillStyle=c1+'99'
  const shortLink=`arenagg-dyuv.vercel.app/#/daftar/${t.id}`
  ctx.fillText(shortLink,W/2,ctaY+34)

  // --- Footer
  ctx.fillStyle=div;ctx.fillRect(100,920,W-200,1)
  ctx.font='bold 22px "Orbitron",system-ui,sans-serif'
  ctx.fillStyle=c1+'88';ctx.textAlign='center'
  ctx.fillText('⚔ ARENAGG — PLATFORM ESPORTS INDONESIA',W/2,960)

  return canvas
}

function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath()
  ctx.moveTo(x+r,y)
  ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r)
  ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r)
  ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r)
  ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r)
  ctx.closePath()
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
  const[posterUrl,setPosterUrl]=useState(null)
  const[genPoster,setGenPoster]=useState(false)
  const makePoster=async()=>{
    setGenPoster(true)
    try{
      const canvas=await generatePosterCanvas(t)
      setPosterUrl(canvas.toDataURL('image/png'))
    }catch(e){toast('Gagal generate poster: '+e.message,'error')}
    setGenPoster(false)
  }
  const downloadPoster=()=>{
    if(!posterUrl)return
    const a=document.createElement('a')
    a.href=posterUrl
    a.download=`ArenaGG_${t.name.replace(/[^a-z0-9]/gi,'_')}_poster.png`
    document.body.appendChild(a);a.click();document.body.removeChild(a)
    toast('✓ Poster didownload!','success')
  }
  const sharePosterWA=()=>{
    if(!posterUrl)return
    const waText=encodeURIComponent(`🎮 *${t.name}*\n📍 ${t.city} · ${t.date}${t.time?' · '+t.time+' WIB':''}\n🏆 Prize: ${fmtRp(t.prize)}\n🎫 Entry: ${fmtRp(t.entry)}/tim\n👥 ${t.slots} Slot Tersedia\n\n🔗 Daftar sekarang:\n${link}`)
    window.open(`https://wa.me/?text=${waText}`,'_blank')
  }
  const [activeTab,setActiveTabS]=useState('share')
  return <div className="overlay" onClick={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div className="modal" style={{maxWidth:520}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
        <div style={{fontFamily:'var(--fh)',fontSize:11,color:'var(--cyan)',letterSpacing:1}}>📤 BAGIKAN TURNAMEN</div>
        <button onClick={onClose} style={{background:'none',border:'none',color:'var(--muted)',cursor:'pointer',fontSize:20,lineHeight:1}}>×</button>
      </div>
      {/* Tab switcher */}
      <div style={{display:'flex',gap:4,background:'rgba(255,255,255,0.04)',padding:4,borderRadius:8,border:'1px solid var(--border)',marginBottom:14}}>
        {[{id:'share',label:'🔗 Share Link'},{id:'poster',label:'🖼 Poster IG/WA'}].map(tab=>(
          <button key={tab.id} onClick={()=>setActiveTabS(tab.id)} style={{flex:1,padding:'7px 10px',border:'none',borderRadius:6,cursor:'pointer',fontFamily:'var(--fh)',fontSize:9,letterSpacing:1,transition:'all 0.2s',background:activeTab===tab.id?'var(--cyan)':'transparent',color:activeTab===tab.id?'#000':'var(--muted)',fontWeight:700}}>{tab.label}</button>
        ))}
      </div>

      {activeTab==='share'&&<>
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
        <button className="btn btn-cyan btn-sm" onClick={copy} style={{flexShrink:0,minWidth:60}}>SALIN</button>
      </div>
      <button onClick={()=>{onClose();onPreview(t.id)}} className="btn btn-ghost btn-full" style={{marginBottom:10,fontSize:10}}>👁 PREVIEW HALAMAN PESERTA</button>
      <div style={{display:'flex',gap:7}}>
        <a href={`https://wa.me/?text=${wa}`} target="_blank" rel="noreferrer" style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:5,padding:9,background:'#25D366',borderRadius:5,color:'white',textDecoration:'none',fontWeight:700,fontFamily:'var(--fh)',fontSize:9,letterSpacing:1}}>📱 WhatsApp</a>
        <a href={`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(t.name)}`} target="_blank" rel="noreferrer" style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:5,padding:9,background:'#229ED9',borderRadius:5,color:'white',textDecoration:'none',fontWeight:700,fontFamily:'var(--fh)',fontSize:9,letterSpacing:1}}>✈ Telegram</a>
        <button onClick={copy} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:5,padding:9,background:'var(--panel)',borderRadius:5,border:'1px solid var(--border)',color:'var(--text)',cursor:'pointer',fontWeight:700,fontFamily:'var(--fh)',fontSize:9}}>🔗 Copy</button>
      </div>
      <button style={{display:'flex',alignItems:'center',justifyContent:'center',gap:5,flex:1,width:'100%',marginTop:8,padding:'9px 10px',background:'rgba(255,45,85,0.1)',border:'1px solid rgba(255,45,85,0.3)',borderRadius:5,cursor:'pointer',fontFamily:'var(--fh)',fontSize:9,fontWeight:700,letterSpacing:1,color:'var(--red)',transition:'var(--trans)'}} onClick={()=>{const liveLink=window.location.origin+'/#/live/'+t.id;if(navigator.clipboard)navigator.clipboard.writeText(liveLink).then(()=>toast('✓ Link live disalin!','success')).catch(()=>{})}}>🔴 Copy Link Live</button>
      </>}

      {activeTab==='poster'&&<>
        <div style={{fontSize:11,color:'var(--muted)',marginBottom:12,fontFamily:'var(--fm)',letterSpacing:0.5}}>
          Generate poster 1080×1080px siap share ke Instagram & WhatsApp Story.
        </div>
        {!posterUrl&&<div style={{textAlign:'center',padding:'24px 0'}}>
          <div style={{fontSize:60,marginBottom:12}}>{getGameEmoji(t.game)}</div>
          <div style={{fontFamily:'var(--fh)',fontSize:13,fontWeight:700,marginBottom:4}}>{t.name}</div>
          <div style={{fontSize:11,color:'var(--muted)',marginBottom:20}}>{t.game} · {t.city} · {fmtRp(t.prize)}</div>
          <button className="btn btn-cyan btn-full" onClick={makePoster} disabled={genPoster} style={{fontSize:11,padding:'12px 20px'}}>
            {genPoster?<><Spinner size={14} color="#000"/> Generating poster...</>:<>🎨 Generate Poster</>}
          </button>
        </div>}
        {posterUrl&&<>
          <div style={{borderRadius:10,overflow:'hidden',marginBottom:12,border:'1px solid rgba(0,229,255,0.2)'}}>
            <img src={posterUrl} style={{width:'100%',display:'block'}} alt="Poster"/>
          </div>
          <div style={{display:'flex',gap:7,marginBottom:8}}>
            <button className="btn btn-cyan" onClick={downloadPoster} style={{flex:1,justifyContent:'center',fontSize:10}}>
              ⬇ Download PNG
            </button>
            <button onClick={sharePosterWA} style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:5,padding:'9px 10px',background:'#25D366',borderRadius:7,color:'white',border:'none',cursor:'pointer',fontFamily:'var(--fh)',fontSize:10,fontWeight:700,letterSpacing:1}}>
              📱 Share WA
            </button>
          </div>
          <button className="btn btn-ghost btn-full" onClick={()=>{setPosterUrl(null)}} style={{fontSize:9}}>
            🔄 Regenerate
          </button>
          <div style={{marginTop:10,padding:'8px 10px',background:'rgba(255,215,0,0.06)',border:'1px solid rgba(255,215,0,0.2)',borderRadius:6,fontSize:10,color:'var(--yellow)',textAlign:'center'}}>
            💡 Tip: Download dulu lalu upload manual ke IG Story / WA Status untuk kualitas terbaik
          </div>
        </>}
      </>}
    </div>
  </div>
}

// PUBLIC PAGE — Fix routing, cari turnamen dengan ID yang tepat
function PublicPage({tid,onBack,toast}){
  const[t,setT]=useState(null);const[teams,setTms]=useState([]);const[loading,setL]=useState(true)
  const[step,setStep]=useState('detail');const[form,setForm]=useState({name:'',captain:'',contact:'',members:'5',photo:''});const[saving,setSaving]=useState(false)
  // Login state untuk peserta
  const[loginName,setLoginName]=useState('')
  const[loginContact,setLoginContact]=useState('')
  const[loginLoading,setLoginL]=useState(false)
  const[loginErr,setLoginErr]=useState('')
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
  // Countdown computed (no hooks needed)
  const getCountdown=()=>{
    if(!t||!t.date)return ''
    const diff=new Date(t.date)-new Date()
    if(diff<=0)return 'Sudah dimulai!'
    const d=Math.floor(diff/86400000);const h=Math.floor((diff%86400000)/3600000)
    const m=Math.floor((diff%3600000)/60000)
    return d>0?`${d} hari ${h} jam lagi`:`${h}j ${m}m lagi`
  }
  // Fungsi login peserta
  const doLogin=async()=>{
    if(!loginName.trim()||!loginContact.trim()){setLoginErr('Isi nama tim dan no. HP');return}
    setLoginErr('');setLoginL(true)
    try{
      const{data:teamData,error}=await supabase
        .from('teams').select('*,tournaments(*)')
        .ilike('name',loginName.trim())
        .eq('contact',loginContact.trim())
        .eq('tournament_id',tid.trim())
        .single()
      if(error||!teamData){
        setLoginErr('Tim tidak ditemukan di turnamen ini. Pastikan nama tim dan no. HP sesuai saat pendaftaran.')
        setLoginL(false);return
      }
      // Simpan ke localStorage dan redirect ke portal
      const participant={
        id:teamData.id,name:teamData.name,captain:teamData.captain,
        contact:teamData.contact,members:teamData.members,
        photo:teamData.photo,paid:teamData.paid,
        tournamentId:teamData.tournament_id,
        tournament:teamData.tournaments,
        loginAt:Date.now()
      }
      try{localStorage.setItem('arenagg_participant',JSON.stringify(participant))}catch(e){}
      // Redirect ke portal peserta
      window.location.hash='#/peserta'
      window.location.reload()
    }catch(e){setLoginErr('Error: '+e.message)}
    setLoginL(false)
  }

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
  const bank=getProf()

  return <div style={{minHeight:'100vh',background:'var(--bg)'}}>
    <div style={{background:'rgba(10,10,18,0.95)',borderBottom:'1px solid var(--border)',padding:'10px 18px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:50,backdropFilter:'blur(10px)',boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>
      <div style={{fontFamily:'var(--fh)',fontSize:14,color:'var(--cyan)',letterSpacing:2,fontWeight:900}}>⚔ ARENAGG</div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <LangSelector lang={lang} setLangFn={l=>{setLangState(l);setLang(l)}}/>
        <button onClick={()=>{window.location.hash='#/peserta'}} style={{background:'rgba(255,107,0,0.1)',border:'1px solid rgba(255,107,0,0.3)',borderRadius:5,padding:'5px 11px',color:'var(--orange)',cursor:'pointer',fontSize:9,fontFamily:'var(--fh)',letterSpacing:1,fontWeight:700}}>⚡ Portal Peserta</button>
        <button onClick={onBack} style={{background:'none',border:'1px solid var(--border)',borderRadius:4,padding:'4px 10px',color:'var(--muted)',cursor:'pointer',fontSize:10,fontFamily:'var(--fm)'}}>{i.back}</button>
      </div>
    </div>
    <div style={{maxWidth:540,margin:'0 auto',padding:'20px 16px'}}>
      {step==='detail'&&<div className="animate-in">
        <div style={{background:'linear-gradient(135deg,rgba(0,229,255,0.08),rgba(255,107,0,0.06))',border:'1px solid rgba(0,229,255,0.2)',borderRadius:12,padding:'22px 18px',marginBottom:12,textAlign:'center'}}>
          <span className={`tag tag-${t.status}`} style={{marginBottom:10,display:'inline-block'}}>{t.status}</span>
          <div style={{fontFamily:'var(--fh)',fontSize:20,fontWeight:900,marginBottom:5}}>{t.name}</div>
          <div style={{fontSize:12,color:'var(--muted)',marginBottom:10}}>🎮 {t.game} · 📍 {t.city}{t.time&&<span> · ⏰ {t.time} WIB</span>}</div>
          <div style={{fontFamily:'var(--fh)',fontSize:24,color:'var(--yellow)',fontWeight:900}}>{fmtRp(t.prize)}</div>
          <div style={{fontSize:10,color:'var(--muted)',marginTop:2,fontFamily:'var(--fm)'}}>{i.prize_pool}</div>
        </div>
        <div className="g2" style={{marginBottom:11}}>
          {[{icon:'🎫',label:i.entry,value:fmtRp(t.entry)+'/tim'},{icon:'📅',label:i.date,value:t.date+(t.time?' · '+t.time+' WIB':'')},{icon:'⚙',label:i.format,value:t.format},{icon:'👥',label:i.slots_left,value:`${slotsLeft}/${t.slots}`,color:slotsLeft<=3?'var(--red)':'var(--green)'}].map(d=><div key={d.label} className="card" style={{padding:'10px 12px',display:'flex',gap:8,alignItems:'center'}}><span style={{fontSize:18}}>{d.icon}</span><div><div style={{fontSize:9,fontFamily:'var(--fm)',color:'var(--muted)'}}>{d.label}</div><div style={{fontSize:13,fontWeight:600,color:d.color||'var(--text)',marginTop:1}}>{d.value}</div></div></div>)}
        </div>
        <div className="card" style={{marginBottom:11,borderColor:fillPct>=90?'rgba(255,45,85,0.3)':fillPct>=70?'rgba(255,107,0,0.2)':'var(--border)'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,fontSize:11}}>
            <span style={{color:'var(--muted)'}}>{i.slot_filled}</span>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{fontFamily:'var(--fm)',color:fillPct>=90?'var(--red)':fillPct>=70?'var(--orange)':'var(--cyan)',fontSize:10,fontWeight:700}}>{t.registered||0}/{t.slots}</span>
              {fillPct>=90&&<span style={{fontSize:9,color:'var(--red)',fontFamily:'var(--fh)',letterSpacing:1,animation:'pulse 1s infinite'}}>HAMPIR PENUH!</span>}
            </div>
          </div>
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

      {/* DIVIDER + LOGIN PESERTA */}
      {t?.status!=='closed'&&<div style={{marginTop:10}}>
        <div style={{display:'flex',alignItems:'center',gap:8,margin:'8px 0'}}>
          <div style={{flex:1,height:1,background:'var(--border)'}}/>
          <span style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1}}>SUDAH DAFTAR?</span>
          <div style={{flex:1,height:1,background:'var(--border)'}}/>
        </div>
        <button className="btn btn-orange btn-full" style={{fontSize:13,padding:13}} onClick={()=>setStep('login')}>⚡ Login Portal Peserta</button>
      </div>}
      </div>}
      {/* LOGIN STEP */}
      {step==='login'&&<div className="animate-in">
        <button onClick={()=>setStep('detail')} style={{background:'none',border:'none',color:'var(--muted)',cursor:'pointer',fontSize:12,marginBottom:14,fontFamily:'var(--fm)'}}>{i.back}</button>
        <div style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:900,color:'var(--orange)',marginBottom:4,letterSpacing:1}}>⚡ PORTAL PESERTA</div>
        <div style={{fontSize:12,color:'var(--muted)',marginBottom:20}}>Masuk dengan data yang kamu gunakan saat mendaftar</div>

        <div style={{marginBottom:12}}>
          <label style={{display:'block',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:5}}>⚔ NAMA TIM *</label>
          <input value={loginName} onChange={e=>setLoginName(e.target.value)} placeholder="Nama tim saat mendaftar..." onKeyDown={e=>e.key==='Enter'&&doLogin()} style={{fontSize:13}}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={{display:'block',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:5}}>📱 NO. HP *</label>
          <input value={loginContact} onChange={e=>setLoginContact(e.target.value)} placeholder="08xxxxxxxxxx" type="tel" onKeyDown={e=>e.key==='Enter'&&doLogin()} style={{fontSize:13}}/>
        </div>
        {loginErr&&<div style={{color:'var(--red)',fontSize:11,marginBottom:14,padding:'9px 12px',background:'rgba(255,45,85,0.07)',borderRadius:7,border:'1px solid rgba(255,45,85,0.2)',display:'flex',gap:6}}><span>⚠</span><span>{loginErr}</span></div>}
        <button className="btn btn-orange btn-full" onClick={doLogin} disabled={!loginName.trim()||!loginContact.trim()||loginLoading} style={{fontSize:12,padding:13}}>
          {loginLoading?<><Spinner size={14} color="#fff"/> Mencari...</>:'⚡ Masuk ke Portal Peserta'}
        </button>
        <div style={{marginTop:14,padding:'10px 12px',background:'rgba(255,107,0,0.05)',borderRadius:7,border:'1px solid rgba(255,107,0,0.15)',fontSize:11,color:'var(--muted)'}}>
          💡 Gunakan <b style={{color:'var(--text)'}}>Nama Tim</b> dan <b style={{color:'var(--text)'}}>No. HP</b> yang sama persis saat mendaftar
        </div>
        <div style={{textAlign:'center',marginTop:14,fontSize:11,color:'var(--muted)'}}>Belum daftar? <span onClick={()=>setStep('form')} style={{color:'var(--cyan)',cursor:'pointer',fontWeight:600}}>Daftar tim sekarang →</span></div>
      </div>}

      {step==='form'&&<div className="animate-in">
        <button onClick={()=>setStep('detail')} style={{background:'none',border:'none',color:'var(--muted)',cursor:'pointer',fontSize:12,marginBottom:14,fontFamily:'var(--fm)'}}>{i.back}</button>
        <div style={{fontFamily:'var(--fh)',fontSize:16,fontWeight:700,marginBottom:4,color:'var(--cyan)'}}>{i.reg_title}</div>
        <div style={{fontSize:12,color:'var(--muted)',marginBottom:14}}>{t.name}</div>
        <div className="card">
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:14}}>
            <div style={{position:'relative',cursor:'pointer'}} onClick={()=>document.getElementById('pub_photo_inp').click()}>
              <div style={{width:72,height:72,borderRadius:'50%',background:'linear-gradient(135deg,var(--cyan),var(--orange))',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',border:'3px solid var(--cyan)',fontSize:26,color:'#000'}}>
                {form.photo?<img src={form.photo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt=""/>:<span style={{fontSize:28}}>👤</span>}
              </div>
              <div style={{position:'absolute',bottom:0,right:0,width:22,height:22,background:'var(--cyan)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:'#000',border:'2px solid var(--bg)'}}>📷</div>
            </div>
            <input id="pub_photo_inp" type="file" accept="image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setForm(p=>({...p,photo:ev.target.result}));r.readAsDataURL(f)}}/>
            <div style={{fontSize:9,color:'var(--muted)',marginTop:5,fontFamily:'var(--fm)',letterSpacing:1}}>FOTO TIM (opsional)</div>
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
      {step==='success'&&<div className="animate-in" style={{padding:'24px 0'}}>
        {/* HEADER SUKSES */}
        <div style={{textAlign:'center',marginBottom:24}}>
          <div style={{fontSize:60,marginBottom:10,animation:'bounce-in 0.6s ease'}}>🎉</div>
          <div style={{fontFamily:'var(--fh)',fontSize:20,fontWeight:900,color:'var(--green)',marginBottom:6,letterSpacing:1}}>{i.success_title}</div>
          <div style={{fontSize:13,color:'var(--muted)',lineHeight:1.8}}><b style={{color:'var(--text)'}}>{form.name}</b> {i.success_msg} <b style={{color:'var(--cyan)'}}>{t.name}</b></div>
        </div>

        {/* KARTU INFO TIM */}
        <div style={{background:'linear-gradient(135deg,rgba(0,255,136,0.07),rgba(0,229,255,0.05))',border:'1px solid rgba(0,255,136,0.25)',borderRadius:12,padding:'16px 18px',marginBottom:16}}>
          <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--green)',letterSpacing:2,marginBottom:12}}>✓ DATA PENDAFTARAN</div>
          {[
            {label:'Nama Tim',val:form.name,icon:'⚔'},
            {label:'Kapten',val:form.captain,icon:'👤'},
            {label:'No. HP',val:form.contact,icon:'📱'},
            {label:'Jumlah Member',val:form.members+' orang',icon:'👥'},
            {label:'Turnamen',val:t.name,icon:'🏆'},
            {label:'Game',val:t.game,icon:'🎮'},
            {label:'Kota',val:t.city,icon:'📍'},
          ].map(s=>(
            <div key={s.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
              <span style={{fontSize:11,color:'var(--muted)'}}>{s.icon} {s.label}</span>
              <span style={{fontSize:12,fontWeight:600}}>{s.val}</span>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',marginTop:4}}>
            <span style={{fontFamily:'var(--fm)',fontSize:10,color:'var(--yellow)'}}>🏅 ENTRY FEE</span>
            <span style={{fontFamily:'var(--fh)',fontSize:14,fontWeight:900,color:'var(--yellow)'}}>Rp {Number(t.entry).toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* LINK LIVE — cara akses saat bertanding */}
        <div style={{background:'rgba(255,45,85,0.06)',border:'1px solid rgba(255,45,85,0.25)',borderRadius:12,padding:'16px 18px',marginBottom:16}}>
          <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--red)',letterSpacing:2,marginBottom:10,display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:7,height:7,borderRadius:'50%',background:'var(--red)',animation:'pulse 0.8s infinite',display:'inline-block'}}/>
            LINK LIVE PERTANDINGAN
          </div>
          <div style={{fontSize:12,color:'var(--muted)',marginBottom:12,lineHeight:1.7}}>
            Gunakan link ini saat turnamen berlangsung untuk <b style={{color:'var(--text)'}}>pantau skor real-time</b> & <b style={{color:'var(--text)'}}>obrolan langsung</b>
          </div>
          <div style={{background:'rgba(0,0,0,0.2)',borderRadius:7,padding:'10px 12px',marginBottom:10,display:'flex',alignItems:'center',gap:8,border:'1px solid rgba(255,255,255,0.06)'}}>
            <span style={{fontFamily:'var(--fm)',fontSize:10,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:'var(--cyan)'}}>{window.location.origin}/#/live/{t.id}</span>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <button className="btn btn-danger" style={{flex:'1 1 auto',justifyContent:'center',fontSize:10}} onClick={()=>{
              const link=window.location.origin+'/#/live/'+t.id
              if(navigator.clipboard)navigator.clipboard.writeText(link).then(()=>{}).catch(()=>{})
              else{const el=document.createElement('textarea');el.value=link;document.body.appendChild(el);el.select();document.execCommand('copy');document.body.removeChild(el)}
              toast('✓ Link live disalin!','success')
            }}>🔗 Salin Link Live</button>
            <a href={`https://wa.me/?text=${encodeURIComponent('🔴 LINK LIVE TURNAMEN\n⚔ '+t.name+'\n🎮 '+t.game+'\n\n👉 Pantau skor & chat live:\n'+window.location.origin+'/#/live/'+t.id+'\n\nBuka link di atas saat pertandingan dimulai!')}`} target="_blank" rel="noreferrer"
              style={{flex:'1 1 auto',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:6,padding:'9px 12px',background:'#25D366',borderRadius:7,color:'#fff',textDecoration:'none',fontFamily:'var(--fh)',fontSize:10,fontWeight:700,letterSpacing:1,boxShadow:'0 4px 12px rgba(37,211,102,0.25)'}}>📱 Share via WA</a>
          </div>
        </div>

        {/* CARA PEMBAYARAN */}
        {(bank.bankName||bank.waNumber)&&<div style={{background:'rgba(255,215,0,0.06)',border:'1px solid rgba(255,215,0,0.2)',borderRadius:12,padding:'16px 18px',marginBottom:16}}>
          <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--yellow)',letterSpacing:2,marginBottom:10}}>💳 CARA PEMBAYARAN ENTRY FEE</div>
          {bank.bankName&&<div style={{fontSize:13,marginBottom:4}}>🏦 <b>{bank.bankName}</b></div>}
          {bank.accNumber&&<div style={{fontSize:13,marginBottom:4}}>No: <b style={{fontFamily:'var(--fm)',color:'var(--cyan)',letterSpacing:1}}>{bank.accNumber}</b></div>}
          {bank.accName&&<div style={{fontSize:13,marginBottom:4}}>a.n. <b>{bank.accName}</b></div>}
          {bank.waNumber&&<div style={{marginTop:8}}>
            <a href={`https://wa.me/${bank.waNumber.replace(/[^0-9]/g,'').replace(/^0/,'62')}?text=${encodeURIComponent('Halo, saya ingin konfirmasi pembayaran entry fee turnamen '+t.name+'\nNama Tim: '+form.name+'\nKapten: '+form.captain)}`}
              target="_blank" rel="noreferrer"
              style={{display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',background:'#25D366',borderRadius:6,color:'#fff',textDecoration:'none',fontFamily:'var(--fh)',fontSize:9,fontWeight:700,letterSpacing:1}}>📱 Konfirmasi Bayar via WA</a>
          </div>}
        </div>}

        {/* TOMBOL */}
        {/* Link portal peserta */}
        <div style={{background:'rgba(255,107,0,0.05)',border:'1px solid rgba(255,107,0,0.2)',borderRadius:10,padding:'12px 14px',marginBottom:14}}>
          <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--orange)',letterSpacing:2,marginBottom:6}}>⚡ PORTAL PESERTA</div>
          <div style={{fontSize:11,color:'var(--muted)',marginBottom:8}}>Login dengan <b style={{color:'var(--text)'}}>Nama Tim</b> & <b style={{color:'var(--text)'}}>No. HP</b> untuk akses dashboard tim, pantau skor live & chat</div>
          <a href={window.location.origin+'/#/peserta'} target="_blank" rel="noreferrer" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'8px 14px',background:'var(--orange)',borderRadius:6,color:'#fff',textDecoration:'none',fontFamily:'var(--fh)',fontSize:9,fontWeight:700,letterSpacing:1}}>⚡ Buka Portal Peserta →</a>
        </div>
        <div style={{display:'flex',gap:8,justifyContent:'center'}}>
          <button className="btn btn-ghost" onClick={()=>setStep('detail')} style={{fontSize:11}}>{i.back_detail}</button>
        </div>
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
  const NAV=[{icon:'⚡'},{icon:'📈'},{icon:'🏆'},{icon:'＋'},{icon:'👥'},{icon:'📊'},{icon:'🔴'},{icon:'🏅'},{icon:'💰'},{icon:'⚙'}]
  const NAV_KEYS=['D','R','T','N','P','B','L','M','F','S']
  // Keyboard shortcuts
  useEffect(()=>{
    const handler=e=>{
      if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT'||e.metaKey||e.ctrlKey)return
      const k=e.key.toLowerCase()
      const map={d:'dashboard',r:'revenue',t:'tournaments',n:'create',p:'teams',b:'bracket',l:'live',m:'leaderboard',f:'finance',s:'settings'}
      if(map[k])setPage(map[k])
    }
    window.addEventListener('keydown',handler)
    return()=>window.removeEventListener('keydown',handler)
  },[])
  // Count pending stuff for badges
  const pendingPaymentsCount = 0 // Will be loaded per TeamsView

  return <div className="sidebar">
    <div style={{padding:'14px 13px 11px',borderBottom:'1px solid var(--border)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:2}}>
        <div style={{fontFamily:'var(--fh)',fontWeight:900,fontSize:14,color:'var(--cyan)',letterSpacing:2,animation:'glow-pulse 3s infinite'}}>⚔ ARENAGG</div>
        <NotifBell setPage={setPage}/>
      </div>
      <div style={{fontSize:8,color:'var(--muted)',fontFamily:'var(--fm)',marginTop:2,letterSpacing:2}}>TOURNAMENT PLATFORM</div>
      {hasLive&&<div style={{marginTop:7,display:'flex',alignItems:'center',gap:6,padding:'4px 8px',background:'rgba(255,45,85,0.1)',borderRadius:4,border:'1px solid rgba(255,45,85,0.25)'}}>
        <span style={{width:7,height:7,borderRadius:'50%',background:'var(--red)',animation:'pulse 0.8s infinite',display:'inline-block',flexShrink:0}}/>
        <span style={{fontFamily:'var(--fh)',fontSize:9,color:'var(--red)',letterSpacing:1,fontWeight:700}}>LIVE NOW</span>
      </div>}
    </div>
    <nav style={{flex:1,padding:'8px 7px',overflowY:'auto'}}>
      {NAV_IDS.map((id,idx)=><button key={id} className={`nav-item ${page===id?'active':''}`} onClick={()=>setPage(id)} title={`${i.nav[idx]} (${NAV_KEYS[idx]})`}>
        <span className="nav-icon">{NAV[idx].icon}</span>
        <span>{i.nav[idx]}</span>
        {id==='tournaments'&&(hasLive?<span style={{marginLeft:'auto',width:6,height:6,borderRadius:'50%',background:'var(--red)',animation:'pulse 0.8s infinite',display:'inline-block',flexShrink:0}}/>:<span style={{marginLeft:'auto',fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',background:'rgba(255,255,255,0.05)',padding:'1px 5px',borderRadius:8}}>{tournaments?.length||''}</span>)}
          {id==='live'&&hasLive&&<span className="nav-live-dot"/>}
          {id==='leaderboard'&&<span style={{marginLeft:'auto',fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',background:'rgba(255,255,255,0.05)',padding:'1px 5px',borderRadius:8}}>{(tournaments||[]).length}</span>}
      </button>)}
    </nav>
    <div style={{padding:'10px 13px',borderTop:'1px solid var(--border)'}}>
      <div style={{display:'flex',alignItems:'center',gap:9,marginBottom:9,cursor:'pointer',padding:'5px 7px',borderRadius:8,transition:'var(--trans)'}} onClick={()=>setPage('settings')} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.04)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
        <div style={{width:34,height:34,borderRadius:'50%',background:'linear-gradient(135deg,var(--cyan),var(--orange))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13,color:'#000',flexShrink:0,overflow:'hidden',border:'2px solid rgba(0,229,255,0.25)'}}>
          {photo?<img src={photo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt=""/>:<span>{name[0].toUpperCase()}</span>}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:11,fontWeight:600,lineHeight:1.2,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{name}</div>
          <div style={{fontSize:9,color:'var(--green)',fontFamily:'var(--fm)',marginTop:1,display:'flex',alignItems:'center',gap:4}}><span className="live-dot"/>{i.online}</div>
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
  const icons=['⚡','📈','🏆','＋','👥','📊','🔴','🏅','💰','⚙']
  return <nav className="bottom-nav">
    {NAV_IDS.map((id,idx)=><button key={id} className={`bnav-item ${page===id?'active':''}`} onClick={()=>setPage(id)}>
      <span className="bnav-icon">{icons[idx]}{id==='tournaments'&&hasLive&&<span style={{width:4,height:4,borderRadius:'50%',background:'var(--red)',display:'inline-block',marginLeft:1,verticalAlign:'top'}}/>}</span>
      <span>{i.nav[idx].slice(0,5)}</span>
    </button>)}
  </nav>
}

// DASHBOARD ELEGAN & PROFESIONAL
function Dashboard({tournaments,teams,setPage,loading,lang,toast}){
  const i=T[lang]||T.id
  const totalPrize=tournaments.reduce((s,t)=>s+Number(t.prize),0)
  const totalRev=tournaments.reduce((s,t)=>s+(Number(t.entry)*teams.filter(x=>x.tournament_id===t.id&&x.paid).length*0.15),0)
  const totalP=teams.reduce((s,t)=>s+t.members,0)
  const liveT=tournaments.filter(t=>t.status==='live')
  const activeT=tournaments.filter(t=>t.status==='active')
  const prof=getProf()
  const name=prof.name||'Organizer'
  const now=new Date();const h=now.getHours()
  const greeting=h<12?'Selamat Pagi ☀':h<15?'Selamat Siang 🌤':h<18?'Selamat Sore 🌅':'Selamat Malam 🌙'
  const greetingEn=h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening'
  const totalTeams=teams.length
  const totalPlayers=teams.reduce((s,t)=>s+Number(t.members||0),0)
  // Animated counter hook
  const useCount=(target,dur=800)=>{
    const[v,setV]=React.useState(0)
    React.useEffect(()=>{
      let start=0;const step=()=>{start+=Math.ceil((target-start)/8)||1;setV(Math.min(start,target));if(start<target)requestAnimationFrame(step)}
      const t=setTimeout(step,100);return()=>clearTimeout(t)
    },[target])
    return v
  }

  // Request notification permission on first load
  React.useEffect(()=>{
    const asked = localStorage.getItem('arenagg_notif_asked')
    if(!asked){ requestNotifPermission().then(()=>localStorage.setItem('arenagg_notif_asked','1')) }
  },[])

  if(loading)return <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh'}}><div style={{textAlign:'center'}}><div style={{fontFamily:'var(--fh)',fontSize:14,color:'var(--cyan)',letterSpacing:3,animation:'glow-pulse 2s infinite',marginBottom:16}}>⚔ ARENAGG</div><Spinner size={28} color="var(--cyan)"/><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginTop:12,letterSpacing:2}}>MEMUAT DATA...</div></div></div>
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    {/* GREETING SECTION */}
    <div style={{marginBottom:22,padding:'18px 22px',background:'linear-gradient(135deg,rgba(0,229,255,0.06),rgba(255,107,0,0.04))',borderRadius:12,border:'1px solid rgba(0,229,255,0.12)'}}>
      <div style={{fontFamily:'var(--fm)',fontSize:10,color:'var(--muted)',letterSpacing:2,marginBottom:4}}>{greeting.toUpperCase()}</div>
      <div style={{fontFamily:'var(--fh)',fontSize:20,fontWeight:900,color:'var(--cyan)',marginBottom:3}}>{name.toUpperCase()}</div>
      <div style={{color:'var(--muted)',fontSize:11,fontFamily:'var(--fm)',letterSpacing:1}}>{i.dash_sub}</div>
      <div style={{marginTop:8,display:'flex',gap:8,flexWrap:'wrap'}}>
        <span className="metric-chip metric-neutral">📅 {new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</span>
        {liveT.length>0&&<span className="metric-chip metric-down">🔴 {liveT.length} Turnamen LIVE</span>}
        {activeT.length>0&&<span className="metric-chip metric-up">● {activeT.length} Turnamen Aktif</span>}
      </div>
    </div>
    {/* ===== IKLAN LIVE GAME ===== */}
    <div style={{marginBottom:6}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
        <span style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:2}}>📺 IKLAN LIVE</span>
        <button onClick={()=>setPage('settings')} style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',background:'none',border:'none',cursor:'pointer',letterSpacing:1}}>Kelola Sponsor →</button>
      </div>
      <AdBanner/>
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
        {icon:'🏆',label:i.nav[2],value:tournaments.length,dispVal:String(tournaments.length),color:'var(--cyan)',accent:'var(--cyan)',trend:tournaments.length>0?`+${tournaments.length} total`:'Buat sekarang'},
        {icon:'👥',label:i.nav[4],value:totalP,dispVal:String(totalP),color:'var(--green)',accent:'var(--green)',trend:teams.length+' tim terdaftar'},
        {icon:'💰',label:i.nav[6],value:totalPrize,dispVal:fmtRp(totalPrize),color:'var(--yellow)',accent:'var(--yellow)',trend:'Total prize pool'},
        {icon:'📈',label:i.nav[1],value:Math.round(totalRev),dispVal:fmtRp(totalRev),color:'var(--orange)',accent:'var(--orange)',trend:'Komisi 15%'},
      ].map((s,idx)=><div key={idx} className="stat-card" style={{'--accent-color':s.accent,animationDelay:idx*0.08+'s'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
          <div style={{width:38,height:38,borderRadius:8,background:`linear-gradient(135deg,rgba(${s.color==='var(--cyan)'?'0,229,255':s.color==='var(--green)'?'0,255,136':s.color==='var(--yellow)'?'255,215,0':'255,107,0'},0.15),rgba(${s.color==='var(--cyan)'?'0,229,255':s.color==='var(--green)'?'0,255,136':s.color==='var(--yellow)'?'255,215,0':'255,107,0'},0.05))`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:18}}>{s.icon}</div>
          <span style={{fontSize:9,color:s.color,fontFamily:'var(--fm)',background:`rgba(${s.color==='var(--cyan)'?'0,229,255':s.color==='var(--green)'?'0,255,136':s.color==='var(--yellow)'?'255,215,0':'255,107,0'},0.1)`,padding:'2px 7px',borderRadius:10,border:`1px solid rgba(${s.color==='var(--cyan)'?'0,229,255':s.color==='var(--green)'?'0,255,136':s.color==='var(--yellow)'?'255,215,0':'255,107,0'},0.2)`}}>{s.trend}</span>
        </div>
        <div style={{fontSize:9,fontFamily:'var(--fm)',color:'var(--muted)',letterSpacing:1,textTransform:'uppercase',marginBottom:4}}>{s.label}</div>
        <div style={{fontSize:20,fontFamily:'var(--fh)',fontWeight:900,color:s.color,lineHeight:1,animation:'count-up 0.5s ease both'}}>{s.dispVal||s.value}</div>
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
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1}}>{i.revenue_lbl}</div>
        <button onClick={()=>setPage('revenue')} style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',background:'none',border:'none',cursor:'pointer',letterSpacing:1}}>Ver todo →</button>
      </div>
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
      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
        <button className="btn btn-cyan" onClick={()=>setPage('create')} style={{flex:'1 1 auto'}}>{i.btn_create}</button>
        <button className="btn btn-orange" onClick={()=>setPage('revenue')} style={{flex:'1 1 auto'}}>{i.btn_comm}</button>
        <button className="btn btn-ghost" onClick={()=>setPage('teams')} style={{flex:'1 1 auto'}}>{i.btn_part}</button>
        <button className="btn btn-dark" onClick={()=>setPage('tournaments')} style={{flex:'1 1 auto'}}>🏆 {i.tourn_title}</button>
        <button className="btn btn-dark" onClick={()=>setPage('leaderboard')} style={{flex:'1 1 auto'}}>🏅 Ranking</button>
      </div>
      <div style={{borderTop:'1px solid var(--border)',paddingTop:14}}>
        <div style={{fontFamily:'var(--fh)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:10}}>RINGKASAN STATUS</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
          {[
            {label:'Live',val:liveT.length,color:'var(--red)',icon:'🔴'},
            {label:'Aktif',val:activeT.length,color:'var(--green)',icon:'●'},
            {label:'Total',val:tournaments.length,color:'var(--cyan)',icon:'🏆'},
          ].map(s=>(
            <div key={s.label} style={{textAlign:'center',padding:'8px 4px',background:'rgba(255,255,255,0.03)',borderRadius:6,border:'1px solid var(--border)'}}>
              <div style={{fontSize:16,marginBottom:2}}>{s.icon}</div>
              <div style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:900,color:s.color,lineHeight:1}}>{s.val}</div>
              <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:1,marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  {/* LIVE CHAT WIDGET - show if there are live tournaments */}
    {liveT.length>0&&<div className="card" style={{borderColor:'rgba(255,45,85,0.25)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--red)',letterSpacing:1,display:'flex',alignItems:'center',gap:6}}><span style={{width:7,height:7,borderRadius:'50%',background:'var(--red)',animation:'pulse 0.8s infinite',display:'inline-block'}}/>LIVE SEKARANG</div>
        <button onClick={()=>setPage('live')} className="btn btn-danger btn-sm">Buka Live →</button>
      </div>
      {liveT.map(lt=><div key={lt.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
        <span style={{fontSize:16}}>🔴</span>
        <div style={{flex:1}}>
          <div style={{fontSize:12,fontWeight:700}}>{lt.name}</div>
          <div style={{fontSize:10,color:'var(--muted)'}}>🎮 {lt.game} · {lt.registered||0}/{lt.slots} Tim</div>
        </div>
        <button onClick={()=>{const link=`${window.location.origin}/#/live/${lt.id}`;if(navigator.clipboard)navigator.clipboard.writeText(link).then(()=>toast('✓ Link live disalin!','success')).catch(()=>{})}} className="btn btn-ghost btn-sm" style={{fontSize:8}}>🔗 Share</button>
      </div>)}
    </div>}
  </div>
}

function TournamentList({tournaments,teams=[],updateT,deleteT,setPage,setEditT,toast,onPreview,lang}){
  const i=T[lang]||T.id
  const[filter,setF]=useState('all');const[shareT,setShareT]=useState(null);const[search,setSearch]=useState('');const statusCounts={all:tournaments.length,active:tournaments.filter(t=>t.status==='active').length,live:tournaments.filter(t=>t.status==='live').length,closed:tournaments.filter(t=>t.status==='closed').length,pending:tournaments.filter(t=>t.status==='pending').length}
  const filtered=(filter==='all'?tournaments:tournaments.filter(t=>t.status===filter)).filter(t=>!search||t.name.toLowerCase().includes(search.toLowerCase())||t.game.toLowerCase().includes(search.toLowerCase()))
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:10}}>
      <div><h1 style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:700}}>{i.tourn_title}</h1><p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)'}}>{filtered.length}/{tournaments.length} TURNAMEN</p></div>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Cari nama / game..." style={{width:180,padding:'7px 12px',fontSize:12}}/>
        <ExportButton tournaments={tournaments} teams={teams} toast={toast}/>
        <button className="btn btn-cyan" onClick={()=>{setEditT(null);setPage('create')}}>{i.btn_create_t}</button>
      </div>
    </div>
    <div style={{display:'flex',gap:5,marginBottom:13,flexWrap:'wrap'}}>
      {['all','active','live','closed','pending'].map(s=><button key={s} onClick={()=>setF(s)} style={{padding:'4px 11px',borderRadius:5,border:'1px solid',cursor:'pointer',fontFamily:'var(--fm)',fontSize:9,textTransform:'uppercase',letterSpacing:1,transition:'var(--trans)',display:'inline-flex',alignItems:'center',gap:5,background:filter===s?'var(--cyan)':'transparent',color:filter===s?'#000':'var(--muted)',borderColor:filter===s?'var(--cyan)':'var(--border)'}}>{s}<span style={{padding:'0 4px',borderRadius:8,background:filter===s?'rgba(0,0,0,0.15)':'rgba(255,255,255,0.08)',fontSize:8}}>{statusCounts[s]||0}</span></button>)}
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
  const[formChanged,setFormChanged]=React.useState(false)
  const i=T[lang]||T.id
  const empty={name:'',game:GAMES[0],prize:'',entry:'',slots:'16',format:FORMATS[0],date:'',time:'',city:'',description:''}
  const[form,setForm]=useState(editData?{...editData,description:editData.description||''}:empty)
  const[saving,setSaving]=useState(false)
  const set=k=>e=>setForm(f=>({...f,[k]:e.target.value}))
  useEffect(()=>{setForm(editData?{...editData,description:editData.description||''}:empty)},[editData?.id])

  const submit=async()=>{
    if(!form.name||!form.prize||!form.entry||!form.date||!form.city){
      const missing=[]
      if(!form.name)missing.push('Nama Turnamen')
      if(!form.city)missing.push('Kota')
      if(!form.date)missing.push('Tanggal')
      if(!form.prize)missing.push('Prize Pool')
      if(!form.entry)missing.push('Entry Fee')
      toast('⚠ Wajib diisi: '+missing.join(', '),'error')
      return
    }
    setSaving(true)
    try{
      const data={name:form.name,game:form.game,prize:Number(form.prize),entry:Number(form.entry),slots:Number(form.slots),format:form.format,date:form.date+(form.time?' '+form.time:''),city:form.city,description:form.description}
      if(editData){
        await updateT(editData.id,data)
        toast('✓ Turnamen diupdate!','success')
      } else {
        await addT({...data,registered:0,status:'pending'})
        toast('✓ Turnamen dibuat! Cek tab Turnamen.','success');addNotif('🏆 Turnamen "'+data.name+'" berhasil dibuat!','tournament','tournaments')
      }
      setForm(empty);setEditT(null)
    }catch(e){
      toast('Error: '+e.message,'error')
      console.error('Submit error:',e)
    }
    setSaving(false)
  }
  const estTotal=Number(form.entry||0)*Number(form.slots||0)
  const estComm=estTotal*0.15
  const fillPct=editData?Math.round(((editData.registered||0)/Number(form.slots||1))*100):0
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:900}}>
    <div style={{marginBottom:18}}>
      <h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700,color:'var(--cyan)'}}>{editData?i.edit_title:i.create_title}</h1>
      <p style={{color:'var(--muted)',fontSize:10,marginTop:3,fontFamily:'var(--fm)'}}>LENGKAPI INFORMASI TURNAMEN</p>
    </div>
    <div className='create-layout' style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:16,alignItems:'start'}}>
      {/* FORM */}
      <div className="card">
        <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:2,marginBottom:14}}>INFO DASAR</div>
        <div style={{marginBottom:12}}><label>{i.tourn_name}</label><input value={form.name} onChange={set('name')} placeholder="ML Grand Prix 2026"/></div>
        <div className="g2" style={{marginBottom:12}}>
          <div><label>{i.game}</label><select value={form.game} onChange={set('game')}>{GAMES.map(g=><option key={g}>{g}</option>)}</select></div>
          <div><label>{i.format}</label><select value={form.format} onChange={set('format')}>{FORMATS.map(f=><option key={f}>{f}</option>)}</select></div>
        </div>
        <div className='create-form-grid' style={{display:'grid',gridTemplateColumns:'minmax(150px,1.5fr) minmax(150px,1fr) minmax(120px,0.8fr)',gap:12,marginBottom:12}}>
          <div><label>📍 {i.city} <span style={{color:'var(--red)'}}>*</span></label><input value={form.city} onChange={set('city')} placeholder="Jakarta" style={{width:'100%'}}/></div>
          <div><label>📅 {i.date} <span style={{color:'var(--red)'}}>*</span></label><input type="date" value={form.date} onChange={set('date')} style={{width:'100%',colorScheme:'dark'}}/></div>
          <div>
            <label>⏰ Jam Mulai</label>
            <div style={{position:'relative'}}>
              <input
                type="time"
                value={form.time}
                onChange={set('time')}
                style={{paddingLeft:10,paddingRight:8,width:'100%',
                  colorScheme:'dark',background:form.time?'rgba(0,229,255,0.08)':'rgba(255,255,255,0.04)',
                  border:form.time?'1px solid rgba(0,229,255,0.4)':'1px solid var(--border)',
                  transition:'all 0.2s'
                }}
              />
              {!form.time&&<div style={{position:'absolute',top:'50%',left:10,transform:'translateY(-50%)',pointerEvents:'none',fontSize:11,color:'var(--muted)',fontFamily:'var(--fm)'}}>00:00</div>}
            </div>
            {/* Quick time buttons */}
            <div style={{display:'flex',gap:3,marginTop:5,flexWrap:'wrap'}}>
              {['08:00','10:00','13:00','15:00','19:00','20:00'].map(t=>(
                <button key={t} type="button"
                  onClick={()=>setForm(f=>({...f,time:t}))}
                  style={{padding:'2px 5px',fontSize:8,border:`1px solid ${form.time===t?'var(--cyan)':'var(--border)'}`,
                    borderRadius:3,cursor:'pointer',fontFamily:'var(--fm)',letterSpacing:0.5,
                    background:form.time===t?'rgba(0,229,255,0.15)':'rgba(255,255,255,0.03)',
                    color:form.time===t?'var(--cyan)':'var(--muted)',transition:'all 0.15s'
                  }}>{t}</button>
              ))}
            </div>
          </div>
        </div>
        <hr className="div"/>
        <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:2,marginBottom:14}}>PRIZE & BIAYA</div>
        <div className="g3 create-form-grid" style={{marginBottom:12}}>
          <div><label>🏆 {i.prize}</label><input type="number" value={form.prize} onChange={set('prize')} placeholder="2000000"/></div>
          <div><label>🎫 {i.entry}</label><input type="number" value={form.entry} onChange={set('entry')} placeholder="25000"/></div>
          <div><label>👥 {i.slots}</label><select value={form.slots} onChange={set('slots')}>{[4,8,16,32,64].map(n=><option key={n}>{n}</option>)}</select></div>
        </div>
        <hr className="div"/>
        <div style={{marginBottom:16}}><label>📝 {i.desc}</label><textarea rows={3} value={form.description} onChange={set('description')} placeholder="Contoh: Jam mulai 20:00 WIB. Deskripsi turnamen, syarat peserta, info hadiah..." style={{resize:'vertical'}}/></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-cyan" onClick={submit} disabled={saving} style={{minWidth:130}}>
            {saving?<><Spinner size={13} color="#000"/> Menyimpan...</>:editData?i.btn_save:i.btn_create2}
          </button>
          {editData&&<button className="btn btn-ghost" onClick={()=>{setEditT(null);setForm(empty)}}>{i.btn_cancel}</button>}
        </div>
      </div>
      {/* LIVE PREVIEW */}
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <div style={{background:'linear-gradient(135deg,rgba(0,229,255,0.06),rgba(255,107,0,0.04))',border:'1px solid rgba(0,229,255,0.2)',borderRadius:12,padding:18,position:'sticky',top:20}}>
          <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:2,marginBottom:12}}>👁 PREVIEW PESERTA</div>
          <div style={{textAlign:'center',marginBottom:14}}>
            <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:2,marginBottom:6}}>🎮 {form.game||'Game'}</div>
            <div style={{fontFamily:'var(--fh)',fontSize:16,fontWeight:900,marginBottom:4,lineHeight:1.2}}>{form.name||'Nama Turnamen'}</div>
            <div style={{fontSize:11,color:'var(--muted)',marginBottom:10}}>📍 {form.city||'Kota'} · 📅 {form.date||'Tanggal'}{form.time&&<span style={{color:'var(--cyan)'}}> · ⏰ {form.time} WIB</span>}</div>
            <div style={{fontFamily:'var(--fh)',fontSize:22,color:'var(--yellow)',fontWeight:900}}>{form.prize?fmtRp(Number(form.prize)):'Rp 0'}</div>
            <div style={{fontSize:9,color:'var(--muted)',fontFamily:'var(--fm)',marginTop:2}}>PRIZE POOL</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
            {[
              {label:'Entry Fee',val:form.entry?fmtRp(Number(form.entry))+'/tim':'—'},
              {label:'Slot',val:`${editData?.registered||0}/${form.slots} Tim`},
              {label:'Format',val:form.format||'—'},
              {label:'Status',val:editData?.status||'pending'},
            ].map(s=><div key={s.label} style={{background:'rgba(255,255,255,0.04)',borderRadius:6,padding:'8px 10px'}}>
              <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:1}}>{s.label}</div>
              <div style={{fontSize:11,fontWeight:600,marginTop:2}}>{s.val}</div>
            </div>)}
          </div>
          {editData&&<div style={{marginBottom:12}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:10,marginBottom:4}}><span style={{color:'var(--muted)',fontFamily:'var(--fm)',fontSize:9}}>SLOT TERISI</span><span style={{fontFamily:'var(--fm)',fontSize:9,color:fillPct>=90?'var(--red)':'var(--cyan)'}}>{fillPct}%</span></div>
            <div className="pbar"><div className="pfill" style={{width:fillPct+'%',background:fillPct>=90?'var(--red)':fillPct>=70?'var(--orange)':'var(--cyan)'}}/></div>
          </div>}
          {estTotal>0&&<div style={{borderTop:'1px solid var(--border)',paddingTop:12}}>
            <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,marginBottom:6}}>ESTIMASI PENDAPATAN</div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:4}}><span>Total Entry</span><span style={{fontFamily:'var(--fh)',color:'var(--cyan)'}}>{fmtRp(estTotal)}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12}}><span>Komisi 15%</span><span style={{fontFamily:'var(--fh)',color:'var(--green)'}}>{fmtRp(estComm)}</span></div>
          </div>}
        </div>
      </div>
    </div>
  </div>
}


function TeamsView({teams,tournaments,addTeam,updateTeam,deleteTeam,lang,toast}){
  const[pendingPayments,setPendingPayments]=React.useState([])
  const[showPayments,setShowPayments]=React.useState(false)
  
  // Load pending payment submissions from Supabase
  React.useEffect(()=>{
    if(!tournaments.length) return
    const load=async()=>{
      try{
        const {data}=await supabase.from('payment_submissions')
          .select('*,teams(name,captain,contact,tournament_id)')
          .eq('status','pending')
          .order('submitted_at',{ascending:false})
        if(data){
          // Only show payments for our tournaments
          const ourTids=new Set(tournaments.map(t=>t.id))
          setPendingPayments(data.filter(p=>ourTids.has(p.tournament_id)))
        }
      }catch(e){}
    }
    load()
    // Refresh every 30s
    const interval=setInterval(load,30000)
    return()=>clearInterval(interval)
  },[tournaments])

  const confirmPayment=async(paymentId,teamId)=>{
    try{
      await supabase.from('payment_submissions').update({status:'confirmed'}).eq('id',paymentId)
      await updateTeam(teamId,{paid:true})
      setPendingPayments(p=>p.filter(x=>x.id!==paymentId))
      if(toast)toast('✓ Pembayaran dikonfirmasi! Tim ditandai lunas.','success')
    }catch(e){ if(toast)toast('Error konfirmasi: '+e.message,'error') }
  }
  const rejectPayment=async(paymentId)=>{
    try{
      await supabase.from('payment_submissions').update({status:'rejected'}).eq('id',paymentId)
      setPendingPayments(p=>p.filter(x=>x.id!==paymentId))
      if(toast)toast('Bukti bayar ditolak.','info')
    }catch(e){}
  }
  const i=T[lang]||T.id
  const[selT,setSelT]=useState('all')
  const[showAdd,setShowAdd]=useState(false)
  const[search,setSearch]=useState('')
  const[viewMode,setViewMode]=useState('table') // 'table' or 'cards'
  const[form,setForm]=useState({name:'',captain:'',contact:'',members:'5',paid:false,tournament_id:tournaments[0]?.id||''})
  const[saving,setSaving]=useState(false)
  const filtered=(selT==='all'?teams:teams.filter(t=>t.tournament_id===selT))
    .filter(t=>!search||t.name.toLowerCase().includes(search.toLowerCase())||t.captain.toLowerCase().includes(search.toLowerCase()))
  const paidCount=filtered.filter(t=>t.paid).length
  // Fungsi login peserta
  const doLogin=async()=>{
    if(!loginName.trim()||!loginContact.trim()){setLoginErr('Isi nama tim dan no. HP');return}
    setLoginErr('');setLoginL(true)
    try{
      const{data:teamData,error}=await supabase
        .from('teams').select('*,tournaments(*)')
        .ilike('name',loginName.trim())
        .eq('contact',loginContact.trim())
        .eq('tournament_id',tid.trim())
        .single()
      if(error||!teamData){
        setLoginErr('Tim tidak ditemukan di turnamen ini. Pastikan nama tim dan no. HP sesuai saat pendaftaran.')
        setLoginL(false);return
      }
      // Simpan ke localStorage dan redirect ke portal
      const participant={
        id:teamData.id,name:teamData.name,captain:teamData.captain,
        contact:teamData.contact,members:teamData.members,
        photo:teamData.photo,paid:teamData.paid,
        tournamentId:teamData.tournament_id,
        tournament:teamData.tournaments,
        loginAt:Date.now()
      }
      try{localStorage.setItem('arenagg_participant',JSON.stringify(participant))}catch(e){}
      // Redirect ke portal peserta
      window.location.hash='#/peserta'
      window.location.reload()
    }catch(e){setLoginErr('Error: '+e.message)}
    setLoginL(false)
  }

  const submit=async()=>{
    if(!form.name||!form.captain||!form.tournament_id)return
    setSaving(true)
    await addTeam({name:form.name,captain:form.captain,contact:form.contact,members:Number(form.members),paid:form.paid,tournament_id:form.tournament_id})
    setShowAdd(false);setSaving(false)
    setForm({name:'',captain:'',contact:'',members:'5',paid:false,tournament_id:tournaments[0]?.id||''})
  }
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    {/* PENDING PAYMENT NOTIFICATIONS */}
    {pendingPayments.length>0&&<div style={{background:'linear-gradient(135deg,rgba(255,215,0,0.08),rgba(255,107,0,0.05))',border:'1px solid rgba(255,215,0,0.3)',borderRadius:10,padding:'14px 16px',marginBottom:16}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:showPayments?12:0}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--yellow)',letterSpacing:1}}>💳 BUKTI BAYAR MASUK</span>
          <span style={{background:'var(--red)',color:'#fff',borderRadius:'50%',width:18,height:18,display:'inline-flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--fh)',fontSize:9,fontWeight:900,animation:'pulse 1.5s infinite'}}>{pendingPayments.length}</span>
        </div>
        <button onClick={()=>setShowPayments(s=>!s)} className="btn btn-ghost btn-sm" style={{fontSize:9}}>{showPayments?'Sembunyikan ▲':'Lihat Semua ▼'}</button>
      </div>
      {showPayments&&<div style={{display:'flex',flexDirection:'column',gap:8}}>
        {pendingPayments.map(p=>(
          <div key={p.id} style={{background:'rgba(255,255,255,0.04)',borderRadius:8,padding:'10px 12px',border:'1px solid rgba(255,215,0,0.15)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
              <div>
                <div style={{fontWeight:700,fontSize:13}}>{p.teams?.name||'—'} <span style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)'}}>· {p.teams?.captain}</span></div>
                <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>💳 {p.method} · Ref: <b style={{color:'var(--cyan)',fontFamily:'var(--fm)'}}>{p.proof}</b></div>
                {p.note&&<div style={{fontSize:10,color:'var(--muted)'}}>📝 {p.note}</div>}
                <div style={{fontSize:9,color:'var(--muted)',marginTop:2,fontFamily:'var(--fm)'}}>📅 {new Date(p.submitted_at).toLocaleString('id-ID')}</div>
              </div>
              <div style={{fontFamily:'var(--fh)',fontSize:13,color:'var(--yellow)',fontWeight:700,flexShrink:0}}>Rp {Number(p.amount).toLocaleString('id-ID')}</div>
            </div>
            <div style={{display:'flex',gap:6}}>
              <button className="btn btn-green btn-sm" onClick={()=>confirmPayment(p.id,p.team_id)} style={{fontSize:9}}>✓ Konfirmasi Lunas</button>
              <button className="btn btn-danger btn-sm" onClick={()=>rejectPayment(p.id)} style={{fontSize:9}}>✕ Tolak</button>
            </div>
          </div>
        ))}
      </div>}
    </div>}
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:10}}>
      <div>
        <h1 style={{fontFamily:'var(--fh)',fontSize:18,fontWeight:700}}>{i.teams_title}</h1>
        <p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)'}}>{filtered.length} TIM · <span style={{color:'var(--green)'}}>{paidCount} LUNAS</span> · <span style={{color:'var(--orange)'}}>{filtered.length-paidCount} BELUM</span></p>
      </div>
      <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Cari tim/kapten..." style={{width:160,padding:'7px 12px',fontSize:12}}/>
        <button onClick={()=>setViewMode(v=>v==='table'?'cards':'table')} className="btn btn-dark btn-sm" style={{padding:'6px 10px'}}>{viewMode==='table'?'⊞ Cards':'☰ Tabel'}</button>
        <button onClick={()=>exportCSV(filtered.map(t=>({Nama:t.name,Kapten:t.captain,Kontak:t.contact,Members:t.members,Bayar:t.paid?'Lunas':'Belum',Turnamen:tournaments.find(x=>x.id===t.tournament_id)?.name||'—'})),'data-peserta.csv')} className="btn btn-dark btn-sm" style={{fontSize:9}}>📥 CSV</button>
        <button className="btn btn-cyan" onClick={()=>setShowAdd(!showAdd)}>{i.btn_reg_team}</button>
        {filtered.filter(t=>!t.paid).length>0&&<button className="btn btn-ghost btn-sm" style={{fontSize:9}} onClick={()=>{if(window.confirm&&window.confirm(`Tandai semua ${filtered.filter(t=>!t.paid).length} tim sebagai lunas?`))filtered.filter(t=>!t.paid).forEach(t=>updateTeam(t.id,{paid:true}))}} title="Tandai semua lunas">✓✓ Semua Lunas</button>}
      </div>
    </div>
    {/* Tournament filter tabs */}
    <div style={{display:'flex',gap:5,marginBottom:12,flexWrap:'wrap'}}>
      {[{id:'all',label:i.all,count:teams.length},...tournaments.map(t=>({id:t.id,label:t.name.split(' ').slice(0,2).join(' '),count:teams.filter(x=>x.tournament_id===t.id).length}))].map(tab=>(
        <button key={tab.id} onClick={()=>setSelT(tab.id)} style={{padding:'4px 11px',borderRadius:5,border:'1px solid',cursor:'pointer',fontFamily:'var(--fm)',fontSize:9,textTransform:'uppercase',letterSpacing:1,transition:'var(--trans)',display:'flex',alignItems:'center',gap:5,background:selT===tab.id?'var(--cyan)':'transparent',color:selT===tab.id?'#000':'var(--muted)',borderColor:selT===tab.id?'var(--cyan)':'var(--border)'}}>
          {tab.label}<span style={{background:selT===tab.id?'rgba(0,0,0,0.15)':'rgba(255,255,255,0.1)',padding:'0 4px',borderRadius:10,fontSize:8}}>{tab.count}</span>
        </button>
      ))}
    </div>
    {/* Add team form */}
    {showAdd&&<div className="card" style={{marginBottom:12,borderColor:'rgba(0,229,255,0.3)',background:'rgba(0,229,255,0.02)'}}>
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:2,marginBottom:12}}>＋ DAFTARKAN TIM BARU</div>
      <div className="g2" style={{marginBottom:10}}>
        <div><label>{i.team_name}</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Alpha Squad"/></div>
        <div><label>{i.captain}</label><input value={form.captain} onChange={e=>setForm(f=>({...f,captain:e.target.value}))} placeholder="Nama Kapten"/></div>
      </div>
      <div className="g3" style={{marginBottom:10}}>
        <div><label>📱 {i.contact}</label><input value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} placeholder="08xx" type="tel"/></div>
        <div><label>👥 {i.members}</label><select value={form.members} onChange={e=>setForm(f=>({...f,members:e.target.value}))}>{[1,2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select></div>
        <div><label>🏆 {i.tournament}</label><select value={form.tournament_id} onChange={e=>setForm(f=>({...f,tournament_id:e.target.value}))}>{tournaments.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select></div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12,padding:'8px 12px',background:'rgba(255,215,0,0.05)',borderRadius:6,border:'1px solid rgba(255,215,0,0.15)'}}>
        <input type="checkbox" checked={form.paid} onChange={e=>setForm(f=>({...f,paid:e.target.checked}))} style={{width:16,height:16,accentColor:'var(--cyan)',cursor:'pointer'}}/>
        <span style={{fontSize:13,cursor:'pointer'}} onClick={()=>setForm(f=>({...f,paid:!f.paid}))}>{i.paid_lbl}</span>
        {form.paid&&<span style={{marginLeft:'auto',fontSize:10,color:'var(--green)',fontFamily:'var(--fm)'}}>✓ LUNAS</span>}
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn btn-cyan" onClick={submit} disabled={saving}>{saving?<Spinner size={13} color="#000"/>:i.btn_reg2}</button>
        <button className="btn btn-ghost" onClick={()=>setShowAdd(false)}>{i.btn_cancel}</button>
      </div>
    </div>}
    {/* TABLE VIEW */}
    {viewMode==='table'&&<div className="card mobile-table-wrap" style={{padding:0,overflow:'hidden'}}>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:500}}>
          <thead><tr style={{borderBottom:'1px solid var(--border)',background:'rgba(255,255,255,0.02)'}}>
            {['#',i.team_name,i.captain,i.contact,i.members,'Turnamen','Bayar',''].map((h,i)=>(
              <th key={i} style={{padding:'10px 12px',textAlign:'left',fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,fontWeight:400}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{filtered.length===0
            ?<tr><td colSpan={8} style={{padding:28,textAlign:'center',color:'var(--muted)',fontSize:12}}>{i.no_teams}</td></tr>
            :filtered.map((t,idx)=>{
              const tr=tournaments.find(x=>x.id===t.tournament_id)
              return <tr key={t.id} style={{borderBottom:'1px solid rgba(255,255,255,0.03)',transition:'background 0.15s'}} onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{padding:'10px 12px',fontFamily:'var(--fm)',fontSize:10,color:'var(--muted)'}}>{idx+1}</td>
                <td style={{padding:'10px 12px',fontWeight:700,fontSize:13}}>{t.name}</td>
                <td style={{padding:'10px 12px',fontSize:12,color:'var(--text2)'}}>{t.captain}</td>
                <td style={{padding:'10px 12px',fontFamily:'var(--fm)',fontSize:10,color:'var(--muted)'}}>{t.contact||'—'}</td>
                <td style={{padding:'10px 12px',textAlign:'center',fontFamily:'var(--fh)',fontSize:12,color:'var(--cyan)'}}>{t.members}</td>
                <td style={{padding:'10px 12px',fontSize:11,color:'var(--cyan)',fontFamily:'var(--fm)',maxWidth:120,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{tr?.name||'—'}</td>
                <td style={{padding:'10px 12px'}}>
                  <button onClick={()=>updateTeam(t.id,{paid:!t.paid})} style={{background:'none',border:'none',cursor:'pointer',fontSize:18,padding:0,display:'block'}} title="Toggle bayar">{t.paid?'✅':'⬜'}</button>
                </td>
                <td style={{padding:'10px 12px'}}>
                  <button onClick={()=>deleteTeam(t.id,t.tournament_id)} className="btn btn-danger btn-sm" style={{padding:'3px 8px',fontSize:9}}>✕</button>
                </td>
              </tr>
            })
          }</tbody>
        </table>
      </div>
    </div>}
    {/* CARDS VIEW */}
    {viewMode==='cards'&&<div>
      {filtered.length===0
        ?<div className="card" style={{textAlign:'center',padding:'30px',color:'var(--muted)'}}><div style={{fontSize:28,marginBottom:8}}>👥</div><div style={{fontFamily:'var(--fm)',fontSize:10,letterSpacing:2}}>{i.no_teams}</div></div>
        :<div className="g3">
          {filtered.map((t,idx)=>{
            const tr=tournaments.find(x=>x.id===t.tournament_id)
            return <div key={t.id} className="card" style={{padding:14,borderColor:t.paid?'rgba(0,255,136,0.2)':'var(--border)'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                <div style={{width:36,height:36,borderRadius:9,background:'linear-gradient(135deg,var(--cyan),var(--orange))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,color:'#000',flexShrink:0}}>{idx+1}</div>
                <button onClick={()=>updateTeam(t.id,{paid:!t.paid})} style={{background:'none',border:'none',cursor:'pointer',fontSize:18}}>{t.paid?'✅':'⬜'}</button>
              </div>
              <div style={{fontWeight:700,fontSize:14,marginBottom:3}}>{t.name}</div>
              <div style={{fontSize:11,color:'var(--muted)',marginBottom:8}}>👤 {t.captain}{t.contact&&` · 📱 ${t.contact}`}</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
                <span className="tag tag-active" style={{fontSize:8}}>{t.members} Member</span>
                {t.paid&&<span className="tag tag-active" style={{fontSize:8}}>✓ LUNAS</span>}
                {!t.paid&&<span className="tag tag-pending" style={{fontSize:8}}>⏳ BELUM</span>}
              </div>
              <div style={{fontSize:10,color:'var(--cyan)',fontFamily:'var(--fm)',borderTop:'1px solid var(--border)',paddingTop:8}}>{tr?.name||'—'}</div>
              <button onClick={()=>deleteTeam(t.id,t.tournament_id)} className="btn btn-danger btn-sm" style={{marginTop:8,padding:'4px 10px',fontSize:9}}>✕ Hapus</button>
            </div>
          })}
        </div>
      }
    </div>}
  </div>
}


function Finance({tournaments,teams,lang}){
  const[expanded,setExpanded]=React.useState(null)
  const i=T[lang]||T.id
  const rows=tournaments.map(t=>{const p=teams.filter(x=>x.tournament_id===t.id&&x.paid).length;const g=p*Number(t.entry);return{...t,paid:p,gross:g,commission:g*0.15}})
  const tG=rows.reduce((s,r)=>s+r.gross,0),tC=rows.reduce((s,r)=>s+r.commission,0)
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1000}}>
    <div style={{marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
      <h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700}}>{i.finance_title}</h1>
      <button className="btn btn-dark btn-sm" onClick={()=>exportCSV(rows.map(r=>({Turnamen:r.name,Game:r.game,'Masuk':r.gross,'Komisi':r.commission,Status:r.status})),'laporan.csv')} style={{fontSize:9}}>📥 Export CSV</button>
    </div>
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
  const[showWd,setShowWd]=useState(false)
  const[wdAmt,setWdAmt]=useState('')
  const[wdAcc,setWdAcc]=useState('')
  const[wdH,setWdH]=useState([
    {id:'w1',date:'2026-05-28',amount:450000,status:'cair',method:'BCA ••••1234'},
    {id:'w2',date:'2026-05-15',amount:250000,status:'cair',method:'OVO 0812••••'},
  ])
  const rows=tournaments.map(t=>{
    const paidTeams=teams.filter(x=>x.tournament_id===t.id&&x.paid).length
    const totalTeams=teams.filter(x=>x.tournament_id===t.id).length
    const gross=paidTeams*Number(t.entry)
    const comm=gross*0.15
    const bonus=t.status==='closed'?Number(t.prize)*0.02:0
    return{...t,paidTeams,totalTeams,gross,comm,bonus,total:comm+bonus}
  })
  const totalComm=rows.reduce((s,r)=>s+r.comm,0)
  const totalBonus=rows.reduce((s,r)=>s+r.bonus,0)
  const grand=totalComm+totalBonus
  const totalWd=wdH.reduce((s,w)=>s+w.amount,0)
  const saldo=grand-totalWd
  const maxComm=Math.max(...rows.map(r=>r.total),1)

  const doWithdraw=()=>{
    const amt=Number(wdAmt)
    if(!amt||amt>saldo||!wdAcc){toast('Cek jumlah & rekening!','error');return}
    const newWd={id:'w'+Date.now(),date:new Date().toISOString().split('T')[0],amount:amt,status:'proses',method:wdAcc}
    setWdH(h=>{const updated=[newWd,...h];try{localStorage.setItem('arenagg_wd_history',JSON.stringify(updated))}catch(e){};return updated})
    setWdAmt('');setWdAcc('');setShowWd(false)
    toast('✓ Permintaan withdraw dikirim!','success')
  }

  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:900}}>
    <div style={{marginBottom:20}}>
      <h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700}}>{i.rev_title}</h1>
      <p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)'}}>{i.rev_sub}</p>
    </div>
    {/* SALDO CARD */}
    <div style={{background:'linear-gradient(135deg,rgba(0,229,255,0.1),rgba(0,255,136,0.06))',border:'1px solid rgba(0,229,255,0.25)',borderRadius:14,padding:'22px 24px',marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:14}}>
      <div>
        <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:2,marginBottom:6}}>{i.saldo}</div>
        <div style={{fontFamily:'var(--fh)',fontSize:32,fontWeight:900,color:'var(--green)'}}>{fmtRp(Math.max(0,saldo))}</div>
        <div style={{display:'flex',gap:16,marginTop:8}}>
          <span style={{fontSize:11,color:'var(--muted)'}}>{i.income} <b style={{color:'var(--cyan)'}}>{fmtRp(grand)}</b></span>
          <span style={{fontSize:11,color:'var(--muted)'}}>{i.withdrawn} <b style={{color:'var(--orange)'}}>{fmtRp(totalWd)}</b></span>
        </div>
      </div>
      <button className="btn btn-green" onClick={()=>setShowWd(!showWd)} style={{minWidth:140,fontSize:11}}>
        {i.withdraw_btn}
      </button>
    </div>
    {/* WITHDRAW MODAL */}
    {showWd&&<div className="card" style={{marginBottom:16,borderColor:'rgba(0,255,136,0.3)',background:'rgba(0,255,136,0.02)'}}>
      <div style={{fontFamily:'var(--fh)',fontSize:11,color:'var(--green)',letterSpacing:1,marginBottom:14}}>{i.withdraw_title}</div>
      <div className="g2" style={{marginBottom:12}}>
        <div>
          <label>{i.amount_lbl} (maks. {fmtRp(saldo)})</label>
          <input type="number" value={wdAmt} onChange={e=>setWdAmt(e.target.value)} placeholder="Jumlah withdraw" max={saldo}/>
        </div>
        <div>
          <label>{i.acc_lbl}</label>
          <input value={wdAcc} onChange={e=>setWdAcc(e.target.value)} placeholder="BCA 1234567890"/>
        </div>
      </div>
      {wdAmt&&Number(wdAmt)>0&&<div style={{padding:'8px 12px',background:'rgba(0,229,255,0.04)',borderRadius:6,marginBottom:12,fontSize:11,fontFamily:'var(--fm)',border:'1px solid rgba(0,229,255,0.1)'}}>
        Withdraw: <b style={{color:'var(--cyan)'}}>{fmtRp(Number(wdAmt))}</b> · Sisa: <b style={{color:'var(--green)'}}>{fmtRp(saldo-Number(wdAmt))}</b>
      </div>}
      <div style={{display:'flex',gap:8}}>
        <button className="btn btn-green" onClick={doWithdraw} disabled={!wdAmt||Number(wdAmt)>saldo||!wdAcc}>{i.btn_wd}</button>
        <button className="btn btn-ghost" onClick={()=>setShowWd(false)}>{i.btn_cancel}</button>
      </div>
    </div>}
    {/* STAT CARDS */}
    <div className="g4" style={{marginBottom:16}}>
      {[
        {label:'Total Komisi',val:fmtRp(totalComm),icon:'📈',color:'var(--cyan)'},
        {label:'Bonus Closed',val:fmtRp(totalBonus),icon:'🎁',color:'var(--green)'},
        {label:'Total Dicairkan',val:fmtRp(totalWd),icon:'💸',color:'var(--orange)'},
        {label:'Saldo Tersedia',val:fmtRp(Math.max(0,saldo)),icon:'💰',color:'var(--yellow)'},
      ].map((s,idx)=><div key={idx} className="stat-card" style={{'--accent-color':s.color}}>
        <div style={{fontSize:20,marginBottom:8}}>{s.icon}</div>
        <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1}}>{s.label}</div>
        <div style={{fontFamily:'var(--fh)',fontSize:16,fontWeight:900,color:s.color,marginTop:4}}>{s.val}</div>
      </div>)}
    </div>
    <div className="g2" style={{gap:14}}>
      {/* KOMISI PER TURNAMEN */}
      <div className="card">
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:14}}>{i.comm_per}</div>
        {rows.length===0
          ?<div style={{color:'var(--muted)',fontSize:11,textAlign:'center',padding:20}}>{i.no_tourn_yet}</div>
          :rows.map((r,idx)=>(
            <div key={r.id} style={{marginBottom:12,paddingBottom:12,borderBottom:idx<rows.length-1?'1px solid var(--border)':'none'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <div>
                  <div style={{fontSize:12,fontWeight:600}}>{r.name}</div>
                  <div style={{fontSize:10,color:'var(--muted)'}}>{r.paidTeams}/{r.totalTeams} tim lunas</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div style={{fontFamily:'var(--fh)',fontSize:13,color:'var(--cyan)'}}>{fmtRp(r.total)}</div>
                  <span className={`tag tag-${r.status}`} style={{fontSize:8}}>{r.status}</span>
                </div>
              </div>
              <div className="pbar">
                <div className="pfill" style={{width:Math.round(r.total/maxComm*100)+'%',background:'linear-gradient(90deg,var(--cyan),var(--green))'}}/>
              </div>
            </div>
          ))
        }
      </div>
      {/* RIWAYAT WITHDRAW */}
      <div className="card">
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--orange)',letterSpacing:1,marginBottom:14}}>RIWAYAT WITHDRAW</div>
        {wdH.length===0
          ?<div style={{color:'var(--muted)',fontSize:11,textAlign:'center',padding:20}}>Belum ada riwayat</div>
          :wdH.map(w=>(
            <div key={w.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
              <div>
                <div style={{fontFamily:'var(--fh)',fontSize:13,fontWeight:700,color:w.status==='cair'?'var(--green)':'var(--yellow)'}}>{fmtRp(w.amount)}</div>
                <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>📅 {w.date} · {w.method}</div>
              </div>
              <span className={`tag ${w.status==='cair'?'tag-active':'tag-pending'}`} style={{fontSize:8}}>{w.status==='cair'?'✓ CAIR':'⏳ PROSES'}</span>
            </div>
          ))
        }
      </div>
    </div>
  </div>
}


const MatchCard=({match,round,onWin})=>{
  const wA=match.w===match.a?.id; const wB=match.w===match.b?.id
  return <div style={{display:'flex',flexDirection:'column',gap:1}}>
    {match.label&&<div style={{fontFamily:'var(--fm)',fontSize:7,color:'var(--orange)',letterSpacing:2,textAlign:'center',marginBottom:3,padding:'1px 6px',background:'rgba(255,107,0,0.1)',borderRadius:3,alignSelf:'center'}}>{match.label}</div>}
    <div style={{background:'var(--panel)',border:`1px solid ${wA?'rgba(0,255,136,0.4)':wB?'rgba(74,74,106,0.3)':'var(--border)'}`,borderRadius:'6px 6px 0 0',padding:'7px 10px',minWidth:150,cursor:match.a?'pointer':'default',transition:'all 0.2s',display:'flex',justifyContent:'space-between',alignItems:'center'}}
      onClick={()=>match.a&&onWin&&onWin(match.a.id)}
      onMouseEnter={e=>{if(match.a)e.currentTarget.style.borderColor='rgba(0,229,255,0.4)'}}
      onMouseLeave={e=>e.currentTarget.style.borderColor=wA?'rgba(0,255,136,0.4)':wB?'rgba(74,74,106,0.3)':'var(--border)'}>
      <span style={{fontSize:12,fontWeight:wA?700:500,color:wA?'var(--green)':!match.a?'var(--muted)':'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:110}}>{match.a?.name||<span style={{color:'var(--muted)',fontStyle:'italic',fontSize:10}}>TBD</span>}</span>
      {wA&&<span style={{fontSize:11,marginLeft:4,flexShrink:0}}>🏆</span>}
    </div>
    <div style={{background:'rgba(255,255,255,0.04)',padding:'2px 10px',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <span style={{fontFamily:'var(--fm)',fontSize:7,color:'var(--muted)',letterSpacing:1}}>VS</span>
    </div>
    <div style={{background:'var(--panel)',border:`1px solid ${wB?'rgba(0,255,136,0.4)':wA?'rgba(74,74,106,0.3)':'var(--border)'}`,borderRadius:'0 0 6px 6px',padding:'7px 10px',minWidth:150,cursor:match.b?'pointer':'default',transition:'all 0.2s',display:'flex',justifyContent:'space-between',alignItems:'center'}}
      onClick={()=>match.b&&onWin&&onWin(match.b.id)}
      onMouseEnter={e=>{if(match.b)e.currentTarget.style.borderColor='rgba(0,229,255,0.4)'}}
      onMouseLeave={e=>e.currentTarget.style.borderColor=wB?'rgba(0,255,136,0.4)':wA?'rgba(74,74,106,0.3)':'var(--border)'}>
      <span style={{fontSize:12,fontWeight:wB?700:500,color:wB?'var(--green)':!match.b?'var(--muted)':'var(--text)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:110}}>{match.b?.name||<span style={{color:'var(--muted)',fontStyle:'italic',fontSize:10}}>TBD</span>}</span>
      {wB&&<span style={{fontSize:11,marginLeft:4,flexShrink:0}}>🏆</span>}
    </div>
  </div>
}

function buildDoubleElim(teams){
  var wb=[]; var sz=Math.min(teams.length,16)
  for(var i=0;i<sz;i+=2) wb.push({id:'wb_r1_'+i/2,a:teams[i],b:teams[i+1],w:null})
  return wb
}

function BracketView({tournaments,teams,lang}){
  const i=T[lang]||T.id
  const[selT,setSelT]=useState(tournaments[0]?tournaments[0].id:'')
  const[tick,setTick]=useState(0)
  const t=tournaments.find(function(x){return x.id===selT})
  const tTeams=teams.filter(function(x){return x.tournament_id===selT})
  const isDoubleElim=t&&t.format==='Double Elimination'
  const isRoundRobin=t&&(t.format==='Round Robin'||t.format==='Swiss'||t.format==='League')

  var getBracket=function(){try{return JSON.parse(localStorage.getItem('arenagg_bracket_'+selT)||'{}')}catch(e){return{}}}
  var setWinner=function(key,winId){
    try{
      var bk=getBracket(); bk[key]=winId
      localStorage.setItem('arenagg_bracket_'+selT,JSON.stringify(bk))
      setTick(function(n){return n+1})
      addNotif('🏅 Pemenang match ditetapkan','success','bracket')
    }catch(e){}
  }
  var resetBracket=function(){
    if(!window.confirm('Reset seluruh bracket?'))return
    try{localStorage.removeItem('arenagg_bracket_'+selT);setTick(function(n){return n+1})}catch(e){}
  }
  var bracket=getBracket()

  // RR matches state
  var rrMatches=selT?JSON.parse(localStorage.getItem('arenagg_rr_'+selT)||'[]'):[]
  var rrStandings=tTeams.map(function(tm){
    var w=0,l=0,pts=0,gf=0,ga=0
    rrMatches.forEach(function(m){
      if(m.a&&m.a.id===tm.id){gf+=(m.sA||0);ga+=(m.sB||0);if(m.w===tm.id){w++;pts+=3}else if(m.w&&m.w!==tm.id)l++}
      if(m.b&&m.b.id===tm.id){gf+=(m.sB||0);ga+=(m.sA||0);if(m.w===tm.id){w++;pts+=3}else if(m.w&&m.w!==tm.id)l++}
    })
    return Object.assign({},tm,{w:w,l:l,pts:pts,gf:gf,ga:ga,gd:gf-ga})
  }).sort(function(a,b){return b.pts-a.pts||b.gd-a.gd})

  var setRRResult=function(matchId,winId,sA,sB){
    var ms=JSON.parse(localStorage.getItem('arenagg_rr_'+selT)||'[]')
    var found=false
    ms=ms.map(function(m){if(m.id===matchId){found=true;return Object.assign({},m,{w:winId,sA:sA,sB:sB})}return m})
    if(!found)ms.push({id:matchId,w:winId,sA:sA,sB:sB})
    localStorage.setItem('arenagg_rr_'+selT,JSON.stringify(ms))
    setTick(function(n){return n+1})
  }

  // Build single elim rounds
  var r1=[]; for(var idx=0;idx<Math.min(tTeams.length,16);idx+=2) r1.push({id:idx/2,a:tTeams[idx],b:tTeams[idx+1],w:bracket['m'+idx/2]})
  var r2=[]; for(var idx2=0;idx2<Math.floor(r1.length/2);idx2++) r2.push({id:idx2,w:bracket['sf'+idx2]})
  var champion=bracket['final']?tTeams.find(function(x){return x.id===bracket['final']}):null

  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:1100}}>
    <div style={{marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
      <div>
        <h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700}}>{i.nav[5]}</h1>
        <p style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',marginTop:2,letterSpacing:1}}>KLIK NAMA TIM UNTUK SET PEMENANG</p>
      </div>
      {selT&&<button onClick={resetBracket} className="btn btn-ghost btn-sm" style={{fontSize:9}}>↺ Reset Bracket</button>}
    </div>

    <div style={{display:'flex',gap:5,marginBottom:14,flexWrap:'wrap'}}>
      {tournaments.map(function(x){
        return <button key={x.id} onClick={function(){setSelT(x.id)}} style={{padding:'5px 13px',borderRadius:5,cursor:'pointer',fontSize:11,fontWeight:500,background:selT===x.id?'var(--cyan)':'var(--panel)',color:selT===x.id?'#000':'var(--text)',border:'1px solid '+(selT===x.id?'var(--cyan)':'var(--border)'),transition:'all 0.15s',fontFamily:'var(--fb)'}}>
          {x.name} <span style={{fontSize:9,opacity:0.6}}>{x.format==='Double Elimination'?'🔁':x.format==='Round Robin'?'⚽':x.format==='Swiss'?'🔄':''}</span>
        </button>
      })}
    </div>

    {t&&<>
      <div className="card" style={{marginBottom:14,background:'linear-gradient(135deg,rgba(0,229,255,0.06),rgba(255,107,0,0.04))'}}>
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8,alignItems:'center'}}>
          <div>
            <div style={{fontFamily:'var(--fh)',fontSize:14,fontWeight:700,color:'var(--cyan)'}}>{t.name}</div>
            <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>🎮 {t.game} · ⚙ {t.format} · 👥 {tTeams.length} Tim</div>
          </div>
          <div style={{display:'flex',gap:16}}>
            <div><div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:1}}>PRIZE POOL</div><div style={{fontFamily:'var(--fh)',fontSize:16,color:'var(--yellow)',fontWeight:900}}>{fmtRp(t.prize)}</div></div>
            <div><div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:1}}>CHAMPION</div>
              {champion?<div style={{fontFamily:'var(--fh)',fontSize:13,color:'var(--green)',fontWeight:700}}>🏆 {champion.name}</div>
              :isRoundRobin&&rrStandings[0]?<div style={{fontFamily:'var(--fh)',fontSize:12,color:'var(--cyan)',fontWeight:700}}>🥇 {rrStandings[0].name}</div>
              :<div style={{fontFamily:'var(--fh)',fontSize:11,color:'var(--muted)'}}>TBD</div>}
            </div>
          </div>
        </div>
      </div>

      {tTeams.length<2
        ?<div className="card" style={{textAlign:'center',padding:40,color:'var(--muted)'}}><div style={{fontSize:40,marginBottom:12}}>📊</div><div style={{fontFamily:'var(--fh)',fontSize:11,letterSpacing:2}}>MIN. 2 TIM DIPERLUKAN</div></div>

        :isRoundRobin?<div>
          {isDoubleElim&&<div style={{marginBottom:8,padding:'6px 10px',background:'rgba(138,43,226,0.1)',border:'1px solid rgba(138,43,226,0.3)',borderRadius:6,fontSize:10,color:'#b87fff'}}>🔁 Double Elimination aktif</div>}
          <div className="card" style={{marginBottom:14,overflowX:'auto'}}>
            <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:12}}>📊 KLASEMEN {t.format.toUpperCase()}</div>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:400}}>
              <thead><tr style={{borderBottom:'2px solid var(--border)'}}>
                {['#','Tim','M','W','L','PTS','GD'].map(function(h){return <th key={h} style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1,padding:'6px 8px',textAlign:h==='Tim'?'left':'center'}}>{h}</th>})}
              </tr></thead>
              <tbody>
                {rrStandings.map(function(tm,idx){return(
                  <tr key={tm.id} style={{borderBottom:'1px solid rgba(255,255,255,0.04)',background:idx===0?'rgba(0,255,136,0.04)':idx===1?'rgba(0,229,255,0.03)':'transparent'}}>
                    <td style={{padding:'8px',fontFamily:'var(--fh)',fontSize:12,textAlign:'center',color:idx===0?'var(--yellow)':idx===1?'var(--cyan)':'var(--muted)'}}>{['🥇','🥈','🥉'][idx]||idx+1}</td>
                    <td style={{padding:'8px',fontSize:12,fontWeight:600}}>{tm.name}</td>
                    <td style={{padding:'8px',fontSize:11,textAlign:'center',color:'var(--muted)'}}>{tm.w+tm.l}</td>
                    <td style={{padding:'8px',fontSize:11,textAlign:'center',color:'var(--green)',fontWeight:700}}>{tm.w}</td>
                    <td style={{padding:'8px',fontSize:11,textAlign:'center',color:'var(--red)'}}>{tm.l}</td>
                    <td style={{padding:'8px',fontFamily:'var(--fh)',fontSize:13,textAlign:'center',color:'var(--yellow)',fontWeight:900}}>{tm.pts}</td>
                    <td style={{padding:'8px',fontSize:11,textAlign:'center',color:tm.gd>0?'var(--green)':tm.gd<0?'var(--red)':'var(--muted)'}}>{tm.gd>0?'+':''}{tm.gd}</td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          <div className="card">
            <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--orange)',letterSpacing:1,marginBottom:12}}>📅 JADWAL PERTANDINGAN</div>
            {rrMatches.length===0?<div style={{color:'var(--muted)',fontSize:11,textAlign:'center',padding:20}}>Belum ada jadwal</div>
            :rrMatches.map(function(m){return <RRMatchRow key={m.id} match={m} onResult={function(w,sA,sB){setRRResult(m.id,w,sA,sB)}}/>})}
          </div>
        </div>

        :<div style={{overflowX:'auto',paddingBottom:16}}>
          {isDoubleElim&&<div style={{marginBottom:8,padding:'6px 10px',background:'rgba(138,43,226,0.1)',border:'1px solid rgba(138,43,226,0.3)',borderRadius:6,fontSize:10,color:'#b87fff'}}>🔁 Double Elimination: Tim yang kalah masuk Losers Bracket!</div>}
          <div style={{display:'flex',gap:0,alignItems:'flex-start',minWidth:r1.length>4?700:400}}>
            <div style={{display:'flex',flexDirection:'column',gap:14,flexShrink:0}}>
              <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--cyan)',letterSpacing:2,marginBottom:6,textAlign:'center',padding:'2px 8px',background:'rgba(0,229,255,0.08)',borderRadius:4}}>BABAK 1</div>
              {r1.map(function(m,idx){return <MatchCard key={idx} match={m} round={1} onWin={function(wid){setWinner('m'+idx,wid)}}/>})}
            </div>
            <div style={{width:40,display:'flex',alignItems:'center',justifyContent:'center',height:r1.length*88,flexShrink:0}}>
              <div style={{width:'100%',borderTop:'1px dashed rgba(0,229,255,0.2)',position:'relative'}}><div style={{position:'absolute',right:-6,top:-5,color:'rgba(0,229,255,0.4)',fontSize:10}}>▶</div></div>
            </div>
            {r2.length>0&&<>
              <div style={{display:'flex',flexDirection:'column',gap:14,flexShrink:0,alignSelf:'center'}}>
                <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--orange)',letterSpacing:2,marginBottom:6,textAlign:'center',padding:'2px 8px',background:'rgba(255,107,0,0.08)',borderRadius:4}}>SEMI FINAL</div>
                {r2.map(function(m,idx2){
                  var prevW1=bracket['m'+(idx2*2)]?tTeams.find(function(x){return x.id===bracket['m'+(idx2*2)]}):null
                  var prevW2=bracket['m'+(idx2*2+1)]?tTeams.find(function(x){return x.id===bracket['m'+(idx2*2+1)]}):null
                  return <MatchCard key={idx2} match={{id:idx2,a:prevW1,b:prevW2,w:bracket['sf'+idx2]}} round={2} onWin={function(wid){setWinner('sf'+idx2,wid)}}/>
                })}
              </div>
              <div style={{width:40,display:'flex',alignItems:'center',justifyContent:'center',alignSelf:'center',flexShrink:0}}>
                <div style={{width:'100%',borderTop:'1px dashed rgba(255,107,0,0.2)',position:'relative'}}><div style={{position:'absolute',right:-6,top:-5,color:'rgba(255,107,0,0.4)',fontSize:10}}>▶</div></div>
              </div>
            </>}
            <div style={{display:'flex',flexDirection:'column',flexShrink:0,alignSelf:'center'}}>
              <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--yellow)',letterSpacing:2,marginBottom:6,textAlign:'center',padding:'2px 8px',background:'rgba(255,215,0,0.08)',borderRadius:4}}>⚡ GRAND FINAL</div>
              {(function(){
                var fA=r2.length>0?(bracket['sf0']?tTeams.find(function(x){return x.id===bracket['sf0']}):null):(bracket['m0']?tTeams.find(function(x){return x.id===bracket['m0']}):null)
                var fB=r2.length>0?(bracket['sf1']?tTeams.find(function(x){return x.id===bracket['sf1']}):null):(bracket['m1']?tTeams.find(function(x){return x.id===bracket['m1']}):null)
                return <MatchCard match={{id:0,a:fA,b:fB,w:bracket['final']}} round={3} onWin={function(wid){setWinner('final',wid);addNotif('🏆 Juara turnamen ditetapkan!','tournament','bracket')}}/>
              })()}
              {bracket['final']&&<div style={{marginTop:12,padding:'8px 14px',background:'linear-gradient(135deg,rgba(255,215,0,0.15),rgba(255,107,0,0.08))',border:'1px solid rgba(255,215,0,0.4)',borderRadius:8,textAlign:'center',animation:'glow-pulse 2s infinite'}}>
                <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:2,marginBottom:4}}>🏆 CHAMPION</div>
                <div style={{fontFamily:'var(--fh)',fontSize:15,fontWeight:900,color:'var(--yellow)'}}>{tTeams.find(function(x){return x.id===bracket['final']})?tTeams.find(function(x){return x.id===bracket['final']}).name:'TBD'}</div>
              </div>}
            </div>
          </div>
        </div>
      }
    </>}
    {!t&&tournaments.length===0&&<div className="card" style={{textAlign:'center',padding:40}}><div style={{fontSize:40,marginBottom:12}}>🏟</div><div style={{color:'var(--muted)',fontFamily:'var(--fh)',fontSize:11,letterSpacing:2}}>BELUM ADA TURNAMEN</div></div>}
  </div>
}

function RRMatchRow({match,onResult}){
  const[sA,setSA]=useState(String(match.sA||0))
  const[sB,setSB]=useState(String(match.sB||0))
  const[editing,setEditing]=useState(false)
  return <div style={{display:'flex',alignItems:'center',gap:8,padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
    <div style={{flex:1,fontSize:11,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{match.a?match.a.name:'TBD'}</div>
    {editing
      ?<div style={{display:'flex',alignItems:'center',gap:4}}>
        <input value={sA} onChange={function(e){setSA(e.target.value)}} style={{width:40,textAlign:'center',padding:'3px 4px',fontSize:13,fontFamily:'var(--fh)'}}/>
        <span style={{color:'var(--muted)'}}>:</span>
        <input value={sB} onChange={function(e){setSB(e.target.value)}} style={{width:40,textAlign:'center',padding:'3px 4px',fontSize:13,fontFamily:'var(--fh)'}}/>
        <button onClick={function(){var a=parseInt(sA)||0,b=parseInt(sB)||0;onResult(a>b?(match.a?match.a.id:null):b>a?(match.b?match.b.id:null):null,a,b);setEditing(false)}} style={{padding:'3px 8px',background:'var(--cyan)',border:'none',borderRadius:4,cursor:'pointer',fontFamily:'var(--fh)',fontSize:9,color:'#000',fontWeight:700}}>✓</button>
      </div>
      :<div style={{display:'flex',alignItems:'center',gap:6}}>
        <div style={{fontFamily:'var(--fh)',fontSize:14,fontWeight:900,minWidth:60,textAlign:'center'}}>{match.sA||0} : {match.sB||0}</div>
        <button onClick={function(){setEditing(true)}} style={{padding:'2px 7px',background:'rgba(0,229,255,0.1)',border:'1px solid rgba(0,229,255,0.2)',borderRadius:4,cursor:'pointer',fontFamily:'var(--fm)',fontSize:8,color:'var(--cyan)'}}>✏</button>
      </div>
    }
    <div style={{flex:1,fontSize:11,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',textAlign:'right'}}>{match.b?match.b.name:'TBD'}</div>
  </div>
}

function Settings({user,lang,toast}){
  const i=T[lang]||T.id
  const BANK_KEY='arenagg_bank_info'
  const[tab,setTab]=useState('profile')
  const[bank,setBank]=useState(()=>{try{return JSON.parse(localStorage.getItem(BANK_KEY)||'{}')}catch(e){return{}}})
  const[bankSaved,setBankSaved]=useState(false)
  const[prof,setProf]=useState(getProf)
  const[profSaved,setProfSaved]=useState(false)
  const setB=k=>e=>setBank(b=>({...b,[k]:e.target.value}))
  const saveBankFn=()=>{localStorage.setItem(BANK_KEY,JSON.stringify(bank));setBankSaved(true);setTimeout(()=>setBankSaved(false),2500);if(toast)toast('✓ Info bank tersimpan!','success')}
  const saveProfFn=()=>{saveProf(prof);setProfSaved(true);setTimeout(()=>setProfSaved(false),2500);window.dispatchEvent(new Event('profile-updated'));if(toast)toast('✓ Profil tersimpan!','success')}
  const emailName=user?.email?.split('@')[0]||'Organizer'
  const memberSince=user?.created_at?new Date(user.created_at).toLocaleDateString('id-ID',{year:'numeric',month:'long',day:'numeric'}):'—'
  const BANKS=['BCA','BRI','BNI','Mandiri','BSI','DANA','OVO','GoPay','ShopeePay','SeaBank']
  const SEA=[
    {img:'https://flagcdn.com/w40/id.png',country:'Indonesia',status:'active',note:'Pasar utama'},
    {img:'https://flagcdn.com/w40/ph.png',country:'Philippines',status:'soon',note:'Q3 2026'},
    {img:'https://flagcdn.com/w40/vn.png',country:'Vietnam',status:'soon',note:'Q4 2026'},
    {img:'https://flagcdn.com/w40/th.png',country:'Thailand',status:'soon',note:'2027'},
    {img:'https://flagcdn.com/w40/my.png',country:'Malaysia',status:'soon',note:'2027'},
    {img:'https://flagcdn.com/w40/cn.png',country:'China',status:'soon',note:'2028'},
  ]
  const TABS=[{id:'profile',icon:'👤',label:'Profil'},{id:'payment',icon:'💳',label:'Pembayaran'},{id:'tools',icon:'🔧',label:'Tools'},{id:'account',icon:'⚙',label:'Akun'},{id:'sponsor',icon:'📺',label:'Iklan'},{id:'expansion',icon:'🌏',label:'Ekspansi'},{id:'danger',icon:'⚠',label:'Reset'}]
  return <div className="animate-in" style={{padding:'24px 28px',maxWidth:700}}>
    <div style={{marginBottom:20}}>
      <h1 style={{fontFamily:'var(--fh)',fontSize:17,fontWeight:700}}>{i.settings_title}</h1>
      <p style={{color:'var(--muted)',fontSize:10,marginTop:2,fontFamily:'var(--fm)'}}>KONFIGURASI AKUN & PLATFORM</p>
    </div>
    {/* TABS */}
    <div style={{display:'flex',gap:4,marginBottom:20,background:'rgba(255,255,255,0.04)',padding:4,borderRadius:9,border:'1px solid var(--border)',flexWrap:'wrap'}}>
      {TABS.map(t=>(
        <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:'1 1 auto',padding:'8px 12px',border:'none',borderRadius:6,cursor:'pointer',fontFamily:'var(--fh)',fontSize:9,letterSpacing:1,transition:'var(--trans)',display:'flex',alignItems:'center',justifyContent:'center',gap:5,background:tab===t.id?'var(--cyan)':'transparent',color:tab===t.id?'#000':'var(--muted)',fontWeight:700}}>
          <span>{t.icon}</span><span>{t.label}</span>
        </button>
      ))}
    </div>

    {/* PROFILE TAB */}
    {tab==='profile'&&<div className="card">
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:2,marginBottom:16}}>{i.profile_title}</div>
      {/* Avatar */}
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:20}}>
        <div style={{position:'relative',cursor:'pointer'}} onClick={()=>document.getElementById('prof_photo_inp').click()}>
          <div style={{width:80,height:80,borderRadius:'50%',background:'linear-gradient(135deg,var(--cyan),var(--orange))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:700,color:'#000',overflow:'hidden',border:'3px solid rgba(0,229,255,0.3)',boxShadow:'0 8px 24px rgba(0,229,255,0.2)'}}>
            {prof.photo?<img src={prof.photo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt=""/>:<span>{(prof.name||emailName)[0].toUpperCase()}</span>}
          </div>
          <div style={{position:'absolute',bottom:2,right:2,width:24,height:24,borderRadius:'50%',background:'var(--cyan)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'#000',border:'2px solid var(--bg)',boxShadow:'0 2px 8px rgba(0,229,255,0.4)'}}>📷</div>
        </div>
        <input id="prof_photo_inp" type="file" accept="image/*" style={{display:'none'}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setProf(p=>({...p,photo:ev.target.result}));r.readAsDataURL(f)}}/>
        <div style={{fontSize:9,color:'var(--muted)',marginTop:8,fontFamily:'var(--fm)',letterSpacing:1}}>{i.change_photo}</div>
      </div>
      <div style={{marginBottom:14}}>
        <label>{i.name_lbl}</label>
        <input value={prof.name||''} onChange={e=>setProf(p=>({...p,name:e.target.value}))} placeholder={emailName}/>
      </div>
      <div style={{marginBottom:16,padding:'10px 14px',background:'rgba(255,255,255,0.03)',borderRadius:7,border:'1px solid var(--border)'}}>
        <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
          <div><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1}}>EMAIL</div><div style={{fontSize:12,marginTop:3}}>{user?.email||'—'}</div></div>
          <div><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1}}>BERGABUNG</div><div style={{fontSize:12,marginTop:3}}>{memberSince}</div></div>
          <div><div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--muted)',letterSpacing:1}}>STATUS</div><div style={{fontSize:12,marginTop:3,display:'flex',alignItems:'center',gap:5}}><span style={{width:7,height:7,borderRadius:'50%',background:'var(--green)',display:'inline-block',animation:'pulse 1.5s infinite'}}/>{i.online}</div></div>
        </div>
      </div>
      <button className="btn btn-cyan" onClick={saveProfFn} style={{minWidth:140}}>
        {profSaved?'✓ Tersimpan!':i.save_profile}
      </button>
    </div>}

    {/* PAYMENT TAB */}
    {tab==='payment'&&<div className="card">
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:2,marginBottom:4}}>{i.bank_title}</div>
      <div style={{fontSize:11,color:'var(--muted)',marginBottom:16}}>{i.bank_desc}</div>
      <div style={{marginBottom:14}}><label>{i.bank_name}</label>
        <select value={bank.bankName||''} onChange={e=>setBank(b=>({...b,bankName:e.target.value}))}>
          <option value="">{i.select_bank}</option>
          {BANKS.map(b=><option key={b}>{b}</option>)}
        </select>
      </div>
      <div style={{marginBottom:14}}><label>{i.acc_num}</label><input value={bank.accNumber||''} onChange={setB('accNumber')} placeholder="1234567890 / 08xxxxxxxxxx"/></div>
      <div style={{marginBottom:14}}><label>{i.acc_owner}</label><input value={bank.accName||''} onChange={setB('accName')} placeholder="Nama Sesuai Rekening"/></div>
      <div style={{marginBottom:20}}><label>📱 {i.wa_confirm}</label><input value={bank.waNumber||''} onChange={setB('waNumber')} placeholder="08xx" type="tel"/></div>
      {bank.bankName&&bank.accNumber&&<div style={{marginBottom:16,padding:'12px 14px',background:'rgba(0,229,255,0.04)',borderRadius:8,border:'1px solid rgba(0,229,255,0.15)'}}>
        <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:1,marginBottom:8}}>👁 PREVIEW TAMPILAN PESERTA</div>
        <div style={{fontSize:12,lineHeight:2}}>
          🏦 Bank: <b>{bank.bankName}</b><br/>
          💳 {i.acc_no} <b style={{fontFamily:'var(--fm)',color:'var(--cyan)'}}>{bank.accNumber}</b><br/>
          👤 {i.an} <b>{bank.accName||'—'}</b>
          {bank.waNumber&&<><br/>📱 WA: <b style={{color:'var(--green)'}}>{bank.waNumber}</b></>}
        </div>
      </div>}
      <button className="btn btn-cyan" onClick={saveBankFn} style={{minWidth:140}}>
        {bankSaved?'✓ Tersimpan!':i.btn_save_bank}
      </button>
    </div>}

    {/* ACCOUNT TAB */}
    {tab==='account'&&<div className="card">
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:2,marginBottom:16}}>{i.account}</div>
      <div style={{padding:'14px 16px',background:'rgba(0,255,136,0.04)',borderRadius:8,border:'1px solid rgba(0,255,136,0.15)',marginBottom:16,display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:36,height:36,borderRadius:8,background:'rgba(0,255,136,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:18,flexShrink:0}}>🔒</div>
        <div>
          <div style={{fontFamily:'var(--fm)',fontSize:10,color:'var(--green)',letterSpacing:1}}>SUPABASE AUTH</div>
          <div style={{fontSize:12,marginTop:2,display:'flex',alignItems:'center',gap:6}}><span className="live-dot"/>{i.connected}</div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
        {[
          {icon:'📧',label:'Email',val:user?.email},
          {icon:'🆔',label:'User ID',val:user?.id?.slice(0,16)+'...'},
          {icon:'📅',label:'Dibuat',val:memberSince},
          {icon:'🔐',label:'Provider',val:user?.app_metadata?.provider||'email'},
        ].map((s,idx)=>(
          <div key={idx} style={{padding:'10px 12px',background:'rgba(255,255,255,0.03)',borderRadius:7,border:'1px solid var(--border)'}}>
            <div style={{fontFamily:'var(--fm)',fontSize:8,color:'var(--muted)',letterSpacing:1,marginBottom:4}}>{s.icon} {s.label}</div>
            <div style={{fontSize:11,fontFamily:'var(--fm)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.val||'—'}</div>
          </div>
        ))}
      </div>
    </div>}

    {/* SPONSOR TAB */}
    {tab==='sponsor'&&<div className="card"><AdManager toast={toast}/></div>}

    {/* DANGER ZONE TAB */}

    {tab==='tools'&&<div>
      <div className="card" style={{marginBottom:14}}>
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--cyan)',letterSpacing:1,marginBottom:16}}>🔧 ORGANIZER TOOLS</div>
        <div className="g2" style={{marginBottom:16}}>
          {[{icon:'📋',title:'Template Turnamen',desc:'Simpan format turnamen favoritmu'},{icon:'⏰',title:'Jadwal Otomatis',desc:'Generate jadwal match otomatis'},{icon:'📣',title:'Broadcast Pesan',desc:'Kirim pengumuman ke semua peserta'},{icon:'📊',title:'Analitik Cepat',desc:'Statistik turnamen dalam satu klik'}].map(function(tool,idx){
            return <div key={idx} className="card" style={{cursor:'pointer',transition:'var(--trans)'}}
              onMouseEnter={function(e){e.currentTarget.style.borderColor='rgba(0,229,255,0.4)'}}
              onMouseLeave={function(e){e.currentTarget.style.borderColor='var(--border)'}}
              onClick={function(){toast('🔧 '+tool.title+' — coming soon!','info')}}>
              <div style={{fontSize:28,marginBottom:8}}>{tool.icon}</div>
              <div style={{fontFamily:'var(--fh)',fontSize:11,fontWeight:700,marginBottom:4}}>{tool.title}</div>
              <div style={{fontSize:10,color:'var(--muted)',lineHeight:1.5}}>{tool.desc}</div>
              <div style={{marginTop:8,display:'inline-flex',alignItems:'center',gap:3,padding:'2px 7px',borderRadius:20,fontFamily:'var(--fm)',fontSize:9,fontWeight:700,letterSpacing:0.5,background:'rgba(0,229,255,0.12)',color:'var(--cyan)',border:'1px solid rgba(0,229,255,0.25)'}}>SEGERA</div>
            </div>
          })}
        </div>
      </div>
      <div className="card" style={{marginBottom:14}}>
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--orange)',letterSpacing:1,marginBottom:12}}>👥 PREFERENSI DEFAULT</div>
        {[{label:'Slot Default',key:'default_slots',opts:['4','8','16','32','64']},{label:'Format Default',key:'default_format',opts:['Single Elimination','Double Elimination','Round Robin','Swiss']},{label:'Komisi (%)',key:'default_comm',opts:['10','15','20','25']}].map(function(pref,idx){
          var val=localStorage.getItem('arenagg_pref_'+pref.key)||pref.opts[1]
          return <div key={idx} style={{marginBottom:14}}>
            <label>{pref.label}</label>
            <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:4}}>
              {pref.opts.map(function(opt){return <button key={opt} onClick={function(){localStorage.setItem('arenagg_pref_'+pref.key,opt);toast('✓ Disimpan','success')}}
                style={{padding:'5px 12px',borderRadius:5,cursor:'pointer',fontSize:11,fontWeight:600,background:val===opt?'var(--cyan)':'rgba(255,255,255,0.04)',color:val===opt?'#000':'var(--text)',border:'1px solid '+(val===opt?'var(--cyan)':'var(--border)'),transition:'all 0.15s',fontFamily:'var(--fh)'}}>{opt}</button>})}
            </div>
          </div>
        })}
      </div>
      <div className="card">
        <div style={{fontFamily:'var(--fh)',fontSize:10,color:'var(--green)',letterSpacing:1,marginBottom:12}}>⌨ KEYBOARD SHORTCUTS</div>
        <div className="g2">
          {[['D','Dashboard'],['R','Komisi'],['T','Turnamen'],['N','Buat Baru'],['P','Peserta'],['B','Bracket'],['L','Live'],['M','Ranking'],['F','Keuangan'],['S','Setting']].map(function(pair){return <div key={pair[0]} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 0',borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
            <kbd style={{fontFamily:'var(--fm)',fontSize:10,fontWeight:700,background:'rgba(0,229,255,0.1)',border:'1px solid rgba(0,229,255,0.3)',borderRadius:4,padding:'2px 7px',color:'var(--cyan)',minWidth:24,textAlign:'center'}}>{pair[0]}</kbd>
            <span style={{fontSize:11,color:'var(--text)'}}>{pair[1]}</span>
          </div>})}
        </div>
      </div>
    </div>}

    {tab==='danger'&&<div className="card" style={{borderColor:'rgba(255,45,85,0.3)',background:'rgba(255,45,85,0.02)'}}>
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--red)',letterSpacing:2,marginBottom:16}}>⚠ ZONA BAHAYA</div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {[
          {label:'Reset Data Profil',desc:'Hapus nama & foto profil organizer',key:'arenagg_profile'},
          {label:'Reset Info Pembayaran',desc:'Hapus data bank/rekening yang tersimpan',key:'arenagg_bank_info'},
          {label:'Reset Semua Iklan Custom',desc:'Hapus iklan sponsor yang kamu tambahkan',key:'arenagg_custom_ads'},
          {label:'Reset Bracket Data',desc:'Hapus semua data pemenang bracket',key:null},
        ].map(item=>(
          <div key={item.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 14px',background:'rgba(255,255,255,0.03)',borderRadius:7,border:'1px solid var(--border)'}}>
            <div>
              <div style={{fontSize:13,fontWeight:600}}>{item.label}</div>
              <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>{item.desc}</div>
            </div>
            <button className="btn btn-danger btn-sm" onClick={()=>{
              if(window.confirm&&window.confirm(`Reset "${item.label}"? Ini tidak bisa dibatalkan.`)){
                if(item.key){try{localStorage.removeItem(item.key)}catch(e){}}
                else{try{Object.keys(localStorage).filter(k=>k.startsWith('arenagg_bracket_')).forEach(k=>localStorage.removeItem(k))}catch(e){}}
                if(toast)toast('✓ Data direset','success')
              }
            }} style={{fontSize:9,flexShrink:0}}>Reset</button>
          </div>
        ))}
        <div style={{padding:'10px 14px',background:'rgba(255,45,85,0.06)',borderRadius:7,border:'1px solid rgba(255,45,85,0.15)',fontSize:11,color:'var(--muted)'}}>
          💡 Data turnamen & tim tersimpan di Supabase dan tidak terpengaruh. Ini hanya reset data lokal di browser ini.
        </div>
      </div>
    </div>}
    {/* EXPANSION TAB */}
    {tab==='expansion'&&<div className="card">
      <div style={{fontFamily:'var(--fm)',fontSize:9,color:'var(--cyan)',letterSpacing:2,marginBottom:16}}>{i.expansion}</div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {SEA.map(s=>(
          <div key={s.country} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',background:s.status==='active'?'rgba(0,255,136,0.05)':'rgba(255,255,255,0.02)',borderRadius:8,border:`1px solid ${s.status==='active'?'rgba(0,255,136,0.2)':'var(--border)'}`}}>
            <img src={s.img} style={{width:28,height:18,objectFit:'cover',borderRadius:3,border:'1px solid rgba(255,255,255,0.1)'}} alt={s.country} onError={e=>{e.target.style.display='none'}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600}}>{s.country}</div>
              <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>{s.note}</div>
            </div>
            <span className={`tag ${s.status==='active'?'tag-active':'tag-pending'}`} style={{fontSize:8}}>{s.status==='active'?'✓ AKTIF':'SEGERA'}</span>
          </div>
        ))}
      </div>
    </div>}
  </div>
}




// ============================================================
// ERROR BOUNDARY — catches React render errors (prevents black screen)
// ============================================================
class ErrorBoundary extends React.Component {
  constructor(props){super(props);this.state={hasError:false,error:null}}
  static getDerivedStateFromError(error){return{hasError:true,error}}
  componentDidCatch(error,info){console.error('ArenaGG Error:',error,info)}
  render(){
    if(this.state.hasError){
      return <div style={{minHeight:'100vh',background:'#050508',color:'#e8e8f0',display:'flex',alignItems:'center',justifyContent:'center',padding:20,fontFamily:'system-ui,sans-serif'}}>
        <div style={{textAlign:'center',maxWidth:500}}>
          <div style={{fontSize:48,marginBottom:16}}>⚡</div>
          <div style={{fontSize:20,fontWeight:700,color:'#00e5ff',marginBottom:8,letterSpacing:2}}>ARENAGG</div>
          <div style={{fontSize:14,color:'#ff2d55',marginBottom:12}}>Terjadi kesalahan teknis</div>
          <div style={{fontSize:11,color:'#4a4a6a',marginBottom:20,fontFamily:'monospace',background:'rgba(255,255,255,0.05)',padding:12,borderRadius:6,wordBreak:'break-all'}}>{String(this.state.error)}</div>
          <button onClick={()=>window.location.reload()} style={{background:'#00e5ff',color:'#000',border:'none',padding:'10px 24px',borderRadius:6,cursor:'pointer',fontWeight:700,fontSize:13}}>🔄 Muat Ulang</button>
        </div>
      </div>
    }
    return this.props.children
  }
}

export default function App(){
  const[user,setUser]=useState(null);const[loading,setLoading]=useState(true);const[page,setPage]=useState('dashboard');const[editT,setEditT]=useState(null);const[toasts,setToasts]=useState([])
  // Init pubTid LANGSUNG dari hash saat komponen pertama kali render
  const initTid=()=>{const m=window.location.hash.match(/^#\/daftar\/([a-zA-Z0-9\-_]+)$/);return(m&&m[1])?decodeURIComponent(m[1]).trim():null}
  const[pubTid,setPubTid]=useState(initTid)
  const[pubLiveTid,setPubLiveTid]=useState(()=>{const m=window.location.hash.match(/^#\/live\/([a-zA-Z0-9\-_]+)$/);return m?m[1].trim():null})
  const[pubPeserta,setPubPeserta]=useState(()=>window.location.hash.startsWith('#/peserta'))
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
      const ml=window.location.hash.match(/^#\/live\/([a-zA-Z0-9\-_]+)$/)
      if(ml&&ml[1])setPubLiveTid(decodeURIComponent(ml[1]).trim())
      else setPubLiveTid(null)
      if(window.location.hash.startsWith('#/peserta'))setPubPeserta(true)
      else setPubPeserta(false)
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

  // Scroll to top when page changes (must be before early returns!)
  useEffect(()=>{const el=document.querySelector('main');if(el)el.scrollTo({top:0,behavior:'smooth'})},[page])

  // PUBLIC PAGE: Selalu tampilkan tanpa perlu login
  // PORTAL PESERTA — accessible at /#/peserta without login
  // AUTH loading spinner

  // Scroll to top on page change
  const sharedProps={tournaments,teams,loading:dataLoading,setPage,editData:editT,setEditT,toast,user,addT,updateT,deleteT,addTeam,updateTeam,deleteTeam,onPreview:id=>{window.location.hash=`#/daftar/${id}`},lang}

  // Render berdasarkan state (NO early returns - fixes React #310)
  if(pubPeserta)return <><ParticipantPortal toast={toast}/><Toasts list={toasts}/></>
  if(pubLiveTid!==null)return <><PublicLivePage tid={pubLiveTid} onBack={()=>{window.location.hash='';window.history.pushState('',document.title,window.location.pathname+window.location.search);setPubLiveTid(null)}} toast={toast}/><Toasts list={toasts}/></>
  if(pubTid!==null)return <><PublicPage tid={pubTid} onBack={goBack} toast={toast}/><Toasts list={toasts}/></>
  if(loading)return <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{textAlign:'center'}}><div style={{fontFamily:'var(--fh)',fontSize:17,color:'var(--cyan)',letterSpacing:3,animation:'glow-pulse 2s infinite',marginBottom:14}}>⚔ ARENAGG</div><Spinner size={22} color="var(--cyan)"/></div></div>
  if(!user)return <><AuthPage onLogin={u=>setUser(u)} lang={lang} setLangFn={setLangFn}/><Toasts list={toasts}/></>
  return <div style={{display:'flex',minHeight:'100vh',background:'var(--bg,#050508)',position:'relative',zIndex:1}}>
    <Sidebar page={page} setPage={setPage} user={user} onLogout={logout} hasLive={hasLive} lang={lang} isLight={isLight} toggleTheme={toggleTheme} tournaments={tournaments}/>
    <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:0}}>
      <LiveBanner tournaments={tournaments}/>
      <main style={{flex:1,overflowY:'auto',overflowX:'hidden',WebkitOverflowScrolling:'touch'}}>
        {page==='dashboard'&&<div className='animate-in page-content' key='dashboard'><Dashboard {...sharedProps}/></div>}
        {page==='revenue'&&<div className='animate-in page-content'><RevenuePage {...sharedProps}/></div>}
        {page==='tournaments'&&<div className='animate-in page-content'><TournamentList {...sharedProps}/></div>}
        {page==='create'&&<div className='animate-in page-content'><CreateTournament addT={addT} updateT={updateT} editData={editT} setEditT={setEditT} toast={toast} lang={lang}/></div>}
        {page==='teams'&&<div className='animate-in page-content'><TeamsView {...sharedProps} toast={toast}/></div>}
        {page==='bracket'&&<div className='animate-in page-content'><BracketView {...sharedProps}/></div>}
        {page==='live'&&<div className='animate-in page-content'><LivePage {...sharedProps} toast={toast}/></div>}
        {page==='leaderboard'&&<div className='animate-in page-content'><Leaderboard {...sharedProps}/></div>}
        {page==='finance'&&<div className='animate-in page-content'><Finance {...sharedProps}/></div>}
        {page==='settings'&&<div className='animate-in page-content'><Settings user={user} lang={lang} toast={toast}/></div>}
      </main>
    </div>
    <BottomNav page={page} setPage={setPage} lang={lang} hasLive={hasLive}/>
    <button onClick={()=>document.querySelector('main')?.scrollTo({top:0,behavior:'smooth'})} className='fab-scroll' style={{position:'fixed',bottom:80,right:16,width:40,height:40,borderRadius:'50%',background:'rgba(0,229,255,0.15)',border:'1px solid rgba(0,229,255,0.3)',color:'var(--cyan)',fontSize:18,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',zIndex:90,backdropFilter:'blur(4px)',transition:'var(--trans)'}} title="Back to top" onMouseEnter={e=>e.currentTarget.style.background='rgba(0,229,255,0.25)'} onMouseLeave={e=>e.currentTarget.style.background='rgba(0,229,255,0.15)'}>↑</button>
    <Toasts list={toasts}/>
  </div>
}
