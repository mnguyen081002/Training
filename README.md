# Training NodeJs
## Branchs are tasks

### Redis là gì?
Redis là một mã nguồn mở (BSD licensed) được sử dụng như một database, cache hoặc message broker.

Một số đặc điểm của Redis:

Là cơ sở dữ liệu NoSQL, lưu trữ dữ liệu dưới dạng KEY-VALUE
Lưu trữ dữ liệu trên RAM, giúp việc truy xuất dữ liệu cực kì nhanh chóng.
Hỗ trợ nhiều cấu trúc dữ liệu cơ bản như Hash, List, Set, Sorted Set, String,....
Hỗ trợ cơ chế Pub/Sub messaging.
Nhờ đặc điểm giúp giảm thời gian truy vấn, nên Redis có tác dụng rất mạnh mẽ trong việc sử dụng làm cache cho các ứng dụng web.

###  Các chiến thuật Caching
#### Cache Aside:
Khi ứng dụng cần đọc dữ liệu từ database, nó sẽ kiểm tra trước xem cache có chứa dữ liệu mình cần không.
Nếu có (cache hit) thì trả về dữ liệu cần truy vấn.
Nếu dữ liệu không có sẵn trong cache (cache miss) thì ứng dụng sẽ lấy dữ liệu từ database.
#### Read Through:
Giống với cache aside nhưng ở đây, việc lấy dữ liệu từ database khi cache miss là của cache (thường được hỗ trợ bởi thư viện hoặc nhà cung cấp cache độc lập)

#### Write Through:
Dữ liệu được ghi vào cache và sau đó được lưu vào database. Khi được sử dụng cùng với phương pháp read through thì sẽ giúp dữ liệu có tính nhất quán, không phải sử dụng những kĩ thuật cache invalidation.

#### Write Back:
Ứng dụng lưu mọi thứ vào trong cache, rồi sau một khoảng thời gian delay nào đó cache sẽ lưu lại tất cả vào database. Chiến thuật này thường được dùng cho các ứng dụng nặng, nhưng có nhược điểm là nếu xảy ra lỗi trước khi cache lưu dữ liệu vào database thì những dữ liệu vừa lưu trong cache sẽ bị mất.

#### Cache invalidation
Khi dữ liệu trong database bị thay đổi thì dữ liệu trong cache đã bị cũ và không còn chính xác. Lúc này, cần thực hiện update hoặc gỡ bỏ những dữ liệu đã hết hạn trong cache, quá trình này gọi là cache invalidation.

=> Giải pháp:

Có thể cài thời gian sống (TTL) cho mỗi dữ liệu cache, tùy theo tần số thay đổi của dữ liệu, tần suất được truy vấn của dữ liệu, độ quan trọng của dữ liệu,...
Để tránh tình huống nhiều người dùng đang sử dụng ứng dụng, đúng lúc cache hết hạn đồng loạt khiến server đột ngột chịu tải lớn thì có thể đặt thời gian sống của mỗi dữ liệu khác nhau bằng cách đặt TTL là một giá trị ngẫu nhiên trong một khoảng nào đó.
