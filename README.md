# Training NodeJs
## Branchs are tasks

### Docker compose là gì ?
Docker compose là công cụ dùng để định nghĩa và run multi-container cho Docker application. Với compose bạn sử dụng file YAML để config các services cho application của bạn. Sau đó dùng command để create và run từ những config đó. Sử dụng cũng khá đơn giản chỉ với ba bước:

Khai báo app’s environment trong Dockerfile.
Khai báo các services cần thiết để chạy application trong file docker-compose.yml.
Run docker-compose up để start và run app.
### Đặc điểm
Không giống như Dockerfile (build các image). Docker compose dùng để build và run các container. Các thao tác của docker-compose tương tự như lệnh: docker run.

Docker compose cho phép tạo nhiều service(container) giống nhau bằng lệnh:
```
$ docker-compose scale <tên service> = <số lượng>
```
### Một số trường hợp thường gặp khi sử dụng Compose
Compose có thể được sử dụng cho nhiều trường hợp. Dưới đây sẽ là hai trường hợp sử dụng Compose trong việc phát triển chương trình.

#### Những điều phải biết về docker compose
**Môi trường phát triển**

Khi phát triển một chương trình, việc chạy một chương trình trong một môi trường cô lập và tương tác là rất cần thiết. Compose cho phép thiết lập và chạy tất cả các service cần thiết cho chương trình. Chỉ với một câu lệnh docker-compose up, các service đó sẽ được chạy với các container tương ứng.

**Môi trường cho automated test**

Với automated test, việc tạo ra một môi trường cho việc sử dụng các gói test bằng compose trở nên rất đơn giản. Tạo một môi trường với Compose, chạy các gói test, sau đó hủy môi trường đó chỉ với ba dòng lệnh:
```
$ docker-compose up

$ ./run_tests
```
