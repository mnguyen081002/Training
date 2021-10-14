# Training

## Start
- create database blog
- install global mocha
- run npm start
## CLI
- exit: Nếu các bài test của bạn bị treo sau khi nâng cấp lên Mocha v4.0.0 hoặc mới hơn, bạn có thể sử dụng --exit để khắc phục nhanh chóng. Trước phiên bản v4.0.0, Mocha sẽ buộc quá trình của chính nó thoát ra sau khi hoàn tất quá trình thực hiện tất cả các bài kiểm tra theo mặc định. Hành vi này sẽ tạo ra một loạt các vấn đề tiềm ẩn.
- --check-leaks: Bạn nên sử dụng tùy chọn này để Mocha kiểm tra các biến toàn cục bị rò rỉ trong khi chạy thử nghiệm
- --timeout <ms>, -t <ms> tăng thời gian chạy test.
  
https://www.w3resource.com/mocha/command-line-usage.php
## Hooks
Mocha cung cấp 4 loại hook:
- beforeEach(trước khi mọi thử nghiệm cụ thể trong một khối cụ thể được thực thi),
- beforeAll(trước khi tất cả các thử nghiệm trong một khối cụ thể được thực thi),
- afterEach(sau mỗi thử nghiệm cụ thể trong một khối cụ thể được thực thi),
- afterAll( sau khi tất cả các thử nghiệm trong một khối cụ thể được thực thi)
## Testing asynchronous code
- then vs done 
- async await
