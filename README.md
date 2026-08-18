Tuần 01
## Component sử dụng
- View: bố cục các khu vực trên màn hình.
- Text: hiển thị tiêu đề, thông tin sinh viên và nội dung.
- Image: hiển thị ảnh/avatar sinh viên.
- TextInput: ô tìm kiếm thông tin.
- ScrollView: hỗ trợ cuộn nội dung.
- Pressable: nút Lưu hồ sơ, thể hiện các trạng thái bình thường, đang nhấn và vô hiệu hóa.
- Accessibility: sử dụng `accessibilityRole`, `accessibilityLabel`, `accessibilityHint` và trạng thái để hỗ trợ người dùng.

## Cách chạy

Cài đặt dependencies:

```bash
npm install
```

Khởi động project:

```bash
npx expo start
```

Sau đó có thể:

* Nhấn `a` để chạy Android Emulator.
* Quét QR bằng **Expo Go** trên điện thoại.
* Hoặc chạy trực tiếp:

```bash
npx expo start --android
```

## Giao diện

Giao diện mô phỏng màn hình **SmartCampus**, gồm thông tin sinh viên, ô tìm kiếm, thẻ thông tin và nút lưu hồ sơ.
