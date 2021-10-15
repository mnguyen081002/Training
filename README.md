﻿# Training

## Start

- run npm start
## JWT
- Jwt có 3 phần: header, payload, signature ngăn cách nhau bởi dấu .
  - Header bao gồm hai phần chính: loại token (mặc định là JWT - Thông tin này cho biết đây là một Token JWT) và thuật toán đã dùng để mã hóa (HMAC SHA256 - HS256 hoặc RSA).
  - Payload chứa các claims. Claims là một các biểu thức về một thực thể (chẳng hạn user) và một số metadata phụ trợ. Có 3 loại claims thường gặp trong Payload: reserved, public và private claims.

      Reserved claims: Đây là một số metadata được định nghĩa trước, trong đó một số metadata là bắt buộc, số còn lại nên tuân theo để JWT hợp lệ và đầy đủ thông tin: iss (issuer), iat (issued-at time) exp (expiration time), sub (subject), aud (audience), jti (Unique Identifier cho JWT, Can be used to prevent the JWT from being replayed. This is helpful for a one time use token.)

      Public Claims - Claims được cộng đồng công nhận và sử dụng rộng rãi.

      Private Claims - Claims tự định nghĩa (không được trùng với Reserved Claims và Public Claims), được tạo ra để chia sẻ thông tin giữa 2 parties đã thỏa thuận và thống nhất trước đó.
  - Signature
    
    Chữ ký Signature trong JWT là một chuỗi được mã hóa bởi header, payload cùng với một chuỗi bí mật. Do bản thân Signature đã bao gồm cả header và payload nên Signature có thể dùng để kiểm tra tính toàn vẹn của dữ liệu khi truyền tải.
 - Một trong những tình huống ứng dụng JWT thường gặp, đó là:

   - Authentication: Tình huống thường gặp nhất, khi user logged in, mỗi request tiếp đó đều kèm theo chuỗi token JWT, cho phép người dùng có thể truy cập đường dẫn, dịch vụ và tài nguyên được phép ứng với token đó. Single Sign On cũng là một chức năng có sử dụng JWT một cách rộng rãi, bởi vì chuỗi JWT có kích thước đủ nhỏ để đính kèm trong request và sử dụng ở nhiều hệ thống thuộc các domain khác nhau.
   - Information Exchange: JSON Web Token cũng là một cách hữu hiệu và bảo mật để trao đổi thông tin giữa nhiều ứng dụng, bởi vì JWT phải được ký (bằng cặp public / private key), bạn có thể chắc rằng người gửi chính là người mà họ nói rằng họ là (nói tóm tắt hơn là không hoặc khó để mạo danh bằng JWT), ngoài ra, chữ ký cũng được tính toán dựa trên nội dung của header và nội dung payload, nhờ đó, bạn có thể xác thực được nội dung là nguyên bản, chưa được chỉnh sửa hoặc can thiệp. Tuy nhiên, một lưu ý hết sức quan trọng là do cấu trúc của JWT đơn giản nên JWT có thể dễ dàng bị decode, do vậy, bạn không nên dùng JWT để transfer các thông tin nhạy cảm.
 - JWT sử dụng như thế nào ?
   - Ví dụ trong bài toán Authenticate (xác thực): Trong việc xác thực, khi user đăng nhập thành công (Browser sẽ post username và mật khẩu về Server), Server sẽ trả về một chuỗi JWT về Browser, và Token JWT này cần được lưu lại trong Browser của người dùng (thường là LocalStorage hoặc Cookies), thay vì cách truyền thống là tạo một session trên Server và trả về Cookie. Bất cứ khi nào mà User muốn truy cập vào Route được bảo vệ (mà chỉ có User đã đăng nhập mới được phép), Browser sẽ gửi token JWT này trong Header Authorization, Bearer schema của request gửi đi. Đây là cách mà stateless (phi trạng thái) authentication làm việc, trạng thái của user không được lưu trong bộ nhớ của Server mà được đóng gói hẳn vào trong JWT. Server sẽ kiểm tra Token JWT này có hợp lệ hay không (Bởi vì JWT có tính chất self-contained, mọi thông tin cần thiết để kiểm tra JWT đều đã được chứa trong Token JWT). Do tính chất stateless nên chúng ta không còn phải lo lắng về domains nào được sử dụng cho API của bạn, như không còn gặp rắc rối với CORS (Cross-Origin Resource Sharing) vì nó không sử dụng cookies.
