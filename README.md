# Training NodeJs
## Branchs are tasks
### Dockerfile là gì ?
Docker sẽ xây dựng (build) docker image một cách tự động bằng cách đọc các chỉ thị (instruction) đã được khai báo trong một file có tên là Dockerfile. Dockerfile là một file văn bản chứa toàn bộ các chỉ thị lệnh mà người dùng muốn thực thi để tạo ra một Docker Image.Trình build docker image sẽ đọc nội dung file văn bản Dockerfile và gửi nội dung đó đến dịch vụ Docker đang chạy. Kế đến Docker sẽ chạy các chỉ thị trong Dockerfile từng dòng một, commit các kết quả của từng chỉ thị thành các lớp layer của image.
Như vậy, Dockerfile giúp ta đơn giản hoá và tự động hoá việc xây dựng một Docker Image.
### Cú pháp Dockerfile
Các INSTRUCTION là các chỉ thị, được docker quy định. Khi khai báo phải viết chữ in hoa.
Các arguments là đoạn nội dung mà chỉ thị sẽ làm gì.
Một Dockerfile phải bắt đầu bằng chỉ thị ‘FROM‘ để khai báo base image nào sẽ được sử dụng để làm nền tảng xây dựng image.
### Các chỉ thị (instruction) trong Dockerfile
Giờ bạn sẽ đến với danh sách các chỉ thị (instruction) được Docker quy định cho phép sử dụng trong file Dockerfile dùng để build Docker Image.
FROM
Cú pháp:

```FROM <image> [AS <name>]
FROM <image>[:<tag>] [AS <name>]
FROM <image>[@<digest>] [AS <name>]
```
Chỉ thị **FROM** dùng cho quá trình khởi tạo xây dựng một Docker Image mới và dùng để chỉ ra image gốc nào sẽ là cơ sở để build image thực hiện các chỉ thị kế tiếp. Như vậy, một Dockerfile hợp lệ thường phải bắt đầu bằng chỉ thị FROM . Các base image sẽ có thể được tải về từ Public Repository hoặc Private Repository riêng của người dùng setup.

Các giá trị thẻ (tag) hoặc digest là tùy chọn. Nếu bạn bỏ qua một trong số chúng, thì thẻ được sử dụng mặc định sẽ là ‘latest‘.
Ví dụ :

```
FROM ubuntu
```
RUN

Cú pháp:

```
RUN <command>  (shell form)
RUN ["executable", "param1", "param2"]  (exec form)
```
Chỉ thị RUN dùng để chạy một lệnh bất kì trên lớp layer mới của Docker Image và commit kết quả của lệnh đó khi build image. Ví dụ như bạn chạy lệnh để cài đặt các gói chương trình, package,.. thì kết quả việc cài đặt sẽ gồm các chương trình được cài vào lớp layer mới trong  docker image. Bạn có thể thực hiện nhiều lệnh cùng lúc ở cách thức ‘shell form‘ khi sử dụng chỉ thị RUN với dấu ‘\‘.

Ví dụ:

```
FROM ubuntu
RUN apt-get update
RUN apt-get install curl -y
```

CMD
Cú pháp:
```
CMD ["executable","param1","param2"] (exec form)
CMD ["param1","param2"] (tham số cho chỉ thị ENTRYPOINT)
CMD command param1 param2 (shell form)
```
Chỉ thị CMD được sử dụng để cung cấp câu lệnh mặc định sẽ được chạy khi Docker Container khởi động từ Image đã build, chỉ có thể có duy nhất 1 chỉ thị CMD trong một. Có 3 cách thức sử dụng lệnh CMD:

Sử dụng ở hình thức ‘exec form‘ với các tham số truyền vào.
Sử dụng ở hình thức ‘shell form‘ như bình thường.
Sử dụng ở hình thức truyền tham số cho chỉ thị ENTRYPOINT.
Khi sử dụng CMD ở ‘shell‘ hoặc ‘exec‘ form thì lệnh chỉ thị CMD sẽ được thực thi khi khởi chạy Container Docker. Vậy có khác gì so với chỉ thị lệnh RUN ? RUN chạy lệnh và commit kết quả của lệnh trong quá trình build image. CMD không thực thi câu lệnh ở quá trình build image, mà sẽ thực thi trong quá trình chạy Docker Container từ Image đó.

**ENTRYPOINT**
Cú pháp:
```
ENTRYPOINT ["executable", "param1", "param2"] (exec form)
ENTRYPOINT command param1 param2 (shell form)
```
Hai cái **CMD** và **ENTRYPOINT** có tác dụng tương tự nhau. Nếu một Dockerfile có cả **CMD** và **ENTRYPOINT** thì **CMD** sẽ thành param cho script **ENTRYPOINT**. Lý do người ta dùng ENTRYPOINT nhằm chuẩn bị các điều kiện setup như tạo user, mkdir, change owner… cần thiết để chạy service trong container.
