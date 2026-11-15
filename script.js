/* ============================================================
   HỌC HTML TỪ SỐ 0 — script.js
   Cấu trúc file:
     PHẦN A — DỮ LIỆU (hằng số, sửa nội dung tại đây):
       TAG_INFO, ATTR_INFO : giải thích thẻ / thuộc tính (chạy từng dòng + tìm kiếm)
       LESSONS             : 16 bài học (mục tiêu, ví dụ live, lỗi, bài tập…)
       QUIZ                : 160 câu trắc nghiệm (10 câu / bài)
       CHEATSHEET          : bảng tra (thẻ, thuộc tính, input, entities, phím tắt)
     PHẦN B — LOGIC: highlight, live editor, quiz, tiến độ, router, tìm kiếm…
   Quy ước dữ liệu ví dụ: các tên file "anh.svg", "beep.wav", "phude.vtt",
   "poster.svg" được demo tự thay bằng data URI có sẵn (không cần file ngoài).
   ============================================================ */
"use strict";

/* ---------- A1. GIẢI THÍCH THẺ (dùng cho chế độ chạy từng dòng) ---------- */
const TAG_INFO = {
  "!doctype": "Khai báo tài liệu HTML5.",
  html: "Thẻ gốc html bao toàn bộ tài liệu; lang=\"vi\" khai báo tiếng Việt.",
  head: "Thẻ head chứa thông tin cấu hình, không hiển thị lên trang.",
  meta: "Thẻ meta khai báo siêu dữ liệu: bảng mã, khung nhìn, mô tả…",
  title: "Thẻ title đặt tên trang, hiển thị trên tab trình duyệt.",
  body: "Thẻ body chứa toàn bộ nội dung hiển thị của trang.",
  h1: "Thẻ h1 là tiêu đề cấp 1 — lớn nhất, mỗi trang chỉ nên có một.",
  h2: "Thẻ h2 là tiêu đề cấp 2, chia các mục lớn.",
  h3: "Thẻ h3 là tiêu đề cấp 3, chia các mục con của h2.",
  h4: "Thẻ h4 là tiêu đề cấp 4.", h5: "Thẻ h5 là tiêu đề cấp 5.", h6: "Thẻ h6 là tiêu đề cấp 6 — nhỏ nhất.",
  p: "Thẻ p tạo một đoạn văn (paragraph).",
  br: "Thẻ br xuống một dòng ngay tại vị trí đặt thẻ (thẻ rỗng).",
  hr: "Thẻ hr kẻ đường ngang phân tách nội dung (thẻ rỗng).",
  strong: "Thẻ strong đánh dấu nội dung quan trọng (in đậm + ngữ nghĩa).",
  em: "Thẻ em nhấn mạnh nội dung (in nghiêng + ngữ nghĩa).",
  b: "Thẻ b in đậm thuần túy, không mang ngữ nghĩa quan trọng.",
  i: "Thẻ i in nghiêng thuần túy (thuật ngữ, tên nước ngoài…).",
  mark: "Thẻ mark tô sáng nền vàng cho nội dung cần chú ý.",
  small: "Thẻ small cho chữ nhỏ: ghi chú, bản quyền, điều khoản.",
  sub: "Thẻ sub viết chỉ số dưới (H₂O).",
  sup: "Thẻ sup viết chỉ số trên (m², số mũ).",
  blockquote: "Thẻ blockquote trích dẫn một khối dài, thường thụt lề.",
  q: "Thẻ q trích dẫn ngắn trong dòng, trình duyệt tự thêm ngoặc kép.",
  code: "Thẻ code đánh dấu một đoạn mã máy tính.",
  pre: "Thẻ pre giữ nguyên khoảng trắng và xuống dòng trong code.",
  abbr: "Thẻ abbr viết tắt; title giải thích nghĩa đầy đủ khi di chuột.",
  ul: "Thẻ ul tạo danh sách không thứ tự (gạch đầu dòng).",
  ol: "Thẻ ol tạo danh sách có thứ tự (đánh số).",
  li: "Thẻ li là một mục của danh sách ul/ol.",
  dl: "Thẻ dl tạo danh sách thuật ngữ – mô tả.",
  dt: "Thẻ dt là thuật ngữ trong danh sách dl.",
  dd: "Thẻ dd là phần mô tả cho thuật ngữ dt đứng trước.",
  a: "Thẻ a tạo liên kết tới trang, file hoặc vị trí khác.",
  img: "Thẻ img chèn ảnh; src là nguồn, alt là mô tả thay thế.",
  figure: "Thẻ figure nhóm nội dung minh họa (ảnh, sơ đồ…) độc lập.",
  figcaption: "Thẻ figcaption là chú thích cho figure.",
  picture: "Thẻ picture chọn nguồn ảnh theo điều kiện (kích thước màn hình…).",
  source: "Thẻ source khai báo một nguồn cho picture / audio / video.",
  div: "Thẻ div là khối chứa đa năng (block), không mang ngữ nghĩa.",
  span: "Thẻ span là vùng chứa trong dòng (inline), không mang ngữ nghĩa.",
  header: "Thẻ header là phần đầu trang hoặc đầu khu vực.",
  nav: "Thẻ nav chứa nhóm liên kết điều hướng.",
  main: "Thẻ main chứa nội dung chính, mỗi trang chỉ một thẻ.",
  section: "Thẻ section nhóm một phần nội dung theo chủ đề.",
  article: "Thẻ article là nội dung độc lập: bài viết, tin, bình luận.",
  aside: "Thẻ aside chứa nội dung phụ: sidebar, ghi chú bên lề.",
  footer: "Thẻ footer là phần cuối trang hoặc cuối khu vực.",
  table: "Thẻ table tạo bảng dữ liệu.",
  caption: "Thẻ caption đặt tiêu đề cho bảng, nằm ngay sau thẻ mở table.",
  thead: "Thẻ thead nhóm các hàng tiêu đề của bảng.",
  tbody: "Thẻ tbody nhóm các hàng dữ liệu của bảng.",
  tfoot: "Thẻ tfoot nhóm các hàng tổng kết của bảng.",
  tr: "Thẻ tr tạo một hàng trong bảng.",
  th: "Thẻ th là ô tiêu đề (in đậm, căn giữa mặc định).",
  td: "Thẻ td là ô dữ liệu thường trong bảng.",
  form: "Thẻ form tạo biểu mẫu nhập liệu; action là nơi gửi, method là cách gửi.",
  label: "Thẻ label gắn nhãn cho ô nhập; for trỏ tới id của ô.",
  input: "Thẻ input tạo ô nhập liệu; type quyết định kiểu ô.",
  textarea: "Thẻ textarea tạo ô nhập văn bản nhiều dòng.",
  select: "Thẻ select tạo danh sách thả xuống.",
  option: "Thẻ option là một lựa chọn trong select / datalist.",
  optgroup: "Thẻ optgroup nhóm các option, label là tên nhóm.",
  datalist: "Thẻ datalist gợi ý giá trị cho input (vẫn cho nhập tự do).",
  button: "Thẻ button tạo nút bấm; type có thể là submit / reset / button.",
  fieldset: "Thẻ fieldset nhóm các ô nhập liên quan, có viền bao.",
  legend: "Thẻ legend đặt tên nhóm cho fieldset.",
  audio: "Thẻ audio nhúng âm thanh vào trang.",
  video: "Thẻ video nhúng video vào trang.",
  track: "Thẻ track thêm phụ đề / chú thích cho audio, video.",
  iframe: "Thẻ iframe nhúng một trang web khác vào trang hiện tại.",
  svg: "Thẻ svg vẽ đồ họa vector ngay trong HTML.",
  circle: "Thẻ circle vẽ hình tròn: tâm (cx, cy), bán kính r.",
  rect: "Thẻ rect vẽ hình chữ nhật: x, y, width, height.",
  line: "Thẻ line vẽ đoạn thẳng từ (x1, y1) tới (x2, y2).",
  path: "Thẻ path vẽ đường bất kỳ qua lệnh trong thuộc tính d.",
  text: "Thẻ text vẽ chữ bên trong SVG.",
  polygon: "Thẻ polygon vẽ đa giác qua danh sách điểm points.",
  details: "Thẻ details tạo khối nội dung đóng / mở được.",
  summary: "Thẻ summary là tiêu đề bấm để đóng / mở details.",
  dialog: "Thẻ dialog tạo hộp thoại; cần JavaScript để mở bằng showModal().",
  progress: "Thẻ progress hiển thị thanh tiến trình công việc.",
  meter: "Thẻ meter hiển thị thanh đo giá trị trong khoảng (điểm, pin…).",
  script: "Thẻ script chứa hoặc nạp JavaScript.",
  style: "Thẻ style chứa CSS nội tuyến.",
  link: "Thẻ link nạp tài nguyên ngoài, thường là file CSS."
};

/* Giải thích thuộc tính phổ biến (ghép thêm khi chạy từng dòng) */
const ATTR_INFO = {
  href: "href chỉ địa chỉ đích của liên kết.",
  src: "src chỉ đường dẫn tới tài nguyên (ảnh, âm thanh…).",
  alt: "alt mô tả ảnh bằng chữ, hiển thị khi ảnh lỗi và cho trình đọc màn hình.",
  title: "title hiện chú thích nhỏ khi di chuột vào phần tử.",
  target: 'target="_blank" mở liên kết trong tab mới.',
  rel: 'rel="noopener" chặn tab mới truy ngược trang gốc (bảo mật).',
  id: "id là định danh duy nhất của phần tử trong trang.",
  class: "class gắn nhãn để chọn phần tử bằng CSS / JavaScript.",
  lang: "lang khai báo ngôn ngữ của nội dung.",
  style: "style viết CSS trực tiếp cho phần tử.",
  type: "type chọn kiểu phần tử (ô nhập, nút, kiểu đánh số…).",
  name: "name là tên dữ liệu gửi đi khi biểu mẫu được gửi.",
  value: "value là giá trị của ô nhập / lựa chọn.",
  placeholder: "placeholder là chữ gợi ý mờ trong ô nhập.",
  required: "required bắt buộc phải nhập / chọn trước khi gửi.",
  disabled: "disabled vô hiệu hóa ô nhập (không gửi dữ liệu).",
  readonly: "readonly chỉ cho đọc, vẫn gửi dữ liệu khi submit.",
  checked: "checked chọn sẵn checkbox / radio.",
  selected: "selected chọn sẵn option trong select.",
  for: "for của label trỏ đúng id của ô nhập.",
  colspan: "colspan cho ô trải ngang nhiều cột.",
  rowspan: "rowspan cho ô trải dọc nhiều hàng.",
  scope: "scope cho th biết nó là tiêu đề cột (col) hay hàng (row).",
  controls: "controls hiện thanh điều khiển phát / tạm dừng.",
  autoplay: "autoplay yêu cầu tự phát (trình duyệt thường chặn nếu có tiếng).",
  muted: "muted tắt tiếng — thường đi kèm autoplay để được phép tự phát.",
  loop: "loop phát lại từ đầu khi kết thúc.",
  poster: "poster là ảnh hiện trước khi video phát.",
  loading: 'loading="lazy" chỉ tải ảnh khi sắp cuộn tới.',
  width: "width đặt chiều rộng (pixel).",
  height: "height đặt chiều cao (pixel).",
  srcset: "srcset liệt kê các phiên bản ảnh theo kích thước / độ nét.",
  media: "media đặt điều kiện màn hình để chọn source.",
  min: "min đặt giá trị nhỏ nhất cho phép.",
  max: "max đặt giá trị lớn nhất cho phép.",
  minlength: "minlength là số ký tự tối thiểu.",
  maxlength: "maxlength là số ký tự tối đa.",
  pattern: "pattern là mẫu regex mà giá trị phải khớp.",
  autocomplete: "autocomplete gợi ý trình duyệt điền tự động.",
  action: "action là địa chỉ nhận dữ liệu biểu mẫu.",
  method: "method chọn cách gửi: get (trên URL) hoặc post (trong thân yêu cầu).",
  rows: "rows là số dòng hiển thị của textarea.",
  cols: "cols là số cột hiển thị của textarea.",
  list: "list nối input với id của một datalist.",
  open: "open khiến details / dialog mở sẵn khi tải trang.",
  start: "start đặt số bắt đầu của danh sách ol.",
  reversed: "reversed đánh số danh sách ol theo thứ tự giảm dần.",
  download: "download yêu cầu tải file về thay vì mở.",
  charset: 'charset="UTF-8" giúp hiển thị đúng tiếng Việt.',
  content: "content mang giá trị của thẻ meta.",
  viewBox: "viewBox đặt hệ tọa độ cho SVG.",
  fill: "fill chọn màu tô bên trong hình.",
  stroke: "stroke chọn màu đường viền."
};

/* ---------- A2. 16 BÀI HỌC ---------- */
/* Mỗi bài: goals, intro, syntax, examples (live code riêng từng thẻ),
   mistakes (sai/đúng), tips, exercises (2 bài, có checks tự chấm), summary. */
const LESSONS = [
{
  id: 1, part: 1, title: "Làm quen: web, trình duyệt và file .html đầu tiên", minutes: 10,
  goals: [
    "Giải thích được web, trình duyệt và HTML là gì, vai trò của từng thứ.",
    "Tự tạo, lưu và chạy được file .html đầu tiên bằng trình duyệt.",
    "Phân biệt vai trò của HTML (khung), CSS (trang trí) và JavaScript (hành vi)."
  ],
  intro: `<p>Hãy tưởng tượng website như một ngôi nhà: <strong>HTML là khung xương và tường</strong> (cấu trúc, nội dung), CSS là sơn và nội thất (giao diện), JavaScript là điện nước (tương tác). Trình duyệt (Chrome, Edge, Firefox…) là "đội thợ" đọc bản vẽ HTML rồi dựng thành trang bạn nhìn thấy.</p><p>HTML viết tắt của <em>HyperText Markup Language</em> — ngôn ngữ <strong>đánh dấu</strong> siêu văn bản. "Đánh dấu" nghĩa là dùng các <strong>thẻ (tag)</strong> để bọc nội dung và nói cho trình duyệt biết mỗi phần là gì: đây là tiêu đề, kia là đoạn văn, chỗ này là liên kết. HTML không phải ngôn ngữ lập trình: nó không tính toán, chỉ mô tả cấu trúc.</p>`,
  syntax: `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tên trang</title>
</head>
<body>
  Nội dung hiển thị nằm ở đây.
</body>
</html>`,
  examples: [
    { t: "Trang HTML đầu tiên", code:
`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Trang đầu tiên</title>
</head>
<body>
  <h1>Xin chào!</h1>
  <p>Đây là trang web đầu tiên của tôi.</p>
</body>
</html>`,
      note: "Cách làm thật: mở VS Code → New File → lưu tên index.html (chọn UTF-8) → gõ code → Ctrl+S → mở file bằng trình duyệt. Sửa xong nhớ lưu rồi tải lại trang (F5)." },
    { t: "Trình duyệt rất dễ tính", code:
`<p>Chỉ một thẻ p, thiếu cả khung trang, vẫn hiển thị được.</p>`,
      note: "Trình duyệt tự bù khung thiếu, nhưng code chuẩn phải có đủ khung như ví dụ trên — học kỹ ở Bài 2." }
  ],
  mistakes: [
    { bad: `<p>Xin chào các bạn<p>`, good: `<p>Xin chào các bạn</p>`,
      why: "Thẻ đóng phải có dấu gạch chéo: </p>. Thiếu dấu / thì thẻ mở thứ hai bị hiểu là mở thêm đoạn mới." },
    { bad: `<h1>Tiêu đề trang<h1>`, good: `<h1>Tiêu đề trang</h1>`,
      why: "Lỗi kinh điển của người mới: quên dấu / ở thẻ đóng. Trình duyệt vẫn cố hiển thị nhưng cấu trúc sai, dễ sinh lỗi dây chuyền." }
  ],
  tips: [
    "Soạn code bằng VS Code (miễn phí) thay vì Notepad: có tô màu code và gợi ý thẻ.",
    "Luôn lưu file với bảng mã UTF-8 để tiếng Việt không bị lỗi ô vuông.",
    "Đặt tên file không dấu, không khoảng trắng: index.html, bai-tap-1.html.",
    "Quy trình lặp lại suốt khóa học: sửa code → Ctrl+S → quay lại trình duyệt → F5."
  ],
  exercises: [
    { t: "Trang giới thiệu bản thân",
      prompt: "Tạo trang có tiêu đề h1 ghi \"Trang đầu tiên của tôi\" và một đoạn p giới thiệu tên, tuổi hoặc nghề nghiệp của bạn.",
      starter: `<h1></h1>\n<p></p>`,
      hints: ["Viết chữ Trang đầu tiên của tôi vào giữa thẻ mở <h1> và thẻ đóng </h1>.", "Viết lời giới thiệu của bạn vào giữa <p> và </p>.", "Bấm ▶ Chạy (hoặc Ctrl+Enter) để xem kết quả bên phải."],
      solution: `<h1>Trang đầu tiên của tôi</h1>\n<p>Tôi là An, năm nay 20 tuổi và đang học lập trình web.</p>`,
      checks: [
        { d: "Có thẻ h1 chứa chữ \"Trang đầu tiên\"", r: "<h1>[^<]*Trang đầu tiên" },
        { d: "Có đoạn p với nội dung và thẻ đóng </p>", r: "<p>[^<]+</p>" }
      ] },
    { t: "Thêm mục sở thích",
      prompt: "Nối tiếp bài 1: thêm tiêu đề phụ h2 \"Sở thích của tôi\" và đoạn p thứ hai kể về một sở thích. Trang phải có ít nhất 2 đoạn văn.",
      starter: `<h1>Trang đầu tiên của tôi</h1>\n<p>Tôi là An.</p>`,
      hints: ["h2 là tiêu đề cấp nhỏ hơn h1, dùng cho mục con.", "Viết thêm một cặp <p>...</p> thứ hai bên dưới.", "Đếm lại: trang cần tối thiểu 2 thẻ p đóng đủ."],
      solution: `<h1>Trang đầu tiên của tôi</h1>\n<p>Tôi là An.</p>\n<h2>Sở thích của tôi</h2>\n<p>Tôi thích đọc sách và chạy bộ mỗi sáng.</p>`,
      checks: [
        { d: "Có tiêu đề phụ h2", r: "<h2>[^<]+</h2>" },
        { d: "Có ít nhất 2 đoạn p hoàn chỉnh", r: "<p>[\\s\\S]*?</p>[\\s\\S]*?<p>[\\s\\S]*?</p>" }
      ] }
  ],
  summary: [
    "HTML là ngôn ngữ đánh dấu, tạo cấu trúc và nội dung trang web; không phải ngôn ngữ lập trình.",
    "Trình duyệt đọc file HTML và dựng thành giao diện; HTML + CSS + JavaScript là bộ ba của web.",
    "File HTML có đuôi .html, lưu UTF-8, mở trực tiếp bằng trình duyệt là chạy.",
    "Thẻ thường đi theo cặp mở/đóng: <p>nội dung</p> — thẻ đóng có dấu /."
  ]
},
{
  id: 2, part: 1, title: "Khung tài liệu và cú pháp HTML", minutes: 15,
  goals: [
    "Viết thuộc lòng khung tài liệu HTML5 chuẩn và giải thích từng dòng.",
    "Nắm quy tắc thẻ mở/đóng, thẻ rỗng, lồng thẻ đúng thứ tự.",
    "Dùng thuộc tính, chú thích và ký tự đặc biệt (entities) đúng cách."
  ],
  intro: `<p>Mỗi tài liệu HTML là một "hợp đồng" với trình duyệt: dòng <code>&lt;!DOCTYPE html&gt;</code> tuyên bố "đây là HTML5"; thẻ <code>&lt;html lang="vi"&gt;</code> khai báo ngôn ngữ tiếng Việt; <code>&lt;head&gt;</code> là phần cấu hình (không hiển thị); <code>&lt;body&gt;</code> là phần nội dung (hiển thị).</p><p>Quy tắc cú pháp rất đơn giản: thẻ mở <code>&lt;tên&gt;</code>, thẻ đóng <code>&lt;/tên&gt;</code>; một số <strong>thẻ rỗng (void)</strong> như <code>br, hr, img, meta, input</code> không có nội dung nên không cần đóng. Thẻ lồng nhau phải đóng theo thứ tự ngược: mở trước thì đóng sau — giống xếp bát vào nhau.</p>`,
  syntax: `<tên-thẻ thuộc-tính="giá trị">nội dung</tên-thẻ>
<!-- chú thích: trình duyệt bỏ qua -->
Ký tự đặc biệt: &lt;  &gt;  &amp;  &copy;  &nbsp;`,
  examples: [
    { t: "Khung tài liệu chuẩn HTML5", code:
`<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bài 2: Khung tài liệu</title>
</head>
<body>
  <p>Nội dung trang nằm trong body.</p>
</body>
</html>`,
      note: "charset=UTF-8 chống lỗi tiếng Việt; viewport giúp trang hiển thị đúng trên điện thoại; title là chữ trên tab trình duyệt." },
    { t: "Thẻ mở/đóng và thẻ rỗng", code:
`<p>Thẻ p có nội dung nên cần thẻ đóng.</p>
<br>
<hr>
<p>br xuống dòng, hr kẻ ngang — cả hai là thẻ rỗng, không cần </br>.</p>`,
      note: "Thẻ rỗng hay gặp: br, hr, img, input, meta, link, source, track, wbr." },
    { t: "Lồng thẻ đúng thứ tự", code:
`<p><strong>HTML</strong> rất <em>thú vị</em>.</p>
<p>Mở trước — đóng sau, như xếp bát chồng nhau.</p>`,
      note: "strong mở sau p thì phải đóng trước p. Đóng chéo nhau là lỗi lồng thẻ." },
    { t: "Thuộc tính nằm trong thẻ mở", code:
`<p title="Di chuột vào đây để xem chú thích" lang="vi">
  Thuộc tính luôn viết trong thẻ mở, dạng tên="giá trị".
</p>`,
      note: "Giá trị thuộc tính nên đặt trong ngoặc kép. Tên thuộc tính không phân biệt hoa/thường nhưng quy ước viết thường." },
    { t: "Chú thích (comment)", code:
`<!-- Đây là chú thích, người đọc code thấy, trình duyệt không hiển thị -->
<p>Đoạn văn này hiển thị.</p>
<!-- <p>Đoạn này bị "nhốt" trong chú thích nên không hiện</p> -->`,
      note: "Chú thích bắt đầu bằng <!-- và kết thúc bằng -->, dùng để ghi chú hoặc tạm ẩn code." },
    { t: "Ký tự đặc biệt (entities)", code:
`<p>In ra dấu nhọn và dấu và: &lt; &gt; &amp;</p>
<p>Bản quyền: &copy; 2026 — Khoảng&nbsp;cách&nbsp;cứng.</p>
<p>Toán học: 5 &lt; 6 và 6 &gt; 5.</p>`,
      note: "Vì < và > dùng cho thẻ nên muốn hiển thị chúng phải viết &lt; và &gt;. &nbsp; là khoảng cách không bị ngắt dòng." }
  ],
  mistakes: [
    { bad: `<p><strong>in đậm</p></strong>`, good: `<p><strong>in đậm</strong></p>`,
      why: "Lồng sai: strong mở trong p thì phải đóng trước p. Trình duyệt sẽ tự sửa ngầm nhưng kết quả khó lường." },
    { bad: `<p>Nếu 5 < 6 thì đúng</p>`, good: `<p>Nếu 5 &lt; 6 thì đúng</p>`,
      why: "Dấu < trong nội dung dễ bị hiểu nhầm là bắt đầu một thẻ. Phải viết thành &lt;." }
  ],
  tips: [
    "Trong VS Code gõ ! rồi Tab (Emmet) để sinh khung HTML5 chuẩn ngay lập tức.",
    "Đừng thiếu meta charset — thiếu nó tiếng Việt có thể thành ký tự lạ.",
    "meta viewport là bắt buộc nếu muốn trang responsive trên điện thoại.",
    "Thẻ rỗng không cần dấu / tự đóng (viết <br> hay <br /> đều được, HTML5 khuyến khích <br>)."
  ],
  exercises: [
    { t: "Hoàn thiện khung tài liệu",
      prompt: "Khung dưới đây còn thiếu: đặt lang=\"vi\" cho html, điền charset UTF-8, thêm meta viewport và title \"Bài 2 của tôi\".",
      starter: `<!DOCTYPE html>\n<html lang="">\n<head>\n  <meta charset="">\n  <title></title>\n</head>\n<body>\n  <p>Khung tài liệu của tôi</p>\n</body>\n</html>`,
      hints: ["lang nằm trong thẻ mở <html ...>, điền vi.", "charset nằm trong thẻ meta, điền UTF-8.", "Thêm dòng <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> vào head.", "Đặt chữ Bài 2 của tôi giữa <title> và </title>."],
      solution: `<!DOCTYPE html>\n<html lang="vi">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Bài 2 của tôi</title>\n</head>\n<body>\n  <p>Khung tài liệu của tôi</p>\n</body>\n</html>`,
      checks: [
        { d: "html có lang=\"vi\"", r: "<html[^>]*lang=\"vi\"" },
        { d: "meta charset là UTF-8", r: "charset=\"?UTF-8\"?" },
        { d: "Có meta viewport", r: "name=\"viewport\"" },
        { d: "title có nội dung", r: "<title>[^<]+</title>" }
      ] },
    { t: "Hiển thị ký tự đặc biệt",
      prompt: "Viết một đoạn p hiển thị đúng dòng chữ: <html> & bạn (tức là nhìn thấy dấu nhọn và dấu & trên trang, không phải tạo thẻ).",
      starter: `<p></p>`,
      hints: ["Dấu < viết là &lt; còn dấu > viết là &gt;.", "Dấu & viết là &amp;.", "Kết quả cần hiển thị: <html> & bạn."],
      solution: `<p>&lt;html&gt; &amp; bạn</p>`,
      checks: [
        { d: "Dùng &lt; và &gt; cho cặp dấu nhọn", r: "&lt;html&gt;" },
        { d: "Dùng &amp; cho dấu và", r: "&amp;" }
      ] }
  ],
  summary: [
    "Khung chuẩn: DOCTYPE → html lang → head (charset, viewport, title) → body.",
    "Thẻ có nội dung thì có cặp mở/đóng; thẻ rỗng (br, hr, img, meta…) không cần đóng.",
    "Lồng thẻ đúng: mở trước đóng sau; thuộc tính viết trong thẻ mở dạng tên=\"giá trị\".",
    "Chú thích <!-- ... --> không hiển thị; ký tự < > & phải viết dạng entities &lt; &gt; &amp;."
  ]
},
{
  id: 3, part: 1, title: "Văn bản: tiêu đề, đoạn văn và định dạng chữ", minutes: 20,
  goals: [
    "Dùng đúng hệ thống tiêu đề h1–h6 và đoạn văn p.",
    "Chọn đúng thẻ định dạng: strong/em, mark, small, sub/sup.",
    "Phân biệt trích dẫn blockquote/q và mã code/pre, viết tắt abbr."
  ],
  intro: `<p>Chữ nghĩa là phần lớn nội dung web. HTML có bộ thẻ văn bản rõ ràng: <strong>h1–h6</strong> là 6 cấp tiêu đề (h1 to nhất, mỗi trang một cái), <strong>p</strong> là đoạn văn. Điểm quan trọng: HTML không quan tâm bạn nhấn Enter bao nhiêu lần trong code — muốn xuống dòng phải dùng thẻ.</p><p>Ngoài in đậm/nghiêng, HTML còn các thẻ mang <em>ý nghĩa</em>: strong (quan trọng), em (nhấn mạnh), mark (tô sáng), small (chữ nhỏ ghi chú), sub/sup (chỉ số dưới/trên), blockquote/q (trích dẫn), code/pre (mã), abbr (viết tắt). Trình đọc màn hình và Google hiểu các thẻ này — đó là lý do nên dùng đúng thay vì chỉ nhìn giao diện.</p>`,
  syntax: `<h1>Tiêu đề chính</h1>
<p>Đoạn văn có <strong>chữ quan trọng</strong> và <em>chữ nhấn mạnh</em>.</p>`,
  examples: [
    { t: "Sáu cấp tiêu đề h1–h6", code:
`<h1>Tiêu đề cấp 1</h1>
<h2>Tiêu đề cấp 2</h2>
<h3>Tiêu đề cấp 3</h3>
<h4>Tiêu đề cấp 4</h4>
<h5>Tiêu đề cấp 5</h5>
<h6>Tiêu đề cấp 6</h6>`,
      note: "Dùng theo thứ bậc như mục lục sách: h1 → h2 → h3, không nhảy cóc và không dùng tiêu đề chỉ để chữ to." },
    { t: "Đoạn văn p", code:
`<p>Hà Nội là thủ đô của Việt Nam.</p>
<p>Thành phố có hơn một nghìn năm lịch sử.</p>`,
      note: "Mỗi p là một đoạn, trình duyệt tự tạo khoảng cách giữa các đoạn." },
    { t: "Xuống dòng với br", code:
`<p>Học HTML mỗi ngày,<br>Mỗi ngày một tiến bộ.</p>`,
      note: "br xuống dòng trong cùng đoạn — hợp với thơ, địa chỉ. Không dùng br để tạo khoảng cách giữa đoạn." },
    { t: "Đường phân cách hr", code:
`<p>Phần mở đầu của bài viết.</p>
<hr>
<p>Phần nội dung chính, tách biệt nhờ đường ngang.</p>`,
      note: "hr mang nghĩa chuyển chủ đề, không chỉ là đường kẻ trang trí." },
    { t: "Nội dung quan trọng: strong", code:
`<p>Cảnh báo: <strong>không bao giờ chia sẻ mật khẩu</strong> cho người khác.</p>`,
      note: "strong vừa in đậm vừa báo cho máy hiểu đây là nội dung quan trọng." },
    { t: "Nhấn mạnh: em", code:
`<p>Tôi <em>thực sự</em> thích học HTML.</p>`,
      note: "em in nghiêng và thay đổi ngữ điệu khi trình đọc màn hình đọc." },
    { t: "Tô sáng: mark", code:
`<p>Khi ôn thi, hãy nhớ: <mark>thẻ đóng luôn có dấu gạch chéo</mark>.</p>`,
      note: "mark tô nền vàng, hợp đánh dấu từ khóa trong kết quả tìm kiếm." },
    { t: "Chữ nhỏ: small", code:
`<p>Giá: 250.000đ <small>(đã gồm thuế VAT)</small></p>
<p><small>© 2026 Học HTML. Ghi rõ nguồn khi trích dẫn.</small></p>`,
      note: "small dành cho ghi chú phụ, điều khoản, bản quyền — không dùng để hạ cấp tiêu đề." },
    { t: "Chỉ số dưới / trên: sub và sup", code:
`<p>Công thức nước: H<sub>2</sub>O</p>
<p>Diện tích phòng: 25 m<sup>2</sup></p>`,
      note: "sub cho hóa học, sup cho số mũ, đơn vị diện tích, chú thích cuối trang." },
    { t: "Trích dẫn khối: blockquote", code:
`<blockquote>
  <p>Học đi đôi với hành.</p>
</blockquote>
<p>— Tục ngữ Việt Nam</p>`,
      note: "blockquote thụt lề cả khối, dùng cho trích dẫn dài từ nguồn khác." },
    { t: "Trích dẫn trong dòng: q", code:
`<p>Ông tôi hay dặn: <q>Có công mài sắt, có ngày nên kim</q>.</p>`,
      note: "q tự thêm dấu ngoặc kép quanh trích dẫn ngắn, không xuống dòng." },
    { t: "Mã trong dòng: code", code:
`<p>Để tạo đoạn văn, dùng thẻ <code>&lt;p&gt;</code>.</p>`,
      note: "code đổi sang phông monospace, báo hiệu đây là mã máy tính." },
    { t: "Giữ nguyên định dạng: pre", code:
`<pre>
Bước 1: mở thẻ
  Bước 2: thêm nội dung
Bước 3: đóng thẻ
</pre>`,
      note: "pre giữ nguyên mọi khoảng trắng, xuống dòng — thường bọc code nhiều dòng." },
    { t: "Viết tắt: abbr", code:
`<p><abbr title="HyperText Markup Language">HTML</abbr> là ngôn ngữ đánh dấu siêu văn bản.</p>`,
      note: "Di chuột vào chữ HTML sẽ thấy giải thích đầy đủ nhờ title." }
  ],
  mistakes: [
    { bad: `<h1>Dòng thứ nhất</h1>\n<h1>Dòng thứ hai</h1>`, good: `<h1>Tiêu đề trang</h1>\n<p>Dòng thứ hai</p>`,
      why: "Lạm dụng h1 để chữ to làm hỏng cấu trúc tài liệu. Mỗi trang một h1; muốn chữ to hãy dùng CSS." },
    { bad: `<p>Đoạn một\nĐoạn hai</p>`, good: `<p>Đoạn một</p>\n<p>Đoạn hai</p>`,
      why: "Nhấn Enter trong code không tạo xuống dòng trên trang. Muốn tách đoạn dùng p, muốn xuống dòng dùng br." }
  ],
  tips: [
    "b và i vẫn hợp lệ nhưng chỉ in đậm/nghiêng thuần túy; cần ngữ nghĩa thì dùng strong và em.",
    "Đừng dùng nhiều br liên tiếp để tạo khoảng trống — đó là việc của CSS margin.",
    "pre thường đi kèm code: <pre><code>...</code></pre> cho khối mã nhiều dòng.",
    "Tiêu đề đúng thứ bậc giúp SEO và người dùng trình đọc màn hình điều hướng nhanh."
  ],
  exercises: [
    { t: "Bài thơ có định dạng",
      prompt: "Viết h2 \"Bài thơ học HTML\", rồi một đoạn p chứa ít nhất 2 lần xuống dòng br, 1 thẻ strong và 1 thẻ mark.",
      starter: `<h2>Bài thơ học HTML</h2>\n<p></p>`,
      hints: ["Viết câu thơ đầu, thêm <br>, rồi câu tiếp theo.", "Bọc một cụm từ quan trọng bằng <strong>...</strong>.", "Bọc một từ khóa bằng <mark>...</mark>."],
      solution: `<h2>Bài thơ học HTML</h2>\n<p>Học HTML mỗi ngày,<br>Mỗi ngày một tiến bộ.<br><strong>Đừng quên</strong> đóng thẻ,<br>Nhớ dùng <mark>đúng thẻ</mark> đúng chỗ.</p>`,
      checks: [
        { d: "Có ít nhất 2 thẻ br", r: "<br\\s*/?>[\\s\\S]*<br" },
        { d: "Có thẻ strong đóng đủ", r: "<strong>[^<]+</strong>" },
        { d: "Có thẻ mark đóng đủ", r: "<mark>[^<]+</mark>" }
      ] },
    { t: "Công thức và viết tắt",
      prompt: "Viết các đoạn p thể hiện: công thức nước H₂O (dùng sub), diện tích 25 m² (dùng sup), chữ HTML là abbr có title giải thích, và một thẻ code bất kỳ.",
      starter: `<p>Nước: </p>\n<p>Diện tích: </p>`,
      hints: ["Số 2 trong H2O đặt trong <sub>2</sub>.", "Số 2 trong m2 đặt trong <sup>2</sup>.", "Viết <abbr title=\"HyperText Markup Language\">HTML</abbr>.", "Thêm một thẻ, ví dụ <code>&lt;sub&gt;</code>."],
      solution: `<p>Nước: H<sub>2</sub>O</p>\n<p>Diện tích: 25 m<sup>2</sup></p>\n<p><abbr title="HyperText Markup Language">HTML</abbr> có thẻ <code>&lt;sub&gt;</code> và <code>&lt;sup&gt;</code>.</p>`,
      checks: [
        { d: "Có chỉ số dưới <sub>2</sub>", r: "<sub>2</sub>" },
        { d: "Có chỉ số trên <sup>2</sup>", r: "<sup>2</sup>" },
        { d: "abbr có title giải thích", r: "<abbr[^>]*title=\"[^\"]+\"[^>]*>\\s*HTML\\s*</abbr>" },
        { d: "Có thẻ code", r: "<code>[^<]*</code>" }
      ] }
  ],
  summary: [
    "h1–h6 là 6 cấp tiêu đề theo thứ bậc; p là đoạn văn; br xuống dòng; hr phân tách chủ đề.",
    "strong/em mang ngữ nghĩa quan trọng/nhấn mạnh; mark tô sáng; small cho ghi chú.",
    "sub/sup viết chỉ số dưới/trên; blockquote trích khối, q trích trong dòng.",
    "code cho mã trong dòng, pre giữ nguyên khoảng trắng; abbr kèm title giải thích viết tắt.",
    "Enter trong code không tạo xuống dòng — mọi xuống dòng phải bằng thẻ."
  ]
},
{
  id: 4, part: 1, title: "Danh sách: ul, ol, li, dl và danh sách lồng nhau", minutes: 12,
  goals: [
    "Tạo danh sách không thứ tự (ul) và có thứ tự (ol) với các mục li.",
    "Điều khiển đánh số bằng type, start, reversed.",
    "Lồng danh sách và tạo danh sách thuật ngữ dl/dt/dd."
  ],
  intro: `<p>Danh sách giúp nội dung dễ quét mắt: menu điều hướng, các bước làm món ăn, top sản phẩm… HTML có ba loại: <strong>ul</strong> (unordered — gạch đầu dòng, thứ tự không quan trọng), <strong>ol</strong> (ordered — đánh số, thứ tự quan trọng) và <strong>dl</strong> (description — cặp thuật ngữ/giải thích như từ điển).</p><p>Quy tắc vàng: con trực tiếp của ul/ol phải là <strong>li</strong>. Muốn danh sách con, đặt cả ul/ol mới <em>bên trong</em> một li — giống mục lục nhiều cấp.</p>`,
  syntax: `<ul>
  <li>Mục một</li>
  <li>Mục hai</li>
</ul>
<ol type="1" start="1">
  <li>Bước một</li>
</ol>`,
  examples: [
    { t: "Danh sách không thứ tự ul", code:
`<h3>Đồ uống yêu thích</h3>
<ul>
  <li>Cà phê</li>
  <li>Trà xanh</li>
  <li>Nước cam</li>
</ul>`,
      note: "ul dùng khi thứ tự không quan trọng. Mỗi mục là một li." },
    { t: "ol với type và start", code:
`<p>Các bước còn lại của quy trình:</p>
<ol type="A" start="3">
  <li>Pha cà phê</li>
  <li>Thêm sữa</li>
  <li>Thưởng thức</li>
</ol>`,
      note: "type nhận 1 (số), A (hoa), a (thường), I (La Mã hoa), i (La Mã thường). start=3 bắt đầu từ mục thứ 3 → C, D, E." },
    { t: "ol đếm ngược với reversed", code:
`<h3>Kết quả cuộc thi</h3>
<ol reversed>
  <li>Giải ba: Đội C</li>
  <li>Giải nhì: Đội B</li>
  <li>Giải nhất: Đội A</li>
</ol>`,
      note: "reversed đánh số giảm dần 3, 2, 1 — hợp cho bảng xếp hạng công bố từ dưới lên." },
    { t: "Danh sách lồng nhau", code:
`<ul>
  <li>Trái cây
    <ul>
      <li>Xoài</li>
      <li>Nhãn</li>
    </ul>
  </li>
  <li>Rau củ
    <ul>
      <li>Cà rốt</li>
      <li>Bắp cải</li>
    </ul>
  </li>
</ul>`,
      note: "Danh sách con nằm TRONG li của mục cha, không nằm giữa các li." },
    { t: "Danh sách thuật ngữ dl", code:
`<dl>
  <dt>HTML</dt>
  <dd>Ngôn ngữ đánh dấu siêu văn bản, tạo cấu trúc trang web.</dd>
  <dt>Thẻ (tag)</dt>
  <dd>Đơn vị đánh dấu của HTML, ví dụ &lt;p&gt;.</dd>
  <dt>Thuộc tính</dt>
  <dd>Thông tin bổ sung trong thẻ mở, ví dụ href của thẻ a.</dd>
</dl>`,
      note: "dl = description list, dt = thuật ngữ, dd = mô tả. Một dt có thể có nhiều dd." }
  ],
  mistakes: [
    { bad: `<ul>\n  <p>Cà phê</p>\n  <p>Trà xanh</p>\n</ul>`, good: `<ul>\n  <li>Cà phê</li>\n  <li>Trà xanh</li>\n</ul>`,
      why: "Con trực tiếp của ul/ol phải là li. Đặt p trực tiếp trong ul là sai cấu trúc, trình đọc màn hình sẽ không đếm đúng số mục." },
    { bad: `<ul>\n  <li>Trái cây</li>\n  <ul><li>Xoài</li></ul>\n</ul>`, good: `<ul>\n  <li>Trái cây\n    <ul><li>Xoài</li></ul>\n  </li>\n</ul>`,
      why: "Danh sách con phải nằm bên trong li của mục cha, không được đặt chen giữa các li." }
  ],
  tips: [
    "Menu điều hướng thường viết bằng nav > ul > li > a — chuẩn ngữ nghĩa.",
    "ol có thể bắt đầu giữa chừng bằng start, rất tiện khi tách quy trình thành nhiều phần.",
    "Đừng dùng dấu gạch đầu dòng tự gõ trong p thay cho ul — mất ngữ nghĩa danh sách.",
    "dl rất hợp cho trang hỏi đáp, thông số sản phẩm, chú giải thuật ngữ."
  ],
  exercises: [
    { t: "Menu quán cà phê",
      prompt: "Tạo ul menu gồm mục \"Cà phê\" (lồng ul con: Cà phê sữa, Cà phê đen) và mục \"Trà\" (lồng ul con: Trà đào, Trà vải).",
      starter: `<h3>Menu quán</h3>\n<ul>\n  <li></li>\n</ul>`,
      hints: ["Mỗi mục lớn là một li.", "Bên trong li \"Cà phê\", viết tiếp một ul mới với 2 li con.", "Nhớ đóng </li> của mục cha SAU khi đóng ul con."],
      solution: `<h3>Menu quán</h3>\n<ul>\n  <li>Cà phê\n    <ul>\n      <li>Cà phê sữa</li>\n      <li>Cà phê đen</li>\n    </ul>\n  </li>\n  <li>Trà\n    <ul>\n      <li>Trà đào</li>\n      <li>Trà vải</li>\n    </ul>\n  </li>\n</ul>`,
      checks: [
        { d: "Có danh sách ul bên ngoài", r: "<ul>" },
        { d: "Có danh sách con lồng trong li", r: "<li>[\\s\\S]*?<ul>[\\s\\S]*?</ul>[\\s\\S]*?</li>" },
        { d: "Có ít nhất 4 mục li", r: "(<li>[\\s\\S]*?){4}" }
      ] },
    { t: "Xếp hạng và chú giải",
      prompt: "Tạo ol reversed liệt kê 3 đội (đội hạng ba viết trước), sau đó tạo dl giải thích 2 thuật ngữ: \"Quán quân\" và \"Á quân\".",
      starter: `<h3>Bảng xếp hạng</h3>\n<ol>\n</ol>`,
      hints: ["Thêm thuộc tính reversed vào thẻ mở ol.", "Viết 3 li theo thứ tự: hạng ba, hạng nhì, hạng nhất.", "Bên dưới, viết dl với cặp dt/dd cho mỗi thuật ngữ."],
      solution: `<h3>Bảng xếp hạng</h3>\n<ol reversed>\n  <li>Hạng ba: Đội C</li>\n  <li>Hạng nhì: Đội B</li>\n  <li>Hạng nhất: Đội A</li>\n</ol>\n<dl>\n  <dt>Quán quân</dt>\n  <dd>Đội xếp hạng nhất.</dd>\n  <dt>Á quân</dt>\n  <dd>Đội xếp hạng nhì.</dd>\n</dl>`,
      checks: [
        { d: "ol có thuộc tính reversed", r: "<ol[^>]*reversed" },
        { d: "Có đủ 3 mục li", r: "(<li>[\\s\\S]*?){3}" },
        { d: "Có cặp dt và dd", r: "<dt>[^<]+</dt>[\\s\\S]*?<dd>[^<]+</dd>" }
      ] }
  ],
  summary: [
    "ul cho danh sách không thứ tự, ol cho danh sách có thứ tự, mỗi mục là li.",
    "ol điều khiển bằng type (1/A/a/I/i), start (số bắt đầu), reversed (đếm ngược).",
    "Danh sách lồng nhau: đặt ul/ol con bên trong li của mục cha.",
    "dl/dt/dd tạo danh sách thuật ngữ – mô tả, hợp cho chú giải và hỏi đáp."
  ]
},{
  id: 5, part: 1, title: "Liên kết: a href, đường dẫn, anchor, mailto, download", minutes: 12,
  goals: [
    "Tạo liên kết bằng a href với đường dẫn tuyệt đối và tương đối.",
    "Mở tab mới an toàn với target và rel=\"noopener\".",
    "Dùng liên kết neo (anchor), mailto:, tel: và thuộc tính download."
  ],
  intro: `<p>Liên kết (link) là thứ biến các trang rời rạc thành "mạng" web. Thẻ <code>&lt;a&gt;</code> (anchor) với thuộc tính <code>href</code> chỉ tới đích: một trang khác, một vị trí trong trang, một địa chỉ email, số điện thoại hay một file tải về.</p><p>Đường dẫn có hai loại: <strong>tuyệt đối</strong> (đầy đủ từ https://…) và <strong>tương đối</strong> (tính từ vị trí file hiện tại: <code>bai-2.html</code>, <code>../anh/logo.png</code>). Liên kết neo <code>#id</code> nhảy tới phần tử có id tương ứng ngay trong trang.</p>`,
  syntax: `<a href="địa-chỉ" target="_blank" rel="noopener">Chữ hiển thị của liên kết</a>
<a href="#id-đích">Nhảy tới vị trí trong trang</a>`,
  examples: [
    { t: "Đường dẫn tuyệt đối và tương đối", code:
`<p><a href="https://developer.mozilla.org/vi/">Tài liệu MDN (tuyệt đối: đủ https://)</a></p>
<p><a href="bai-2.html">Sang file bai-2.html (tương đối)</a></p>`,
      note: "Link tương đối cần file bai-2.html nằm cạnh file hiện tại — trong demo sẽ không mở được. ../ nghĩa là lùi lên thư mục cha." },
    { t: "Mở tab mới an toàn: target + rel", code:
`<p><a href="https://developer.mozilla.org/vi/" target="_blank" rel="noopener">
  Mở MDN trong tab mới
</a></p>`,
      note: "rel=\"noopener\" ngăn tab mới điều khiển ngược trang gốc. Trong khung sandbox demo, mở tab mới có thể bị chặn — hãy thử trong file thật." },
    { t: "Liên kết neo (anchor) #id", code:
`<p id="dau-trang"><strong>Đầu trang</strong> — <a href="#cuoi-trang">xuống cuối trang ↓</a></p>
<p style="height:260px; background:#FDEEE6; padding:10px">Khu vực giữa trang (cuộn để thấy liên kết neo hoạt động).</p>
<p id="cuoi-trang"><strong>Cuối trang</strong> — <a href="#dau-trang">lên đầu trang ↑</a></p>`,
      note: "href=\"#cuoi-trang\" tìm phần tử id=\"cuoi-trang\" trong cùng trang và cuộn tới đó." },
    { t: "Gửi email và gọi điện: mailto:, tel:", code:
`<p><a href="mailto:hotro@example.com?subject=Hoi%20ve%20bai%20hoc">Gửi email cho bộ phận hỗ trợ</a></p>
<p><a href="tel:+842412345678">Gọi tổng đài: 024 1234 5678</a></p>`,
      note: "example.com là tên miền chuẩn dành cho ví dụ. mailto mở ứng dụng email, tel mở ứng dụng gọi (hữu ích trên điện thoại)." },
    { t: "Tải file với download", code:
`<p><a href="data:text/plain;charset=utf-8,Xin%20ch%C3%A0o%20b%E1%BA%A1n!" download="loi-chao.txt">
  Tải file loi-chao.txt
</a></p>`,
      note: "download gợi ý tên file lưu về. Demo dùng data URI (nội dung file nằm ngay trong href) nên tải được mà không cần file ngoài." }
  ],
  mistakes: [
    { bad: `<a href="www.google.com">Google</a>`, good: `<a href="https://www.google.com">Google</a>`,
      why: "Thiếu https:// thì trình duyệt hiểu đây là đường dẫn tương đối (tìm file www.google.com cạnh trang hiện tại) → liên kết hỏng." },
    { bad: `<a href="https://developer.mozilla.org/" target="_blank">MDN</a>`, good: `<a href="https://developer.mozilla.org/" target="_blank" rel="noopener">MDN</a>`,
      why: "target=\"_blank\" không kèm rel=\"noopener\" cho phép tab mới truy ngược window.opener — lỗ hổng bảo mật cổ điển." }
  ],
  tips: [
    "Chữ của liên kết phải có nghĩa: viết \"Đọc hướng dẫn cài đặt\" thay vì \"bấm vào đây\".",
    "Liên kết neo rất hợp cho mục lục đầu bài và nút \"về đầu trang\".",
    "Đường dẫn tương đối giúp website chạy đúng cả trên máy lẫn khi đưa lên hosting.",
    "Với file PDF/ảnh, download buộc tải về thay vì mở ngay trong trình duyệt."
  ],
  exercises: [
    { t: "Trang có điều hướng",
      prompt: "Tạo trang gồm: một liên kết ngoài mở tab mới an toàn (target + rel), và một cặp liên kết neo nhảy giữa hai vị trí id=\"dau\" và id=\"cuoi\" trong trang.",
      starter: `<p id="dau">Đầu trang</p>\n<p></p>\n<p id="cuoi">Cuối trang</p>`,
      hints: ["Liên kết ngoài: <a href=\"https://...\" target=\"_blank\" rel=\"noopener\">.", "Liên kết xuống cuối: href=\"#cuoi\".", "Liên kết lên đầu: href=\"#dau\"."],
      solution: `<p id="dau">Đầu trang</p>\n<p><a href="https://developer.mozilla.org/vi/" target="_blank" rel="noopener">Đọc MDN (tab mới)</a></p>\n<p><a href="#cuoi">Xuống cuối trang</a></p>\n<p id="cuoi">Cuối trang — <a href="#dau">lên đầu trang</a></p>`,
      checks: [
        { d: "Có target=\"_blank\"", r: "target=\"_blank\"" },
        { d: "Có rel=\"noopener\"", r: "rel=\"noopener\"" },
        { d: "Có liên kết neo href=\"#...\"", r: "href=\"#[^\"]+\"" }
      ] },
    { t: "Liên hệ và tải file",
      prompt: "Tạo 3 liên kết: gửi email (mailto:), gọi điện (tel:) và tải một file .txt bằng download (có thể dùng data URI như ví dụ).",
      starter: `<p>Email: </p>\n<p>Điện thoại: </p>\n<p>Tài liệu: </p>`,
      hints: ["mailto:địa-chỉ-email trong href.", "tel:+84... trong href.", "Thêm thuộc tính download=\"ten-file.txt\" vào thẻ a thứ ba."],
      solution: `<p>Email: <a href="mailto:hotro@example.com">hotro@example.com</a></p>\n<p>Điện thoại: <a href="tel:+842412345678">024 1234 5678</a></p>\n<p>Tài liệu: <a href="data:text/plain;charset=utf-8,Noi%20dung%20tai%20lieu" download="tai-lieu.txt">Tải tai-lieu.txt</a></p>`,
      checks: [
        { d: "Có liên kết mailto:", r: "href=\"mailto:" },
        { d: "Có liên kết tel:", r: "href=\"tel:" },
        { d: "Có thuộc tính download", r: "download=\"[^\"]+\"" }
      ] }
  ],
  summary: [
    "a href tạo liên kết; đường dẫn tuyệt đối bắt đầu bằng https://, tương đối tính từ file hiện tại.",
    "target=\"_blank\" mở tab mới — luôn kèm rel=\"noopener\" để an toàn.",
    "href=\"#id\" nhảy tới phần tử có id trong trang (liên kết neo).",
    "mailto: mở email, tel: mở cuộc gọi, download buộc tải file với tên gợi ý."
  ]
},
{
  id: 6, part: 1, title: "Hình ảnh: img, figure, picture và các định dạng", minutes: 15,
  goals: [
    "Chèn ảnh bằng img với src, alt, width, height, loading.",
    "Nhóm ảnh và chú thích bằng figure/figcaption.",
    "Chọn ảnh theo màn hình bằng picture/srcset và hiểu 4 định dạng phổ biến."
  ],
  intro: `<p>Ảnh làm trang web sống động, nhưng cũng là nguyên nhân hàng đầu khiến trang chậm và khó truy cập nếu dùng sai. Thẻ <code>&lt;img&gt;</code> là thẻ rỗng: <code>src</code> chỉ file ảnh, <code>alt</code> mô tả ảnh bằng chữ (hiện khi ảnh lỗi, và là thứ trình đọc màn hình đọc cho người khiếm thị).</p><p>Bốn định dạng cần nhớ: <strong>JPG</strong> — ảnh chụp, nhẹ, không trong suốt; <strong>PNG</strong> — logo, ảnh cần nền trong suốt; <strong>WebP</strong> — hiện đại, nhẹ hơn JPG/PNG; <strong>SVG</strong> — vector, phóng to không vỡ, hợp icon và logo.</p>`,
  syntax: `<img src="đường-dẫn-ảnh" alt="Mô tả ảnh" width="300" height="200" loading="lazy">
<figure>
  <img src="..." alt="...">
  <figcaption>Chú thích ảnh</figcaption>
</figure>`,
  examples: [
    { t: "img với src và alt", code:
`<img src="anh.svg" alt="Logo HTML màu cam trên nền trắng">
<p>Nếu ảnh lỗi, dòng alt sẽ hiển thị thay thế.</p>`,
      note: "Trong demo, anh.svg được tự thay bằng ảnh SVG có sẵn (data URI). Khi tự làm: đặt file anh.svg cạnh file HTML." },
    { t: "width, height và loading=\"lazy\"", code:
`<img src="anh.svg" alt="Ảnh minh họa có kích thước cố định" width="200" height="125" loading="lazy">
<p>Khai báo width/height giúp trình duyệt giữ chỗ trước, tránh nhảy bố cục khi ảnh tải xong.</p>`,
      note: "loading=\"lazy\" hoãn tải những ảnh còn xa khung nhìn — trang dài nhiều ảnh sẽ mở nhanh hơn." },
    { t: "figure và figcaption", code:
`<figure>
  <img src="anh.svg" alt="Logo HTML" width="160" height="100">
  <figcaption>Hình 1. Logo HTML5 — đánh dấu bằng thẻ figure.</figcaption>
</figure>`,
      note: "figure nhóm ảnh với chú thích thành một đơn vị; figcaption là chú thích chính thức của ảnh." },
    { t: "picture và srcset: ảnh theo màn hình", code:
`<picture>
  <source srcset="anh-to.svg" media="(min-width: 600px)">
  <img src="anh-nho.svg" alt="Ảnh tự đổi theo bề rộng khung kết quả" width="160" height="100">
</picture>
<p>Khung kết quả này hẹp hơn 600px nên ảnh nhỏ được chọn.</p>`,
      note: "Trình duyệt duyệt các source từ trên xuống, gặp media khớp thì dùng srcset đó; không khớp thì dùng img. Đổi độ rộng cửa sổ để thấy ảnh đổi." },
    { t: "SVG inline — vector không cần file", code:
`<svg width="160" height="100" viewBox="0 0 160 100" role="img" aria-label="Hình chữ nhật cam ghi chữ SVG">
  <rect width="160" height="100" rx="12" fill="#E44D26"/>
  <text x="80" y="55" font-size="20" text-anchor="middle" fill="#ffffff">SVG</text>
</svg>
<p>SVG viết thẳng vào HTML, phóng to không vỡ nét.</p>`,
      note: "JPG/PNG/WebP là ảnh điểm ảnh (raster); SVG là ảnh vector vẽ bằng thẻ — học kỹ ở Bài 14." }
  ],
  mistakes: [
    { bad: `<img src="anh.svg">`, good: `<img src="anh.svg" alt="Logo HTML màu cam">`,
      why: "Thiếu alt: người dùng trình đọc màn hình không biết ảnh gì, và khi ảnh lỗi trang chỉ còn ô trống. alt là bắt buộc về mặt truy cập." },
    { bad: `<img src="images/anh.svg" alt="Logo">`, good: `<img src="anh.svg" alt="Logo">`,
      why: "Đường dẫn phải khớp vị trí file thật. File nằm cạnh trang thì chỉ ghi tên file — thêm thư mục không tồn tại sẽ làm ảnh hỏng." }
  ],
  tips: [
    "alt mô tả NỘI DUNG ảnh, không phải tên file: \"Đội tuyển ăn mừng chiến thắng\" thay vì \"IMG_2049.jpg\".",
    "Ảnh trang trí thuần túy thì để alt=\"\" (rỗng) để trình đọc màn hình bỏ qua.",
    "Luôn khai báo width/height thật của ảnh để chống nhảy bố cục (CLS).",
    "Chọn định dạng: ảnh chụp → JPG/WebP; cần trong suốt → PNG/WebP; icon, logo → SVG."
  ],
  exercises: [
    { t: "Ảnh có chú thích",
      prompt: "Tạo figure chứa một img (src=\"anh.svg\", có alt mô tả và width) và figcaption ghi chú thích cho ảnh.",
      starter: `<figure>\n\n</figure>`,
      hints: ["Bên trong figure, viết <img src=\"anh.svg\" alt=\"...\" width=\"160\">.", "Ngay sau img, viết <figcaption>Chú thích của bạn</figcaption>.", "Demo tự có ảnh anh.svg — không cần file ngoài."],
      solution: `<figure>\n  <img src="anh.svg" alt="Logo HTML màu cam" width="160" height="100">\n  <figcaption>Hình 1. Logo ngôn ngữ HTML.</figcaption>\n</figure>`,
      checks: [
        { d: "Có thẻ figure", r: "<figure>" },
        { d: "img có alt mô tả", r: "<img[^>]*alt=\"[^\"]+\"" },
        { d: "Có figcaption chứa chữ", r: "<figcaption>[^<]+</figcaption>" }
      ] },
    { t: "Ảnh đổi theo màn hình",
      prompt: "Tạo picture với một source (srcset=\"anh-to.svg\", media cho màn hình từ 600px) và img dự phòng (src=\"anh-nho.svg\", có alt).",
      starter: `<picture>\n\n</picture>`,
      hints: ["source là thẻ rỗng: <source srcset=\"...\" media=\"(min-width: 600px)\">.", "img nằm cuối cùng trong picture, là phương án dự phòng.", "Đừng quên alt cho img."],
      solution: `<picture>\n  <source srcset="anh-to.svg" media="(min-width: 600px)">\n  <img src="anh-nho.svg" alt="Ảnh minh họa đổi theo màn hình" width="160" height="100">\n</picture>`,
      checks: [
        { d: "Có thẻ picture", r: "<picture>" },
        { d: "source có srcset", r: "<source[^>]*srcset=\"[^\"]+\"" },
        { d: "source có điều kiện media", r: "media=\"[^\"]+\"" },
        { d: "img dự phòng có alt", r: "<img[^>]*alt=\"[^\"]+\"" }
      ] }
  ],
  summary: [
    "img cần src (nguồn) và alt (mô tả thay thế); là thẻ rỗng, không có thẻ đóng.",
    "width/height giữ chỗ chống nhảy bố cục; loading=\"lazy\" hoãn tải ảnh xa màn hình.",
    "figure + figcaption nhóm ảnh với chú thích thành khối ngữ nghĩa.",
    "picture/source/srcset chọn ảnh theo điều kiện màn hình; img là dự phòng bắt buộc.",
    "JPG cho ảnh chụp, PNG cho trong suốt, WebP nhẹ hơn, SVG vector không vỡ nét."
  ]
},
{
  id: 7, part: 1, title: "Block và inline, div/span, thuộc tính toàn cục, thẻ ngữ nghĩa", minutes: 12,
  goals: [
    "Phân biệt phần tử block và inline, dùng div/span đúng chỗ.",
    "Sử dụng thuộc tính toàn cục: id, class, title, lang, style, data-*.",
    "Dựng bố cục trang bằng thẻ ngữ nghĩa: header, nav, main, section, article, aside, footer."
  ],
  intro: `<p>Mọi phần tử HTML thuộc một trong hai "tính cách": <strong>block</strong> chiếm trọn một dòng, tự xuống dòng (p, h1, div, ul…); <strong>inline</strong> chỉ chiếm vừa nội dung, đứng cạnh nhau trên cùng dòng (a, strong, em, span…). Quy tắc: block chứa được block/inline, còn inline không nên chứa block.</p><p><code>div</code> (block) và <code>span</code> (inline) là hai hộp chứa "trung tính" — dùng khi không có thẻ ngữ nghĩa nào phù hợp. Nhưng với bố cục trang, HTML5 có các thẻ <strong>ngữ nghĩa (semantic)</strong> nói rõ vai trò từng vùng: header, nav, main, article, aside, footer… giúp máy và người đều hiểu cấu trúc.</p>`,
  syntax: `<div class="khung">
  <p>Đoạn văn có <span class="diem-nhan">từ được tô màu</span>.</p>
</div>
<header>…</header> <nav>…</nav> <main>…</main> <footer>…</footer>`,
  examples: [
    { t: "Block và inline khác nhau thế nào", code:
`<p style="border:2px solid #E44D26">p là block: chiếm cả dòng.</p>
<p style="border:2px solid #2563EB">Block tiếp theo tự xuống dòng mới.</p>
<span style="border:2px solid #16A34A">span là inline</span>
<span style="border:2px solid #C026D3">nên đứng cạnh nhau cùng dòng.</span>`,
      note: "Nhìn viền màu: mỗi p một dòng riêng, hai span nối tiếp nhau." },
    { t: "div và span — hộp chứa trung tính", code:
`<div style="background:#FDEEE6; padding:10px; border-radius:8px">
  <p>div gom nhiều phần tử thành một khối.</p>
  <p>Tôi tên là <span style="color:#E44D26; font-weight:bold">An</span>.</p>
</div>`,
      note: "span bọc một cụm từ trong dòng để tô màu; div bọc cả khu vực. Cả hai không mang ngữ nghĩa." },
    { t: "Thuộc tính toàn cục", code:
`<p id="doan-chinh" class="ghi-chu" title="Di chuột vào để xem chú thích"
   lang="vi" style="color:#2563EB" data-bai="7">
  Đoạn văn mang nhiều thuộc tính toàn cục.
</p>
<p class="ghi-chu">class dùng lại được cho nhiều phần tử; id là duy nhất.</p>`,
      note: "data-* là kho dữ liệu riêng của bạn cho JavaScript (ví dụ data-bai=\"7\"). style là CSS inline — hạn chế dùng trong dự án thật." },
    { t: "Bố cục bằng thẻ ngữ nghĩa", code:
`<header style="background:#FDEEE6; padding:8px">
  <h2>Tạp chí Lập trình</h2>
  <nav><a href="#bai-viet">Bài viết</a> | <a href="#lien-quan">Liên quan</a></nav>
</header>
<main>
  <article id="bai-viet">
    <h3>Học HTML mỗi ngày</h3>
    <p>Article là nội dung độc lập, có thể tách đăng nơi khác.</p>
  </article>
  <aside id="lien-quan"><p>Bài liên quan: Bài 1, Bài 2.</p></aside>
</main>
<footer><p><small>© 2026 Tạp chí Lập trình</small></p></footer>`,
      note: "main chỉ xuất hiện MỘT lần mỗi trang. section nhóm nội dung theo chủ đề; article cho nội dung độc lập." }
  ],
  mistakes: [
    { bad: `<span><p>Đoạn văn trong span</p></span>`, good: `<div><p>Đoạn văn trong div</p></div>`,
      why: "span là inline, không được chứa block như p. Trình duyệt sẽ tự tách thẻ ngầm, bố cục vỡ khó kiểm soát." },
    { bad: `<div id="header">Tiêu đề trang</div>\n<div id="main">Nội dung</div>`, good: `<header>Tiêu đề trang</header>\n<main>Nội dung</main>`,
      why: "div không nói lên vai trò vùng nội dung. Thẻ ngữ nghĩa giúp SEO và trình đọc màn hình hiểu bố cục — chỉ dùng div khi không có thẻ phù hợp." }
  ],
  tips: [
    "id như số nhà (duy nhất), class như tên khu phố (dùng lại nhiều nơi).",
    "Đặt id/class không dấu, nối bằng gạch ngang: bai-viet, ghi-chu.",
    "Một trang chỉ có một main; header/footer có thể xuất hiện trong article.",
    "data-* giúp gắn dữ liệu vào phần tử mà không ảnh hưởng hiển thị."
  ],
  exercises: [
    { t: "Trang ngữ nghĩa hoàn chỉnh",
      prompt: "Dựng trang với header (chứa h1 tên trang), nav (ít nhất 1 liên kết), main (chứa một p) và footer (chứa small bản quyền).",
      starter: `<header></header>\n<main></main>\n<footer></footer>`,
      hints: ["Trong header: <h1>Tên trang</h1>.", "Thêm <nav><a href=\"#\">Trang chủ</a></nav> sau header.", "Trong main viết một p; trong footer viết <small>© 2026 ...</small>."],
      solution: `<header><h1>Nhật ký học HTML</h1></header>\n<nav><a href="#bai-1">Bài 1</a> | <a href="#bai-2">Bài 2</a></nav>\n<main><p>Hôm nay tôi học thẻ ngữ nghĩa.</p></main>\n<footer><small>© 2026 Nhật ký học HTML</small></footer>`,
      checks: [
        { d: "Có header chứa h1", r: "<header>[\\s\\S]*?<h1>[^<]+</h1>" },
        { d: "Có nav chứa liên kết", r: "<nav>[\\s\\S]*?<a[^>]*>" },
        { d: "Có main chứa nội dung", r: "<main>[\\s\\S]*?<p>[^<]+</p>" },
        { d: "Có footer", r: "<footer>[\\s\\S]*?</footer>" }
      ] },
    { t: "Gắn thuộc tính toàn cục",
      prompt: "Tạo một thẻ p mang đủ: id, class, title (chú thích khi di chuột) và một thuộc tính data-* bất kỳ.",
      starter: `<p>Đoạn văn của tôi</p>`,
      hints: ["id=\"...\" — định danh duy nhất.", "class=\"...\" — nhãn để gom nhóm.", "title=\"...\" và data-ten=\"giá trị\" viết trong thẻ mở."],
      solution: `<p id="doan-1" class="ghi-chu" title="Đây là chú thích" data-muc="quan-trong">Đoạn văn của tôi</p>`,
      checks: [
        { d: "Có id", r: "<p[^>]*id=\"[^\"]+\"" },
        { d: "Có class", r: "<p[^>]*class=\"[^\"]+\"" },
        { d: "Có title", r: "<p[^>]*title=\"[^\"]+\"" },
        { d: "Có thuộc tính data-*", r: "<p[^>]*data-[\w-]+=\"[^\"]+\"" }
      ] }
  ],
  summary: [
    "Block chiếm cả dòng (p, div, h1…); inline chiếm vừa nội dung (span, a, strong…).",
    "div/span là hộp chứa trung tính; inline không nên chứa block.",
    "id duy nhất, class dùng lại, title chú thích, data-* chứa dữ liệu riêng.",
    "Thẻ ngữ nghĩa header/nav/main/section/article/aside/footer mô tả vai trò vùng nội dung; main là duy nhất."
  ]
},
{
  id: 8, part: 2, title: "Bảng cơ bản: table, tr, th, td, caption, thead/tbody/tfoot", minutes: 12,
  goals: [
    "Tạo bảng dữ liệu với table, hàng tr, ô tiêu đề th và ô dữ liệu td.",
    "Thêm tiêu đề bảng bằng caption.",
    "Nhóm hàng bằng thead, tbody, tfoot đúng cấu trúc."
  ],
  intro: `<p>Bảng (table) dùng cho <strong>dữ liệu dạng lưới</strong>: điểm số, lịch chiếu, giá vé… Cấu trúc như một tòa nhà: <code>table</code> là tòa nhà, <code>tr</code> (table row) là từng tầng, <code>th</code>/<code>td</code> là các phòng trên tầng. <code>th</code> là ô tiêu đề (in đậm, căn giữa), <code>td</code> là ô dữ liệu thường.</p><p>Bảng chuẩn chia ba vùng: <code>thead</code> (hàng tiêu đề), <code>tbody</code> (dữ liệu chính), <code>tfoot</code> (tổng kết) — và <code>caption</code> là "tên tòa nhà", đặt ngay sau thẻ mở table. Lưu ý: bảng KHÔNG dùng để dàn bố cục trang (đó là việc của CSS).</p>`,
  syntax: `<table>
  <caption>Tên bảng</caption>
  <thead>
    <tr><th>Cột 1</th><th>Cột 2</th></tr>
  </thead>
  <tbody>
    <tr><td>Dữ liệu 1</td><td>Dữ liệu 2</td></tr>
  </tbody>
</table>`,
  examples: [
    { t: "Bảng đầu tiên: table, tr, th, td", code:
`<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #999; padding: 4px 10px; }
</style>
<table>
  <tr>
    <th>Tên</th>
    <th>Tuổi</th>
  </tr>
  <tr>
    <td>An</td>
    <td>20</td>
  </tr>
  <tr>
    <td>Bình</td>
    <td>22</td>
  </tr>
</table>`,
      note: "Khối <style> chỉ để bảng có viền cho dễ nhìn (CSS thuộc khóa học khác). Mỗi tr là một hàng; hàng đầu dùng th cho tiêu đề cột." },
    { t: "Bảng đầy đủ: caption, thead, tbody, tfoot", code:
`<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #999; padding: 4px 10px; }
  caption { font-weight: bold; margin-bottom: 6px; }
</style>
<table>
  <caption>Điểm thi học kỳ 1 của An</caption>
  <thead>
    <tr><th>Môn học</th><th>Điểm</th></tr>
  </thead>
  <tbody>
    <tr><td>Toán</td><td>9</td></tr>
    <tr><td>Ngữ văn</td><td>8</td></tr>
    <tr><td>Tiếng Anh</td><td>9</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Trung bình</td><td>8.7</td></tr>
  </tfoot>
</table>`,
      note: "caption phải là con đầu tiên của table. tfoot chứa hàng tổng kết — trình duyệt vẫn hiển thị nó ở cuối bảng." }
  ],
  mistakes: [
    { bad: `<tr><td>Môn học</td><td>Điểm</td></tr>`, good: `<tr><th>Môn học</th><th>Điểm</th></tr>`,
      why: "Ô tiêu đề phải dùng th để máy hiểu đó là tiêu đề. Dùng td cho hàng tiêu đề làm bảng mất ngữ nghĩa, khó truy cập." },
    { bad: `<table>\n  <td>Toán</td><td>9</td>\n</table>`, good: `<table>\n  <tr><td>Toán</td><td>9</td></tr>\n</table>`,
      why: "Ô (td/th) phải nằm trong hàng (tr). Thiếu tr là sai cấu trúc — trình duyệt tự sửa nhưng kết quả không đảm bảo." }
  ],
  tips: [
    "Thứ tự chuẩn trong table: caption → thead → tbody → tfoot.",
    "Số ô mỗi hàng nên bằng nhau (trừ khi gộp ô — học ở Bài 9).",
    "Bảng chỉ dành cho dữ liệu; dàn bố cục trang bằng div + CSS, không bằng table.",
    "th mặc định in đậm và căn giữa — đó là dấu hiệu nhận biết ô tiêu đề."
  ],
  exercises: [
    { t: "Bảng điểm cá nhân",
      prompt: "Tạo bảng điểm của bạn: hàng tiêu đề dùng th (\"Môn học\", \"Điểm\"), ít nhất 2 hàng dữ liệu dùng td. (Có thể chép khối style viền từ ví dụ.)",
      starter: `<table>\n  <tr></tr>\n</table>`,
      hints: ["Hàng đầu: <tr><th>Môn học</th><th>Điểm</th></tr>.", "Mỗi môn một hàng tr với 2 ô td.", "Cần tối thiểu 3 hàng tr (1 tiêu đề + 2 dữ liệu)."],
      solution: `<table>\n  <tr><th>Môn học</th><th>Điểm</th></tr>\n  <tr><td>Toán</td><td>9</td></tr>\n  <tr><td>Ngữ văn</td><td>8</td></tr>\n</table>`,
      checks: [
        { d: "Có thẻ table", r: "<table>" },
        { d: "Có ô tiêu đề th", r: "<th>[^<]+</th>" },
        { d: "Có ít nhất 3 hàng tr", r: "(<tr>[\\s\\S]*?){3}" }
      ] },
    { t: "Bảng có caption và tổng kết",
      prompt: "Nâng cấp bảng: thêm caption \"Bảng điểm của tôi\", bọc hàng tiêu đề trong thead, dữ liệu trong tbody và thêm tfoot với một hàng tổng kết.",
      starter: `<table>\n  <tr><th>Môn học</th><th>Điểm</th></tr>\n  <tr><td>Toán</td><td>9</td></tr>\n  <tr><td>Văn</td><td>8</td></tr>\n</table>`,
      hints: ["caption đặt ngay sau <table>.", "Bọc hàng th bằng <thead>...</thead>, các hàng td bằng <tbody>...</tbody>.", "Thêm <tfoot><tr><td>Trung bình</td><td>8.5</td></tr></tfoot> trước </table>."],
      solution: `<table>\n  <caption>Bảng điểm của tôi</caption>\n  <thead>\n    <tr><th>Môn học</th><th>Điểm</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Toán</td><td>9</td></tr>\n    <tr><td>Văn</td><td>8</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><td>Trung bình</td><td>8.5</td></tr>\n  </tfoot>\n</table>`,
      checks: [
        { d: "Có caption chứa chữ", r: "<caption>[^<]+</caption>" },
        { d: "Có thead", r: "<thead>" },
        { d: "Có tbody", r: "<tbody>" },
        { d: "Có tfoot", r: "<tfoot>" }
      ] }
  ],
  summary: [
    "table chứa các hàng tr; mỗi hàng chứa ô tiêu đề th hoặc ô dữ liệu td.",
    "caption là tiêu đề bảng, đặt ngay sau thẻ mở table.",
    "thead nhóm hàng tiêu đề, tbody nhóm dữ liệu, tfoot nhóm tổng kết.",
    "Bảng chỉ dùng cho dữ liệu dạng lưới, không dùng dàn bố cục trang."
  ]
},{
  id: 9, part: 2, title: "Bảng nâng cao: colspan, rowspan, scope và truy cập", minutes: 10,
  goals: [
    "Gộp ô ngang bằng colspan và gộp ô dọc bằng rowspan.",
    "Đánh dấu tiêu đề cột/hàng bằng th scope để bảng dễ truy cập.",
    "Tránh các lỗi gộp ô khiến bảng vỡ cấu trúc."
  ],
  intro: `<p>Bảng thực tế thường có ô trải rộng: tiêu đề nhóm chiếm nhiều cột, hoặc một buổi học chiếm nhiều hàng. <code>colspan="n"</code> cho ô trải ngang n cột; <code>rowspan="n"</code> cho ô trải dọc n hàng. Quy tắc nhớ đời: <strong>ô bị gộp "ăn" mất chỗ</strong> — các hàng sau phải bớt đi số ô tương ứng.</p><p>Về truy cập: trình đọc màn hình đọc bảng theo từng ô, nên cần biết ô nào là tiêu đề của ô dữ liệu. Thuộc tính <code>scope="col"</code> (tiêu đề cột) và <code>scope="row"</code> (tiêu đề hàng) trên thẻ <code>th</code> cung cấp thông tin đó.</p>`,
  syntax: `<td colspan="2">Ô trải 2 cột</td>
<td rowspan="3">Ô trải 3 hàng</td>
<th scope="col">Tiêu đề cột</th>
<th scope="row">Tiêu đề hàng</th>`,
  examples: [
    { t: "Gộp cột với colspan", code:
`<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #999; padding: 4px 10px; }
</style>
<table>
  <caption>Lịch học trong tuần</caption>
  <tr><th>Thứ</th><th>Môn học</th></tr>
  <tr><td>Thứ Hai</td><td>Toán</td></tr>
  <tr><td colspan="2">Thứ Ba: nghỉ học cả ngày</td></tr>
  <tr><td>Thứ Tư</td><td>Ngữ văn</td></tr>
</table>`,
      note: "Bảng có 2 cột; ô colspan=\"2\" chiếm trọn cả hai cột của hàng đó." },
    { t: "Gộp hàng với rowspan", code:
`<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #999; padding: 4px 10px; }
</style>
<table>
  <tr><th>Buổi</th><th>Môn học</th></tr>
  <tr><td rowspan="2">Sáng</td><td>Toán</td></tr>
  <tr><td>Vật lý</td></tr>
  <tr><td>Chiều</td><td>Hóa học</td></tr>
</table>`,
      note: "Ô \"Sáng\" trải 2 hàng, nên hàng thứ hai CHỈ còn 1 ô (Vật lý). Thừa một ô là bảng sẽ lệch." },
    { t: "Bảng dễ truy cập với th scope", code:
`<style>
  table { border-collapse: collapse; }
  th, td { border: 1px solid #999; padding: 4px 10px; }
</style>
<table>
  <caption>Điểm trung bình theo môn</caption>
  <thead>
    <tr>
      <th scope="col">Môn học</th>
      <th scope="col">Lớp A</th>
      <th scope="col">Lớp B</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">Toán</th><td>8.5</td><td>8.0</td></tr>
    <tr><th scope="row">Ngữ văn</th><td>7.5</td><td>8.2</td></tr>
  </tbody>
</table>`,
      note: "Tên môn cũng là tiêu đề (của hàng) → dùng th scope=\"row\" thay vì td. Trình đọc màn hình sẽ đọc \"Toán, Lớp A: 8.5\"." }
  ],
  mistakes: [
    { bad: `<tr><td>A</td><td>B</td></tr>\n<tr><td colspan="3">Gộp 3</td></tr>`, good: `<tr><td>A</td><td>B</td></tr>\n<tr><td colspan="2">Gộp 2</td></tr>`,
      why: "Bảng chỉ có 2 cột nhưng colspan=\"3\" → ô thò ra ngoài, bảng phình lệch. Số gộp không được vượt số cột thật." },
    { bad: `<tr><td rowspan="2">Sáng</td><td>Toán</td></tr>\n<tr><td>Sáng</td><td>Lý</td></tr>`, good: `<tr><td rowspan="2">Sáng</td><td>Toán</td></tr>\n<tr><td>Lý</td></tr>`,
      why: "Hàng sau bị ô rowspan chiếm mất một chỗ rồi — viết lại ô \"Sáng\" nữa là thừa ô, đẩy cả hàng lệch sang phải." }
  ],
  tips: [
    "Đếm ô theo công thức: tổng số cột = số ô của hàng + phần bị rowspan từ hàng trên chiếm.",
    "caption + th scope là bộ đôi tối thiểu cho bảng dễ truy cập.",
    "Gộp ô chỉ dùng khi thực sự cần; bảng càng đơn giản càng dễ đọc trên điện thoại.",
    "Không dùng colspan/rowspan để \"trang trí\" — chỉ dùng khi dữ liệu có quan hệ nhóm thật."
  ],
  exercises: [
    { t: "Thời khóa biểu gộp cột",
      prompt: "Tạo bảng 3 cột (Thứ, Buổi sáng, Buổi chiều) với một hàng thông báo \"Thứ Bảy: nghỉ cả ngày\" dùng td colspan=\"3\".",
      starter: `<table>\n  <tr><th>Thứ</th><th>Buổi sáng</th><th>Buổi chiều</th></tr>\n</table>`,
      hints: ["Thêm vài hàng dữ liệu thường với 3 ô td.", "Hàng thông báo chỉ có MỘT ô: <td colspan=\"3\">Thứ Bảy: nghỉ cả ngày</td>."],
      solution: `<table>\n  <tr><th>Thứ</th><th>Buổi sáng</th><th>Buổi chiều</th></tr>\n  <tr><td>Hai</td><td>Toán</td><td>Lý</td></tr>\n  <tr><td>Ba</td><td>Văn</td><td>Anh</td></tr>\n  <tr><td colspan="3">Thứ Bảy: nghỉ cả ngày</td></tr>\n</table>`,
      checks: [
        { d: "Có ô gộp từ 2 cột trở lên", r: "colspan=\"[2-9]\"" },
        { d: "Có ít nhất 3 hàng tr", r: "(<tr>[\\s\\S]*?){3}" }
      ] },
    { t: "Bảng gộp hàng chuẩn truy cập",
      prompt: "Tạo bảng có: tiêu đề cột dùng th scope=\"col\", một ô gộp dọc rowspan=\"2\", và tiêu đề hàng dùng th scope=\"row\".",
      starter: `<table>\n  <tr><th>Nhóm</th><th>Món</th><th>Giá</th></tr>\n</table>`,
      hints: ["Đổi các th hàng đầu thành <th scope=\"col\">.", "Một ô nhóm (ví dụ \"Đồ uống\") dùng <th scope=\"row\" rowspan=\"2\">.", "Hàng bị chiếm chỗ chỉ viết các ô còn lại."],
      solution: `<table>\n  <tr><th scope="col">Nhóm</th><th scope="col">Món</th><th scope="col">Giá</th></tr>\n  <tr><th scope="row" rowspan="2">Đồ uống</th><td>Cà phê</td><td>25.000đ</td></tr>\n  <tr><td>Trà</td><td>20.000đ</td></tr>\n  <tr><th scope="row">Đồ ăn</th><td>Bánh mì</td><td>30.000đ</td></tr>\n</table>`,
      checks: [
        { d: "Có ô gộp hàng rowspan", r: "rowspan=\"[2-9]\"" },
        { d: "Có th scope=\"col\"", r: "scope=\"col\"" },
        { d: "Có th scope=\"row\"", r: "scope=\"row\"" }
      ] }
  ],
  summary: [
    "colspan=\"n\" g ô ngang n cột; rowspan=\"n\" gộp ô dọc n hàng.",
    "Ô gộp chiếm chỗ của hàng/cột khác — phải bớt số ô ở các hàng bị ảnh hưởng.",
    "th scope=\"col\" đánh dấu tiêu đề cột, scope=\"row\" đánh dấu tiêu đề hàng.",
    "caption + th + scope giúp trình đọc màn hình đọc bảng đúng ngữ cảnh."
  ]
},
{
  id: 10, part: 2, title: "Biểu mẫu 1: form, label, input và 15 kiểu nhập", minutes: 25,
  goals: [
    "Tạo form với action, method và hiểu khác nhau GET/POST.",
    "Gắn label đúng cách cho mọi ô nhập.",
    "Dùng đúng 15 kiểu input: text, password, email, number, tel, url, date, time, color, range, file, checkbox, radio, hidden, search."
  ],
  intro: `<p>Biểu mẫu (form) là cách trang web nhận dữ liệu từ bạn: đăng nhập, tìm kiếm, đặt hàng… Thẻ <code>&lt;form&gt;</code> có hai thuộc tính quan trọng: <code>action</code> (địa chỉ nhận dữ liệu) và <code>method</code>: <strong>GET</strong> gửi dữ liệu lộ trên URL (?q=html — hợp tìm kiếm), <strong>POST</strong> gửi ngầm trong thân yêu cầu (hợp mật khẩu, thông tin cá nhân).</p><p>Mỗi ô nhập cần một <code>&lt;label&gt;</code>: hoặc bọc quanh input, hoặc dùng <code>for="id-của-ô"</code>. Bấm vào label sẽ focus vào ô — vùng bấm rộng hơn, tốt cho điện thoại và trình đọc màn hình. Thuộc tính <code>name</code> là "tên kiện hàng": không có name thì dữ liệu của ô không được gửi đi.</p>`,
  syntax: `<form action="/xu-ly" method="post">
  <label for="ten">Họ tên:</label>
  <input type="text" id="ten" name="hoten">
  <button type="submit">Gửi</button>
</form>`,
  examples: [
    { t: "form + label + input text", code:
`<form action="" method="get" onsubmit="return false">
  <label for="ho-ten">Họ tên:</label>
  <input type="text" id="ho-ten" name="hoten">
  <button type="submit">Gửi</button>
</form>`,
      note: "onsubmit=\"return false\" chỉ để chặn gửi trong khung demo — khi tự làm file thật hãy bỏ nó. method=\"get\" sẽ đính dữ liệu lên URL dạng ?hoten=..." },
    { t: "password và email", code:
`<form onsubmit="return false">
  <p><label for="email">Email:</label>
  <input type="email" id="email" name="email"></p>
  <p><label for="mk">Mật khẩu:</label>
  <input type="password" id="mk" name="matkhau"></p>
  <button type="submit">Đăng nhập</button>
</form>`,
      note: "password che ký tự bằng dấu chấm. email tự kiểm tra định dạng có @ khi bấm Gửi (thử nhập sai rồi gửi)." },
    { t: "number, tel, url", code:
`<form onsubmit="return false">
  <p><label for="tuoi">Tuổi:</label> <input type="number" id="tuoi" name="tuoi"></p>
  <p><label for="sdt">Điện thoại:</label> <input type="tel" id="sdt" name="sdt"></p>
  <p><label for="web">Website:</label> <input type="url" id="web" name="web"></p>
</form>`,
      note: "number có nút tăng/giảm; tel và url giúp điện thoại hiện đúng bàn phím số / bàn phím có .com." },
    { t: "date và time", code:
`<form onsubmit="return false">
  <p><label for="ngay">Ngày hẹn:</label> <input type="date" id="ngay" name="ngay"></p>
  <p><label for="gio">Giờ hẹn:</label> <input type="time" id="gio" name="gio"></p>
</form>`,
      note: "Trình duyệt tự hiện bộ chọn ngày/giờ — không cần thư viện ngoài." },
    { t: "color và range", code:
`<form onsubmit="return false">
  <p><label for="mau">Màu yêu thích:</label>
  <input type="color" id="mau" name="mau" value="#E44D26"></p>
  <p><label for="muc">Hài lòng (0–10):</label>
  <input type="range" id="muc" name="muc" min="0" max="10" value="7"></p>
</form>`,
      note: "Bấm ô màu để mở bảng chọn màu, kéo thanh range — tất cả hoạt động ngay không cần JavaScript." },
    { t: "file — chọn tệp từ máy", code:
`<form onsubmit="return false">
  <p><label for="anh">Ảnh đại diện:</label>
  <input type="file" id="anh" name="anh" accept="image/*"></p>
</form>`,
      note: "accept=\"image/*\" chỉ cho chọn ảnh; thêm multiple để chọn nhiều file. Gửi file bắt buộc method=\"post\"." },
    { t: "checkbox và radio", code:
`<form onsubmit="return false">
  <p><strong>Sở thích</strong> (chọn nhiều):</p>
  <label><input type="checkbox" name="sothich" value="docsach"> Đọc sách</label>
  <label><input type="checkbox" name="sothich" value="thethao"> Thể thao</label>
  <p><strong>Giới tính</strong> (chọn một):</p>
  <label><input type="radio" name="gioitinh" value="nam"> Nam</label>
  <label><input type="radio" name="gioitinh" value="nu"> Nữ</label>
</form>`,
      note: "Radio CÙNG name thì chỉ chọn được một; khác name sẽ chọn được tất cả (lỗi hay gặp). Label bọc quanh input cũng hợp lệ, không cần for." },
    { t: "hidden và search", code:
`<form onsubmit="return false">
  <input type="hidden" name="nguon" value="trang-chu">
  <label for="tim">Tìm kiếm:</label>
  <input type="search" id="tim" name="q" placeholder="Nhập từ khóa">
  <button type="submit">Tìm</button>
</form>`,
      note: "hidden không hiển thị nhưng vẫn gửi kèm dữ liệu (ở đây: nguon=trang-chu). search có nút ✕ xóa nhanh nội dung." }
  ],
  mistakes: [
    { bad: `<input type="text" placeholder="Họ tên">`, good: `<label for="ht">Họ tên:</label>\n<input type="text" id="ht" name="hoten">`,
      why: "placeholder biến mất khi gõ và không thay được label: trình đọc màn hình cần label để biết ô này nhập gì." },
    { bad: `<input type="radio" name="gt1" value="nam"> Nam\n<input type="radio" name="gt2" value="nu"> Nữ`, good: `<input type="radio" name="gioitinh" value="nam"> Nam\n<input type="radio" name="gioitinh" value="nu"> Nữ`,
      why: "Radio khác name không cùng nhóm → chọn được cả hai. Muốn \"chọn một\" thì các radio phải chung một name." }
  ],
  tips: [
    "Mọi ô nhập cần name — thiếu name là dữ liệu không được gửi khi submit.",
    "GET cho tìm kiếm/bộ lọc (chia sẻ được URL); POST cho đăng nhập, đăng ký, gửi file.",
    "Chọn đúng type để điện thoại hiện bàn phím phù hợp: email có @, tel có số, url có /.",
    "value của checkbox/radio là giá trị gửi đi khi được chọn — đừng bỏ trống."
  ],
  exercises: [
    { t: "Form đăng ký tài khoản",
      prompt: "Tạo form đăng ký gồm: ô text họ tên, ô email, ô password — mỗi ô có label nối bằng for/id đúng cặp, và nút submit.",
      starter: `<form onsubmit="return false">\n\n  <button type="submit">Đăng ký</button>\n</form>`,
      hints: ["Mỗi ô: <label for=\"id\">Nhãn</label> <input type=\"...\" id=\"id\" name=\"...\">.", "Ba type cần dùng: text, email, password.", "for của label phải trùng id của input từng cặp."],
      solution: `<form onsubmit="return false">\n  <p><label for="hoten">Họ tên:</label> <input type="text" id="hoten" name="hoten"></p>\n  <p><label for="email">Email:</label> <input type="email" id="email" name="email"></p>\n  <p><label for="mk">Mật khẩu:</label> <input type="password" id="mk" name="mk"></p>\n  <button type="submit">Đăng ký</button>\n</form>`,
      checks: [
        { d: "Có thẻ form", r: "<form" },
        { d: "Có label dùng for", r: "<label[^>]*for=\"[^\"]+\"" },
        { d: "Có input type=\"email\"", r: "type=\"email\"" },
        { d: "Có input type=\"password\"", r: "type=\"password\"" },
        { d: "Có nút submit", r: "type=\"submit\"" }
      ] },
    { t: "Form khảo sát ý kiến",
      prompt: "Tạo form khảo sát: 2 radio cùng name (chọn một), 2 checkbox (chọn nhiều) và một ô date. Có label cho từng ô.",
      starter: `<form onsubmit="return false">\n\n</form>`,
      hints: ["Radio: <label><input type=\"radio\" name=\"danhgia\" value=\"tot\"> Tốt</label> — hai radio chung name.", "Checkbox tương tự nhưng type=\"checkbox\".", "Thêm <label for=\"ngay\">Ngày góp ý:</label> <input type=\"date\" id=\"ngay\" name=\"ngay\">."],
      solution: `<form onsubmit="return false">\n  <p>Đánh giá:</p>\n  <label><input type="radio" name="danhgia" value="tot"> Tốt</label>\n  <label><input type="radio" name="danhgia" value="binhthuong"> Bình thường</label>\n  <p>Chủ đề quan tâm:</p>\n  <label><input type="checkbox" name="chude" value="html"> HTML</label>\n  <label><input type="checkbox" name="chude" value="css"> CSS</label>\n  <p><label for="ngay">Ngày góp ý:</label> <input type="date" id="ngay" name="ngay"></p>\n</form>`,
      checks: [
        { d: "Có ít nhất 2 radio", r: "type=\"radio\"[\\s\\S]*type=\"radio\"" },
        { d: "Có ít nhất 2 checkbox", r: "type=\"checkbox\"[\\s\\S]*type=\"checkbox\"" },
        { d: "Có ô chọn ngày", r: "type=\"date\"" }
      ] }
  ],
  summary: [
    "form có action (nơi nhận) và method: GET lộ dữ liệu trên URL, POST gửi ngầm.",
    "label gắn với input qua for/id hoặc bọc quanh input; name quyết định dữ liệu gửi đi.",
    "15 kiểu input phủ hầu hết nhu cầu: chữ, số, ngày giờ, màu, thanh kéo, file, chọn một/nhiều.",
    "Radio cùng name = chọn một; checkbox = chọn nhiều; hidden gửi dữ liệu ngầm.",
    "Chọn đúng type để có kiểm tra sẵn và bàn phím phù hợp trên điện thoại."
  ]
},
{
  id: 11, part: 2, title: "Biểu mẫu 2: textarea, select, datalist, button, fieldset", minutes: 15,
  goals: [
    "Tạo ô nhập nhiều dòng bằng textarea.",
    "Tạo danh sách thả xuống select/option/optgroup và gợi ý datalist.",
    "Phân biệt 3 loại button và nhóm ô nhập bằng fieldset/legend."
  ],
  intro: `<p>Ngoài input một dòng, biểu mẫu còn các điều khiển "nặng ký" hơn: <code>textarea</code> cho đoạn văn dài (nội dung mặc định viết GIỮA cặp thẻ, không dùng value); <code>select</code> cho danh sách thả xuống với các <code>option</code>, gom nhóm bằng <code>optgroup</code>; <code>datalist</code> gợi ý nhưng vẫn cho nhập tự do.</p><p><code>button</code> có ba tính cách: <code>submit</code> gửi form (mặc định trong form!), <code>reset</code> đưa mọi ô về giá trị ban đầu, <code>button</code> trung tính chờ JavaScript. Form dài nên chia nhóm bằng <code>fieldset</code> với tiêu đề nhóm <code>legend</code>.</p>`,
  syntax: `<textarea name="gopy" rows="4" cols="40">Nội dung mặc định</textarea>
<select name="mon">
  <option value="pho">Phở</option>
</select>
<input list="ds" name="tinh">
<datalist id="ds"><option value="Hà Nội"></datalist>`,
  examples: [
    { t: "textarea — ô nhập nhiều dòng", code:
`<form onsubmit="return false">
  <label for="gopy">Góp ý của bạn:</label><br>
  <textarea id="gopy" name="gopy" rows="4" cols="40">Viết cảm nhận của bạn ở đây...</textarea>
</form>`,
      note: "rows = số dòng hiển thị, cols = bề rộng theo ký tự. Kéo góc phải dưới để mở rộng ô." },
    { t: "select, option, optgroup", code:
`<form onsubmit="return false">
  <label for="mon">Món yêu thích:</label>
  <select id="mon" name="mon">
    <optgroup label="Đồ uống">
      <option value="caphe">Cà phê</option>
      <option value="tra">Trà</option>
    </optgroup>
    <optgroup label="Đồ ăn">
      <option value="banhmi">Bánh mì</option>
      <option value="pho" selected>Phở</option>
    </optgroup>
  </select>
</form>`,
      note: "value là giá trị gửi đi (chữ hiển thị có thể khác). selected chọn sẵn một mục; optgroup tạo nhóm không chọn được." },
    { t: "datalist — gợi ý khi gõ", code:
`<form onsubmit="return false">
  <label for="tinh">Tỉnh / Thành phố:</label>
  <input list="ds-tinh" id="tinh" name="tinh">
  <datalist id="ds-tinh">
    <option value="Hà Nội">
    <option value="Đà Nẵng">
    <option value="TP. Hồ Chí Minh">
  </datalist>
</form>`,
      note: "Gõ thử chữ h để thấy gợi ý. Khác select: người dùng vẫn nhập được giá trị ngoài danh sách." },
    { t: "Ba loại button", code:
`<form onsubmit="return false">
  <label for="ten">Tên:</label>
  <input type="text" id="ten" name="ten" value="An"><br><br>
  <button type="submit">Gửi</button>
  <button type="reset">Xóa về mặc định</button>
  <button type="button" onclick="this.textContent='Đã bấm!'">Nút thường</button>
</form>`,
      note: "Thử: sửa tên rồi bấm reset — ô trở về \"An\". Nút thường không gửi form, chỉ chạy JavaScript. Trong form, button thiếu type mặc định là submit!" },
    { t: "fieldset và legend — nhóm ô nhập", code:
`<form onsubmit="return false">
  <fieldset>
    <legend>Thông tin liên lạc</legend>
    <p><label for="dt">Điện thoại:</label> <input type="tel" id="dt" name="dt"></p>
    <p><label for="dc">Địa chỉ:</label> <input type="text" id="dc" name="dc"></p>
  </fieldset>
</form>`,
      note: "fieldset kẻ viền nhóm, legend là tiêu đề nằm trên viền. Trình đọc màn hình đọc legend trước mỗi ô trong nhóm." }
  ],
  mistakes: [
    { bad: `<textarea value="Nội dung góp ý"></textarea>`, good: `<textarea>Nội dung góp ý</textarea>`,
      why: "textarea không có thuộc tính value — nội dung mặc định phải viết giữa thẻ mở và thẻ đóng." },
    { bad: `<select id="mon">\n  <option value="pho">Phở</option>\n</select>`, good: `<select id="mon" name="mon">\n  <option value="pho">Phở</option>\n</select>`,
      why: "select thiếu name thì lựa chọn không được gửi khi submit — lỗi thầm lặng, form vẫn chạy nhưng mất dữ liệu." }
  ],
  tips: [
    "Luôn ghi rõ type cho button để tránh gửi form ngoài ý muốn (mặc định là submit).",
    "option nên có value ngắn gọn không dấu (caphe) dù chữ hiển thị có dấu (Cà phê).",
    "datalist hợp cho ô vừa có gợi ý vừa cho nhập tự do; select hợp khi bắt buộc chọn trong danh sách.",
    "Form dài: chia fieldset theo chủ đề (thông tin cá nhân, thanh toán…) để dễ điền."
  ],
  exercises: [
    { t: "Form liên hệ góp ý",
      prompt: "Tạo form gồm textarea (rows=\"4\", có name) và select chọn chủ đề với ít nhất 3 option có value.",
      starter: `<form onsubmit="return false">\n\n</form>`,
      hints: ["<textarea id=\"nd\" name=\"noidung\" rows=\"4\" cols=\"40\"></textarea> kèm label.", "<select name=\"chude\"> với 3 <option value=\"...\">.", "Đừng quên name cho cả textarea và select."],
      solution: `<form onsubmit="return false">\n  <p><label for="nd">Nội dung góp ý:</label><br>\n  <textarea id="nd" name="noidung" rows="4" cols="40"></textarea></p>\n  <p><label for="cd">Chủ đề:</label>\n  <select id="cd" name="chude">\n    <option value="baihoc">Bài học</option>\n    <option value="giaodien">Giao diện</option>\n    <option value="khac">Khác</option>\n  </select></p>\n</form>`,
      checks: [
        { d: "textarea có rows", r: "<textarea[^>]*rows=\"\\d+\"" },
        { d: "select có name", r: "<select[^>]*name=\"[^\"]+\"" },
        { d: "Có ít nhất 3 option có value", r: "(<option[^>]*value=\"[^\"]*\"[\\s\\S]*?){3}" }
      ] },
    { t: "Form đặt món hoàn chỉnh",
      prompt: "Tạo form đặt món có: fieldset + legend, select với optgroup, input nối datalist, và nút reset.",
      starter: `<form onsubmit="return false">\n\n</form>`,
      hints: ["Bọc các ô trong <fieldset><legend>Đặt món</legend>...</fieldset>.", "select có <optgroup label=\"...\"> chứa các option.", "input list=\"ds\" nối với <datalist id=\"ds\">.", "Thêm <button type=\"reset\">Nhập lại</button>."],
      solution: `<form onsubmit="return false">\n  <fieldset>\n    <legend>Đặt món</legend>\n    <p><label for="mon">Món chính:</label>\n    <select id="mon" name="mon">\n      <optgroup label="Mặn">\n        <option value="pho">Phở</option>\n        <option value="com">Cơm rang</option>\n      </optgroup>\n      <optgroup label="Ngọt">\n        <option value="che">Chè</option>\n      </optgroup>\n    </select></p>\n    <p><label for="ghichu">Ghi chú:</label> <input list="ds-ghichu" id="ghichu" name="ghichu">\n    <datalist id="ds-ghichu">\n      <option value="Ít cay">\n      <option value="Không hành">\n    </datalist></p>\n    <button type="reset">Nhập lại</button>\n  </fieldset>\n</form>`,
      checks: [
        { d: "Có fieldset và legend", r: "<fieldset>[\\s\\S]*?<legend>[^<]+</legend>" },
        { d: "optgroup có label", r: "<optgroup[^>]*label=\"[^\"]+\"" },
        { d: "input nối datalist qua list", r: "<input[^>]*list=\"[^\"]+\"" },
        { d: "Có nút reset", r: "type=\"reset\"" }
      ] }
  ],
  summary: [
    "textarea nhập nhiều dòng; nội dung mặc định nằm giữa cặp thẻ, không dùng value.",
    "select/option tạo danh sách thả xuống; optgroup nhóm lựa chọn; value là giá trị gửi đi.",
    "datalist gợi ý cho input qua list/id nhưng vẫn cho nhập tự do.",
    "button: submit gửi form (mặc định), reset khôi phục giá trị đầu, button trung tính.",
    "fieldset/legend nhóm và đặt tên nhóm ô nhập, tốt cho form dài và truy cập."
  ]
},
{
  id: 12, part: 2, title: "Kiểm tra dữ liệu bằng HTML5: required, pattern, min/max…", minutes: 15,
  goals: [
    "Dùng required, minlength/maxlength, min/max để ràng buộc dữ liệu.",
    "Viết pattern regex đơn giản và hiểu placeholder, autocomplete.",
    "Phân biệt disabled và readonly; hiểu trình duyệt tự kiểm tra thế nào."
  ],
  intro: `<p>HTML5 cho phép kiểm tra dữ liệu <strong>không cần một dòng JavaScript</strong>: khai báo ràng buộc ngay trên thẻ input, trình duyệt tự chặn nút Gửi và hiện thông báo khi dữ liệu không hợp lệ. Các ràng buộc hay dùng: <code>required</code> (bắt buộc), <code>minlength/maxlength</code> (số ký tự), <code>min/max</code> (giá trị số/ngày), <code>pattern</code> (khớp mẫu regex).</p><p>Hai trạng thái "khóa" dễ nhầm: <code>readonly</code> chỉ cho đọc nhưng <strong>vẫn gửi</strong> dữ liệu; <code>disabled</code> khóa hoàn toàn và <strong>không gửi</strong>. Thông báo lỗi hiện theo ngôn ngữ trình duyệt; muốn tùy chỉnh tiếng Việt cần JavaScript (khóa sau).</p>`,
  syntax: `<input type="text" required minlength="3" maxlength="15">
<input type="number" min="18" max="60">
<input type="tel" pattern="0[0-9]{9}">`,
  examples: [
    { t: "required + minlength/maxlength", code:
`<form onsubmit="return false">
  <p><label for="ten">Tên đăng nhập (3–15 ký tự):</label>
  <input type="text" id="ten" name="ten" required minlength="3" maxlength="15"></p>
  <button type="submit">Đăng ký</button>
</form>`,
      note: "Thử bấm Gửi khi ô trống → bị chặn. Gõ 1 ký tự rồi gửi → báo thiếu. maxlength chặn gõ quá 15 ký tự." },
    { t: "min và max cho số, ngày", code:
`<form onsubmit="return false">
  <p><label for="tuoi">Tuổi (18–60):</label>
  <input type="number" id="tuoi" name="tuoi" min="18" max="60" required></p>
  <p><label for="ngay">Ngày khám (từ 2026-01-01):</label>
  <input type="date" id="ngay" name="ngay" min="2026-01-01"></p>
  <button type="submit">Đặt lịch</button>
</form>`,
      note: "Nhập tuổi 15 rồi gửi → trình duyệt báo giá trị nhỏ nhất là 18. min/max áp dụng cho cả number, date, range." },
    { t: "pattern — khớp mẫu regex", code:
`<form onsubmit="return false">
  <p><label for="sdt">Số điện thoại (10 chữ số, đầu 0):</label>
  <input type="tel" id="sdt" name="sdt" pattern="0[0-9]{9}" placeholder="0912345678" required></p>
  <button type="submit">Kiểm tra</button>
</form>`,
      note: "pattern=\"0[0-9]{9}\" nghĩa: bắt đầu bằng 0, theo sau đúng 9 chữ số. Thử nhập 123 hoặc 09abc rồi gửi." },
    { t: "placeholder và autocomplete", code:
`<form onsubmit="return false">
  <p><label for="hoten">Họ tên:</label>
  <input type="text" id="hoten" name="hoten" placeholder="Nguyễn Văn An" autocomplete="name"></p>
  <p><label for="em">Email:</label>
  <input type="email" id="em" name="em" placeholder="an@example.com" autocomplete="email"></p>
</form>`,
      note: "placeholder là chữ gợi ý mờ (không thay label). autocomplete=\"name\"/\"email\" giúp trình duyệt đề xuất điền tự động." },
    { t: "readonly và disabled", code:
`<form onsubmit="return false">
  <p><label for="ma">Mã hồ sơ (chỉ đọc):</label>
  <input type="text" id="ma" name="ma" value="HS-2026-001" readonly></p>
  <p><label for="ghichu">Ghi chú (đang khóa):</label>
  <input type="text" id="ghichu" name="ghichu" disabled></p>
  <button type="submit">Gửi</button>
</form>`,
      note: "Ô readonly không sửa được nhưng giá trị vẫn gửi đi; ô disabled mờ hẳn, không focus được và KHÔNG gửi dữ liệu." },
    { t: "required với checkbox và select", code:
`<form onsubmit="return false">
  <p><label><input type="checkbox" name="dongy" required> Tôi đồng ý với điều khoản</label></p>
  <p><label for="loai">Loại vé:</label>
  <select id="loai" name="loai" required>
    <option value="">-- Chọn loại vé --</option>
    <option value="thuong">Vé thường</option>
    <option value="vip">Vé VIP</option>
  </select></p>
  <button type="submit">Đặt vé</button>
</form>`,
      note: "select required cần một option value=\"\" làm mốc \"chưa chọn\" — nếu không, mục đầu tiên luôn được coi là đã chọn." }
  ],
  mistakes: [
    { bad: `<input type="text" name="hoten" placeholder="Họ tên (bắt buộc)">`, good: `<label for="ht">Họ tên:</label>\n<input type="text" id="ht" name="hoten" required>`,
      why: "Chữ \"bắt buộc\" trong placeholder không tạo ràng buộc thật. Phải dùng thuộc tính required và có label riêng." },
    { bad: `<input type="text" name="ma" value="HS-01" disabled>`, good: `<input type="text" name="ma" value="HS-01" readonly>`,
      why: "Muốn người dùng không sửa nhưng VẪN gửi mã hồ sơ thì dùng readonly. disabled sẽ loại giá trị khỏi dữ liệu gửi đi." }
  ],
  tips: [
    "minlength chỉ kiểm tra khi người dùng có gõ — muốn bắt buộc nhập thì phải thêm required.",
    "pattern tự khớp TOÀN BỘ giá trị (không cần ^ $); dùng title để giải thích yêu cầu khi báo lỗi.",
    "Kiểm tra HTML5 là lớp bảo vệ tiện lợi phía trình duyệt; máy chủ vẫn phải kiểm tra lại vì ràng buộc này có thể bị vượt qua.",
    "autocomplete đúng chuẩn (name, email, tel, address-level2…) giúp điền form nhanh trên mọi thiết bị."
  ],
  exercises: [
    { t: "Form đăng ký chặt chẽ",
      prompt: "Tạo form có: email bắt buộc (required), mật khẩu dài 6–20 ký tự (minlength/maxlength), tuổi từ 18–60 (number + min/max).",
      starter: `<form onsubmit="return false">\n\n  <button type="submit">Đăng ký</button>\n</form>`,
      hints: ["email: <input type=\"email\" ... required>.", "password: minlength=\"6\" maxlength=\"20\".", "number: min=\"18\" max=\"60\"."],
      solution: `<form onsubmit="return false">\n  <p><label for="em">Email:</label> <input type="email" id="em" name="em" required></p>\n  <p><label for="mk">Mật khẩu:</label> <input type="password" id="mk" name="mk" minlength="6" maxlength="20" required></p>\n  <p><label for="tuoi">Tuổi:</label> <input type="number" id="tuoi" name="tuoi" min="18" max="60"></p>\n  <button type="submit">Đăng ký</button>\n</form>`,
      checks: [
        { d: "email có required", r: "<input(?=[^>]*type=\"email\")(?=[^>]*required)" },
        { d: "password có minlength=6", r: "<input(?=[^>]*type=\"password\")(?=[^>]*minlength=\"6\")" },
        { d: "password có maxlength=20", r: "<input(?=[^>]*type=\"password\")(?=[^>]*maxlength=\"20\")" },
        { d: "number có min=18 và max=60", r: "<input(?=[^>]*type=\"number\")(?=[^>]*min=\"18\")(?=[^>]*max=\"60\")" }
      ] },
    { t: "Form xác minh thông tin",
      prompt: "Tạo form có: ô điện thoại khớp pattern 10 chữ số bắt đầu bằng 0, ô họ tên autocomplete=\"name\", và ô mã số chỉ đọc (readonly) có giá trị sẵn.",
      starter: `<form onsubmit="return false">\n\n</form>`,
      hints: ["pattern=\"0[0-9]{9}\" cho ô tel.", "autocomplete=\"name\" cho ô text họ tên.", "value=\"...\" readonly cho ô mã số."],
      solution: `<form onsubmit="return false">\n  <p><label for="sdt">Điện thoại:</label> <input type="tel" id="sdt" name="sdt" pattern="0[0-9]{9}" required></p>\n  <p><label for="hoten">Họ tên:</label> <input type="text" id="hoten" name="hoten" autocomplete="name"></p>\n  <p><label for="ma">Mã số:</label> <input type="text" id="ma" name="ma" value="HV-001" readonly></p>\n</form>`,
      checks: [
        { d: "Có pattern kiểm tra số điện thoại", r: "pattern=\"0\\[0-9\\]\\{9\\}\"" },
        { d: "Có autocomplete=\"name\"", r: "autocomplete=\"name\"" },
        { d: "Có ô readonly mang value", r: "<input(?=[^>]*readonly)(?=[^>]*value=\"[^\"]+\")" }
      ] }
  ],
  summary: [
    "required bắt buộc nhập; minlength/maxlength giới hạn ký tự; min/max giới hạn giá trị.",
    "pattern khớp mẫu regex toàn bộ giá trị — hợp cho số điện thoại, mã số.",
    "placeholder chỉ gợi ý; autocomplete giúp trình duyệt điền tự động đúng chuẩn.",
    "readonly: không sửa được nhưng vẫn gửi; disabled: khóa hẳn và không gửi.",
    "HTML5 tự chặn gửi và báo lỗi khi vi phạm ràng buộc — không cần JavaScript."
  ]
},{
  id: 13, part: 2, title: "Âm thanh và video: audio, video, source, track", minutes: 12,
  goals: [
    "Nhúng âm thanh bằng audio và video bằng video với controls.",
    "Hiểu autoplay, muted, loop, poster và chính sách tự phát của trình duyệt.",
    "Khai báo nhiều nguồn bằng source và thêm phụ đề bằng track."
  ],
  intro: `<p>HTML5 nhúng đa phương tiện trực tiếp, không cần plugin: <code>&lt;audio&gt;</code> cho âm thanh, <code>&lt;video&gt;</code> cho phim. Thuộc tính <code>controls</code> hiện thanh điều khiển (phát, tạm dừng, âm lượng…) — gần như luôn cần. Bên trong, các thẻ <code>&lt;source&gt;</code> liệt kê nhiều định dạng để trình duyệt chọn cái nó hỗ trợ.</p><p>Chính sách quan trọng: trình duyệt <strong>chặn tự phát có tiếng</strong> để chống làm phiền; muốn <code>autoplay</code> hoạt động phải kèm <code>muted</code> (tắt tiếng). <code>poster</code> là ảnh bìa của video trước khi phát; <code>track</code> thêm phụ đề từ file .vtt.</p>`,
  syntax: `<audio controls src="nhac.mp3"></audio>
<video controls width="320" poster="bia.jpg">
  <source src="phim.mp4" type="video/mp4">
  <track kind="subtitles" src="phude.vi.vtt" srclang="vi" label="Tiếng Việt">
</video>`,
  examples: [
    { t: "audio với controls và source", code:
`<audio controls>
  <source src="beep.wav" type="audio/wav">
  Trình duyệt của bạn không hỗ trợ thẻ audio.
</audio>
<p>Bấm nút phát để nghe tiếng beep.</p>`,
      note: "Trong demo, beep.wav được tự thay bằng âm thanh tạo sẵn (data URI). Khi tự làm: đặt file .mp3/.wav cạnh file HTML. Văn bản bên trong là nội dung dự phòng khi trình duyệt quá cũ." },
    { t: "autoplay, muted, loop", code:
`<audio controls autoplay muted loop>
  <source src="beep.wav" type="audio/wav">
</audio>
<p>Tự phát nhưng tắt tiếng; loop khiến tiếng beep lặp lại liên tục.</p>`,
      note: "Bấm biểu tượng loa để bật tiếng. Nếu bỏ muted, trình duyệt sẽ CHẶN autoplay — đó là chính sách chống làm phiền, không phải lỗi code." },
    { t: "video với controls, poster, source", code:
`<video controls width="320" poster="poster.svg">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
  Trình duyệt của bạn không hỗ trợ thẻ video.
</video>`,
      note: "Video hoa mẫu của MDN (cần mạng). poster.svg là ảnh bìa hiện trước khi phát. Khi tự làm: thay src bằng file .mp4 của bạn, đặt cạnh file HTML." },
    { t: "track — phụ đề cho video", code:
`<video controls width="320" poster="poster.svg">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
  <track kind="subtitles" src="phude.vtt" srclang="vi" label="Tiếng Việt" default>
</video>`,
      note: "Bấm nút CC trên thanh điều khiển để bật phụ đề. Demo tự thay phude.vtt bằng phụ đề mẫu (data URI) minh họa đúng thời gian video; khi tự làm hãy viết file .vtt riêng." }
  ],
  mistakes: [
    { bad: `<audio autoplay src="beep.wav"></audio>`, good: `<audio controls autoplay muted loop>\n  <source src="beep.wav" type="audio/wav">\n</audio>`,
      why: "autoplay có tiếng bị trình duyệt chặn im lặng. Muốn tự phát: kèm muted và để người dùng tự bật tiếng; đừng quên controls." },
    { bad: `<video width="320" src="phim.mp4"></video>`, good: `<video controls width="320" src="phim.mp4"></video>`,
      why: "Thiếu controls thì video đứng yên ở khung đầu, người xem không có cách nào bấm phát." }
  ],
  tips: [
    "Nhiều source theo thứ tự ưu tiên: trình duyệt chọn định dạng đầu tiên nó hỗ trợ.",
    "Video nên có poster nhẹ để trang đẹp ngay cả khi chưa phát.",
    "Phụ đề .vtt gồm các khối: thời gian bắt đầu --> kết thúc, rồi dòng chữ; track cần srclang và label.",
    "Tôn trọng người dùng: hạn chế autoplay; nếu cần thì luôn bắt đầu bằng muted."
  ],
  exercises: [
    { t: "Máy phát âm thanh",
      prompt: "Tạo audio có controls và loop, với source trỏ tới beep.wav (demo tự có âm thanh thay thế).",
      starter: `<audio>\n\n</audio>`,
      hints: ["Thêm controls và loop vào thẻ mở audio.", "Bên trong viết <source src=\"beep.wav\" type=\"audio/wav\">.", "Bấm ▶ Chạy rồi thử phát / tạm dừng."],
      solution: `<audio controls loop>\n  <source src="beep.wav" type="audio/wav">\n  Trình duyệt không hỗ trợ audio.\n</audio>`,
      checks: [
        { d: "audio có controls", r: "<audio[^>]*controls" },
        { d: "audio có loop", r: "<audio[^>]*loop" },
        { d: "Có source với src", r: "<source[^>]*src=\"[^\"]+\"" }
      ] },
    { t: "Rạp chiếu mini",
      prompt: "Tạo video có controls, width, poster=\"poster.svg\", một source mp4 và một track phụ đề tiếng Việt (src=\"phude.vtt\", srclang=\"vi\").",
      starter: `<video>\n\n</video>`,
      hints: ["controls width=\"320\" poster=\"poster.svg\" trong thẻ mở video.", "<source src=\"...mp4\" type=\"video/mp4\"> — có thể dùng link mẫu MDN như ví dụ.", "<track kind=\"subtitles\" src=\"phude.vtt\" srclang=\"vi\" label=\"Tiếng Việt\">."],
      solution: `<video controls width="320" poster="poster.svg">\n  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">\n  <track kind="subtitles" src="phude.vtt" srclang="vi" label="Tiếng Việt" default>\n</video>`,
      checks: [
        { d: "video có controls", r: "<video[^>]*controls" },
        { d: "video có poster", r: "<video[^>]*poster=\"[^\"]+\"" },
        { d: "track có srclang", r: "<track[^>]*srclang=\"[^\"]+\"" }
      ] }
  ],
  summary: [
    "audio/video nhúng đa phương tiện trực tiếp; controls hiện thanh điều khiển.",
    "autoplay chỉ chạy khi kèm muted (chính sách trình duyệt); loop phát lặp lại.",
    "source liệt kê nhiều định dạng; poster là ảnh bìa video; văn bản trong thẻ là dự phòng.",
    "track thêm phụ đề .vtt với kind, srclang, label — bật bằng nút CC."
  ]
},
{
  id: 14, part: 3, title: "Nhúng nội dung: iframe (YouTube, Maps) và SVG cơ bản", minutes: 10,
  goals: [
    "Nhúng trang khác bằng iframe, hiểu src, srcdoc, title, loading.",
    "Biết cách nhúng YouTube và Google Maps đúng chuẩn.",
    "Vẽ hình cơ bản bằng SVG inline: rect, circle, line, polygon, text."
  ],
  intro: `<p><code>&lt;iframe&gt;</code> mở một "cửa sổ" chứa trang web khác ngay trong trang của bạn: video YouTube, bản đồ, biểu mẫu đăng ký… Mỗi iframe cần <code>title</code> mô tả nội dung (trình đọc màn hình đọc title để quyết định có vào khung hay không). <code>srcdoc</code> cho phép viết thẳng HTML vào khung thay vì nạp URL.</p><p><code>&lt;svg&gt;</code> là đồ họa vector viết bằng thẻ: sắc nét ở mọi kích thước, sửa màu bằng CSS, rất hợp icon và hình minh họa đơn giản. Các hình cơ bản: <code>rect</code> (chữ nhật), <code>circle</code> (tròn), <code>line</code> (thẳng), <code>polygon</code> (đa giác), <code>text</code> (chữ), <code>path</code> (đường tự do).</p>`,
  syntax: `<iframe src="https://..." title="Mô tả khung" width="560" height="315" loading="lazy"></iframe>
<svg width="200" height="120" viewBox="0 0 200 120">
  <circle cx="60" cy="60" r="40" fill="#E44D26"/>
</svg>`,
  examples: [
    { t: "iframe với srcdoc — trang con trong trang", code:
`<iframe
  srcdoc="<h3>Trang con</h3><p>Tôi là một trang HTML nằm gọn trong iframe.</p>"
  width="100%" height="120" title="Trang con minh họa">
</iframe>
<p>Khung phía trên là một tài liệu HTML độc lập.</p>`,
      note: "srcdoc nhận HTML trực tiếp (bên trong dùng ngoặc đơn hoặc &quot; thay ngoặc kép). Khung demo chạy offline hoàn toàn." },
    { t: "Nhúng video YouTube", code:
`<iframe width="560" height="315"
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
  title="Video YouTube minh họa"
  allowfullscreen loading="lazy">
</iframe>`,
      static: true,
      note: "Cách dùng thật: lấy URL video, phần sau watch?v= chính là VIDEO_ID (ví dụ watch?v=dQw4w9WgXcQ → embed/dQw4w9WgXcQ). Thay VIDEO_ID rồi chạy trong file thật — trình phát bị chặn trong khung sandbox của demo nên khối này hiển thị dạng code tĩnh. youtube-nocookie.com là bản không cookie theo dõi." },
    { t: "Nhúng bản đồ Google Maps", code:
`<iframe width="100%" height="300" loading="lazy"
  title="Bản đồ Hà Nội"
  src="https://maps.google.com/maps?q=H%C3%A0%20N%E1%BB%99i&output=embed">
</iframe>`,
      static: true,
      note: "Dạng output=embed không cần API key: đổi q= thành địa điểm bất kỳ (mã hóa URL). Chạy trong file thật có mạng; demo để code tĩnh vì sandbox chặn trang ngoài." },
    { t: "SVG cơ bản: vẽ ngôi nhà", code:
`<svg width="220" height="140" viewBox="0 0 220 140" role="img" aria-label="Ngôi nhà và mặt trời vẽ bằng SVG">
  <rect x="10" y="60" width="120" height="70" fill="#F59E0B"/>
  <polygon points="10,60 70,15 130,60" fill="#E44D26"/>
  <rect x="55" y="90" width="30" height="40" fill="#7C3AED"/>
  <circle cx="180" cy="35" r="20" fill="#FBBF24"/>
  <line x1="10" y1="132" x2="210" y2="132" stroke="#16A34A" stroke-width="4"/>
  <text x="10" y="14" font-size="12" fill="#2563EB">Ngôi nhà SVG</text>
</svg>`,
      note: "Tọa độ tính từ góc trên trái. viewBox=\"0 0 220 140\" là hệ tọa độ nội bộ — đổi width/height mà hình không méo." }
  ],
  mistakes: [
    { bad: `<iframe src="https://example.com"></iframe>`, good: `<iframe src="https://example.com" title="Trang ví dụ được nhúng"></iframe>`,
      why: "iframe thiếu title: người dùng trình đọc màn hình chỉ nghe \"khung\" mà không biết khung chứa gì. title là yêu cầu truy cập bắt buộc." },
    { bad: `<svg width="200" height="200">\n  <circle cx="100" cy="100" r="80" fill="red"/>\n</svg>`, good: `<svg width="200" height="200" viewBox="0 0 200 200">\n  <circle cx="100" cy="100" r="80" fill="red"/>\n</svg>`,
      why: "Thiếu viewBox thì khi đổi kích thước svg, hình không co giãn theo. viewBox giữ hệ tọa độ cố định để hình scale đúng." }
  ],
  tips: [
    "YouTube: dùng youtube-nocookie.com/embed/ID; Google Maps: maps.google.com/maps?q=...&output=embed.",
    "loading=\"lazy\" cho iframe giúp trang mở nhanh khi khung nằm xa đầu trang.",
    "SVG inline sửa được bằng CSS/JS; SVG trong img thì không — chọn theo nhu cầu.",
    "Đặt role=\"img\" và aria-label cho svg mang nội dung để trình đọc màn hình mô tả."
  ],
  exercises: [
    { t: "Nhúng trang giới thiệu",
      prompt: "Tạo iframe dùng srcdoc chứa một trang con có h3 và p; iframe phải có title, width và height.",
      starter: `<iframe></iframe>`,
      hints: ["srcdoc=\"<h3>...</h3><p>...</p>\" — HTML viết thẳng trong thuộc tính.", "Thêm title=\"Trang giới thiệu\".", "width=\"100%\" height=\"120\"."],
      solution: `<iframe srcdoc="<h3>Xin chào</h3><p>Đây là trang con của tôi.</p>" width="100%" height="120" title="Trang giới thiệu"></iframe>`,
      checks: [
        { d: "iframe có srcdoc chứa HTML", r: "<iframe[^>]*srcdoc=\"[^\"]*<[^\"]+\"" },
        { d: "iframe có title", r: "<iframe[^>]*title=\"[^\"]+\"" },
        { d: "iframe có height", r: "<iframe[^>]*height=\"[^\"]+\"" }
      ] },
    { t: "Vẽ mặt trời trên biển",
      prompt: "Vẽ SVG (có viewBox) gồm: một rect làm nền biển phía dưới và một circle làm mặt trời phía trên.",
      starter: `<svg width="220" height="140">\n\n</svg>`,
      hints: ["Thêm viewBox=\"0 0 220 140\" vào thẻ svg.", "Biển: <rect x=\"0\" y=\"90\" width=\"220\" height=\"50\" fill=\"#2563EB\"/>.", "Mặt trời: <circle cx=\"170\" cy=\"40\" r=\"22\" fill=\"#F59E0B\"/>."],
      solution: `<svg width="220" height="140" viewBox="0 0 220 140" role="img" aria-label="Mặt trời trên biển">\n  <rect x="0" y="90" width="220" height="50" fill="#2563EB"/>\n  <circle cx="170" cy="40" r="22" fill="#F59E0B"/>\n</svg>`,
      checks: [
        { d: "svg có viewBox", r: "<svg[^>]*viewBox=\"[^\"]+\"" },
        { d: "Có hình chữ nhật rect", r: "<rect[^>]*>" },
        { d: "Có hình tròn circle", r: "<circle[^>]*>" }
      ] }
  ],
  summary: [
    "iframe nhúng trang khác qua src, hoặc viết thẳng HTML qua srcdoc; luôn có title.",
    "YouTube: /embed/VIDEO_ID; Google Maps: ?q=địa-điểm&output=embed — không cần API key.",
    "SVG vẽ vector bằng rect, circle, line, polygon, text, path; viewBox giữ tỉ lệ khi scale.",
    "loading=\"lazy\" hoãn tải khung xa màn hình; role=\"img\" + aria-label mô tả SVG."
  ]
},
{
  id: 15, part: 3, title: "Thành phần tương tác: details/summary, dialog, progress/meter", minutes: 10,
  goals: [
    "Tạo khối đóng/mở bằng details/summary không cần JavaScript.",
    "Mở hộp thoại bằng dialog + showModal().",
    "Hiển thị tiến trình bằng progress và thanh đo bằng meter."
  ],
  intro: `<p>HTML hiện đại có sẵn nhiều thành phần tương tác mà xưa kia phải viết JavaScript: <code>&lt;details&gt;</code> + <code>&lt;summary&gt;</code> tạo mục bấm để xổ nội dung (hợp FAQ); <code>&lt;dialog&gt;</code> là hộp thoại chuẩn, mở bằng <code>showModal()</code> (có nền mờ, Esc để đóng); <code>&lt;progress&gt;</code> là thanh tiến trình công việc; <code>&lt;meter&gt;</code> là thanh đo giá trị trong khoảng (pin, điểm số).</p><p>Phân biệt progress và meter: progress trả lời "xong bao nhiêu phần việc" (tải file, học mấy bài); meter trả lời "giá trị này cao hay thấp trong thang đo" (pin 85%, điểm 6.5/10) — meter đổi màu theo vùng low/high/optimum.</p>`,
  syntax: `<details>
  <summary>Câu hỏi bấm để mở</summary>
  <p>Câu trả lời ẩn bên trong.</p>
</details>
<progress value="7" max="16"></progress>
<meter value="0.8" min="0" max="1" low="0.2" high="0.8" optimum="1"></meter>`,
  examples: [
    { t: "details và summary — FAQ đóng/mở", code:
`<details>
  <summary>HTML là gì?</summary>
  <p>HTML là ngôn ngữ đánh dấu siêu văn bản, tạo cấu trúc trang web.</p>
</details>
<details open>
  <summary>Thẻ là gì?</summary>
  <p>Thẻ là đơn vị đánh dấu của HTML. Mục này mở sẵn nhờ thuộc tính open.</p>
</details>`,
      note: "Bấm summary để đóng/mở — hoàn toàn không cần JavaScript. open khiến mục mở sẵn khi tải trang." },
    { t: "dialog — hộp thoại chuẩn", code:
`<button onclick="document.getElementById('hop-thoai').showModal()">Mở hộp thoại</button>
<dialog id="hop-thoai">
  <h3>Xác nhận lưu</h3>
  <p>Bạn có muốn lưu các thay đổi không?</p>
  <button onclick="document.getElementById('hop-thoai').close()">Đóng</button>
</dialog>`,
      note: "showModal() mở hộp thoại có nền mờ (Esc cũng đóng được). dialog cần JavaScript để mở — demo tự cho phép script trong khung này." },
    { t: "progress — thanh tiến trình", code:
`<p>Tiến độ khóa học: 7/16 bài</p>
<progress value="7" max="16">7/16</progress>
<p>Đang tải, chưa rõ tiến độ:</p>
<progress></progress>`,
      note: "value/max cho tiến độ xác định; bỏ value thì thanh chạy vô định (indeterminate). Chữ bên trong là dự phòng." },
    { t: "meter — thanh đo giá trị", code:
`<p>Mức pin:</p>
<meter value="0.85" min="0" max="1" low="0.2" high="0.8" optimum="1">85%</meter>
<p>Điểm thi: 6.5/10</p>
<meter value="6.5" min="0" max="10" low="5" high="8" optimum="10">6.5/10</meter>`,
      note: "meter tự đổi màu theo vùng: dưới low, giữa low–high, trên high, và hướng optimum là hướng tốt (màu tùy trình duyệt)." }
  ],
  mistakes: [
    { bad: `<details>\n  <p>Nội dung ẩn không có tiêu đề.</p>\n</details>`, good: `<details>\n  <summary>Bấm để xem nội dung</summary>\n  <p>Nội dung ẩn có tiêu đề rõ ràng.</p>\n</details>`,
      why: "Thiếu summary thì trình duyệt tự sinh nhãn chung chung và người dùng không biết mục đó nói gì. Luôn viết summary có nghĩa." },
    { bad: `<dialog id="ht">\n  <p>Nội dung hộp thoại.</p>\n</dialog>`, good: `<dialog id="ht">\n  <p>Nội dung hộp thoại.</p>\n  <button onclick="document.getElementById('ht').close()">Đóng</button>\n</dialog>`,
      why: "Hộp thoại không có nút Đóng gây bối rối (dù Esc vẫn đóng được). Luôn cho người dùng một lối ra rõ ràng bằng nút." }
  ],
  tips: [
    "details/summary là cách làm FAQ chuẩn ngữ nghĩa, hoạt động cả khi JavaScript tắt.",
    "dialog.showModal() khác dialog.show(): showModal có nền mờ và chặn tương tác phía sau.",
    "progress cho công việc đang tiến triển; meter cho giá trị đo trong khoảng cố định.",
    "Đặt văn bản dự phòng bên trong progress/meter cho trình duyệt cũ."
  ],
  exercises: [
    { t: "Trang FAQ 3 mục",
      prompt: "Tạo 3 mục details, mỗi mục có summary là câu hỏi và p là câu trả lời; mục thứ hai mở sẵn bằng open.",
      starter: `<details>\n  <summary></summary>\n  <p></p>\n</details>`,
      hints: ["Mỗi cặp details/summary/p là một mục hỏi đáp.", "Viết câu hỏi có nghĩa vào summary, trả lời vào p.", "Mục thứ hai: <details open>."],
      solution: `<details>\n  <summary>Khóa học có miễn phí không?</summary>\n  <p>Có, toàn bộ 16 bài đều miễn phí.</p>\n</details>\n<details open>\n  <summary>Cần cài gì để học?</summary>\n  <p>Chỉ cần trình duyệt và một trình soạn code như VS Code.</p>\n</details>\n<details>\n  <summary>Học xong làm được gì?</summary>\n  <p>Bạn tự viết được trang web HTML hoàn chỉnh.</p>\n</details>`,
      checks: [
        { d: "Có đủ 3 mục details", r: "(<details[\\s\\S]*?){3}" },
        { d: "Có summary chứa câu hỏi", r: "<summary>[^<]+</summary>" },
        { d: "Có mục mở sẵn bằng open", r: "<details[^>]*open" }
      ] },
    { t: "Bảng điều khiển học tập",
      prompt: "Tạo \"dashboard\" gồm: progress thể hiện 5/16 bài, meter thể hiện điểm 8/10, và một dialog có nút mở (showModal) cùng nút đóng.",
      starter: `<p>Tiến độ:</p>\n<p>Điểm trung bình:</p>`,
      hints: ["<progress value=\"5\" max=\"16\"></progress>.", "<meter value=\"8\" min=\"0\" max=\"10\" low=\"5\" high=\"8\" optimum=\"10\"></meter>.", "dialog có id; nút mở gọi document.getElementById('id').showModal(); nút trong dialog gọi .close()."],
      solution: `<p>Tiến độ: <progress value="5" max="16">5/16</progress></p>\n<p>Điểm trung bình: <meter value="8" min="0" max="10" low="5" high="8" optimum="10">8/10</meter></p>\n<button onclick="document.getElementById('tb').showModal()">Xem thông báo</button>\n<dialog id="tb">\n  <p>Bạn đã hoàn thành 5 bài. Tiếp tục phát huy!</p>\n  <button onclick="document.getElementById('tb').close()">Đóng</button>\n</dialog>`,
      checks: [
        { d: "progress có value và max", r: "<progress[^>]*value=\"\\d+\"[^>]*max=\"\\d+\"" },
        { d: "meter có value, min, max", r: "<meter[^>]*value=\"[^\"]+\"[^>]*max=\"[^\"]+\"" },
        { d: "Có dialog với id", r: "<dialog[^>]*id=\"[^\"]+\"" },
        { d: "Có nút gọi showModal", r: "showModal\\(\\)" }
      ] }
  ],
  summary: [
    "details/summary tạo khối đóng/mở sẵn, không cần JavaScript; open để mở sẵn.",
    "dialog là hộp thoại chuẩn: showModal() mở có nền mờ, close() đóng, luôn có nút Đóng.",
    "progress hiển thị tiến độ công việc (value/max); không value = vô định.",
    "meter đo giá trị trong khoảng với low/high/optimum và tự đổi màu theo vùng."
  ]
},
{
  id: 16, part: 3, title: "Accessibility (ARIA), SEO và best practices", minutes: 15,
  goals: [
    "Dùng ARIA cơ bản: aria-label, aria-current, aria-expanded đúng chỗ.",
    "Viết head chuẩn SEO: meta description, Open Graph.",
    "Nhận diện và tránh các lỗi HTML phổ biến nhất."
  ],
  intro: `<p><strong>Accessibility (a11y — khả năng truy cập)</strong> nghĩa là ai cũng dùng được trang, kể cả người dùng trình đọc màn hình hay chỉ dùng bàn phím. Nguyên tắc số một: <em>dùng thẻ ngữ nghĩa đúng trước, ARIA chỉ bổ sung</em> — button thật tốt hơn div gắn role. ARIA (Accessible Rich Internet Applications) là bộ thuộc tính mô tả thêm: <code>aria-label</code> đặt tên, <code>aria-current="page"</code> đánh dấu trang hiện tại, <code>aria-expanded</code> báo trạng thái đóng/mở.</p><p><strong>SEO</strong> giúp Google hiểu và xếp hạng trang: title tốt, <code>meta description</code> hấp dẫn, tiêu đề đúng thứ bậc. <strong>Open Graph</strong> (og:title, og:description, og:image) quyết định thẻ xem trước khi ai đó chia sẻ liên kết lên Facebook/Zalo.</p>`,
  syntax: `<button aria-label="Đóng hộp thoại">✕</button>
<a href="#trang-chu" aria-current="page">Trang chủ</a>
<meta name="description" content="Mô tả trang 150–160 ký tự.">
<meta property="og:title" content="Tên khi chia sẻ">`,
  examples: [
    { t: "ARIA cơ bản trong điều hướng", code:
`<nav aria-label="Điều hướng chính">
  <a href="#trang-chu" aria-current="page">Trang chủ</a> |
  <a href="#bai-viet">Bài viết</a>
</nav>
<p><button aria-expanded="false"
  onclick="this.setAttribute('aria-expanded', this.getAttribute('aria-expanded')==='false')">
  Menu nâng cao
</button></p>
<p><button aria-label="Lưu bài viết vào danh sách yêu thích"
  onclick="this.textContent='Đã lưu'">Lưu</button></p>`,
      note: "aria-current=\"page\" báo \"bạn đang ở đây\"; aria-expanded báo nút đang đóng/mở; aria-label đặt tên đầy đủ cho nút. Bấm thử nút Menu để thấy aria-expanded đổi true/false." },
    { t: "Head chuẩn SEO + Open Graph", code:
`<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Học HTML từ số 0 với 16 bài học tiếng Việt, live code chạy ngay và 160 câu quiz.">
  <title>Học HTML Từ Số 0 — 16 bài học tương tác</title>
  <meta property="og:title" content="Học HTML Từ Số 0">
  <meta property="og:description" content="16 bài học HTML tiếng Việt với live code chạy ngay trong trình duyệt.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://example.com/anh-chia-se.jpg">
</head>`,
      static: true,
      note: "meta không hiển thị trên trang nên khối này ở dạng code tĩnh. description khoảng 150–160 ký tự; og:image phải là URL ảnh tuyệt đối có thật — example.com ở đây chỉ là chỗ giữ chỗ, hãy thay bằng ảnh của bạn khi đăng site." },
    { t: "Checklist truy cập thực hành", code:
`<h1>Tiêu đề duy nhất của trang</h1>
<h2>Mục lớn</h2>
<h3>Mục con của mục lớn</h3>
<img src="anh.svg" alt="Logo HTML màu cam" width="120">
<p><label for="tim">Tìm bài học:</label> <input type="search" id="tim" name="tim"></p>
<button type="button">Nút thật — bấm Tab để focus tới đây</button>`,
      note: "Bấm vào khung kết quả rồi nhấn Tab: focus đi lần lượt qua ô nhập và nút — đó là điều hướng bàn phím. Tiêu đề đúng cấp h1→h2→h3, ảnh có alt, ô nhập có label." }
  ],
  mistakes: [
    { bad: `<div onclick="guiForm()">Gửi</div>`, good: `<button type="button" onclick="guiForm()">Gửi</button>`,
      why: "div không focus được bằng Tab, không đọc là \"nút\" và không kích hoạt bằng Enter/Space. Luôn dùng button thật cho hành động." },
    { bad: `<h1>Tiêu đề trang</h1>\n<h4>Mục nhỏ</h4>`, good: `<h1>Tiêu đề trang</h1>\n<h2>Mục nhỏ</h2>`,
      why: "Nhảy cấp tiêu đề (h1 → h4) phá vỡ cấu trúc tài liệu, người dùng trình đọc màn hình tưởng bị mất mục. Đi từng cấp h1→h2→h3." }
  ],
  tips: [
    "Quy tắc vàng ARIA: thẻ HTML đúng ngữ nghĩa trước, ARIA chỉ khi không có thẻ phù hợp.",
    "Ảnh trang trí: alt=\"\"; ảnh nội dung: alt mô tả; nút icon: aria-label.",
    "Kiểm tra nhanh: rút chuột, chỉ dùng Tab/Enter/Space — mọi chức năng phải với tới được.",
    "Lỗi thường gặp nhất: quên đóng thẻ, lồng sai, thiếu alt, thiếu label, lạm dụng div, nhảy cấp tiêu đề."
  ],
  exercises: [
    { t: "Điều hướng chuẩn ARIA",
      prompt: "Tạo nav có aria-label, chứa liên kết đánh dấu aria-current=\"page\", và một button có aria-label mô tả hành động.",
      starter: `<nav>\n\n</nav>`,
      hints: ["<nav aria-label=\"Điều hướng bài học\">.", "Liên kết hiện tại: <a href=\"#bai-16\" aria-current=\"page\">Bài 16</a>.", "Nút: <button aria-label=\"Lưu bài học\">Lưu</button>."],
      solution: `<nav aria-label="Điều hướng bài học">\n  <a href="#bai-15">Bài 15</a> |\n  <a href="#bai-16" aria-current="page">Bài 16</a>\n</nav>\n<p><button aria-label="Lưu bài học vào danh sách yêu thích">Lưu bài</button></p>`,
      checks: [
        { d: "nav có aria-label", r: "<nav[^>]*aria-label=\"[^\"]+\"" },
        { d: "Có aria-current=\"page\"", r: "aria-current=\"page\"" },
        { d: "button có aria-label", r: "<button[^>]*aria-label=\"[^\"]+\"" }
      ] },
    { t: "Viết head chuẩn SEO",
      prompt: "Hoàn thiện head: thêm meta description (có nội dung), title có chữ, og:title và og:description.",
      starter: `<head>\n  <meta charset="UTF-8">\n  <title></title>\n</head>`,
      hints: ["<meta name=\"description\" content=\"Mô tả trang của bạn...\">.", "Đặt title có nghĩa, dưới 60 ký tự.", "Open Graph: <meta property=\"og:title\" content=\"...\"> và og:description."],
      solution: `<head>\n  <meta charset="UTF-8">\n  <meta name="description" content="Trang giới thiệu dự án học HTML của tôi với các bài học và ví dụ thực hành.">\n  <title>Dự án học HTML của tôi</title>\n  <meta property="og:title" content="Dự án học HTML của tôi">\n  <meta property="og:description" content="Hành trình học HTML từ số 0 với ví dụ thực hành mỗi ngày.">\n</head>`,
      checks: [
        { d: "Có meta description chứa nội dung", r: "<meta[^>]*name=\"description\"[^>]*content=\"[^\"]+\"" },
        { d: "title có chữ", r: "<title>[^<]+</title>" },
        { d: "Có og:title", r: "<meta[^>]*property=\"og:title\"[^>]*content=\"[^\"]+\"" },
        { d: "Có og:description", r: "<meta[^>]*property=\"og:description\"[^>]*content=\"[^\"]+\"" }
      ] }
  ],
  summary: [
    "Ưu tiên thẻ ngữ nghĩa đúng; ARIA (aria-label, aria-current, aria-expanded) chỉ bổ sung khi cần.",
    "button thật thay div onclick; tiêu đề đi từng cấp; ảnh có alt; ô nhập có label.",
    "SEO cơ bản: title tốt + meta description 150–160 ký tự + cấu trúc heading đúng.",
    "Open Graph (og:title, og:description, og:image) điều khiển thẻ xem trước khi chia sẻ.",
    "Test nhanh bằng bàn phím: Tab tới mọi chức năng, Enter/Space kích hoạt được."
  ]
}
];/* ---------- A3. NGÂN HÀNG QUIZ: 16 bài × 10 câu = 160 câu ---------- */
/* Q(câu hỏi, [4 đáp án], chỉ số đáp án đúng, giải thích, code tùy chọn) */
const Q = (q, a, c, e, code) => ({ q, a, c, e, code });
const QUIZ = {
1: [
Q("HTML viết tắt của cụm từ nào?", ["HyperText Markup Language", "HighText Machine Language", "Hyperlink Text Management Language", "Home Tool Markup Language"], 0, "HTML = HyperText Markup Language — ngôn ngữ đánh dấu siêu văn bản."),
Q("HTML là loại ngôn ngữ gì?", ["Ngôn ngữ lập trình", "Ngôn ngữ đánh dấu", "Ngôn ngữ truy vấn cơ sở dữ liệu", "Ngôn ngữ kịch bản phía máy chủ"], 1, "HTML chỉ mô tả cấu trúc bằng thẻ, không tính toán — đó là ngôn ngữ đánh dấu."),
Q("Trình duyệt web làm gì với file HTML?", ["Dịch HTML sang C++ rồi chạy", "Đọc HTML và dựng thành trang hiển thị", "Lưu trữ website lên Internet", "Nén file cho nhẹ hơn"], 1, "Trình duyệt phân tích thẻ HTML và dựng thành giao diện bạn nhìn thấy."),
Q("Trong bộ ba HTML – CSS – JavaScript, HTML đảm nhiệm vai trò gì?", ["Màu sắc và giao diện", "Cấu trúc và nội dung", "Tương tác động", "Lưu trữ dữ liệu người dùng"], 1, "HTML là khung xương và nội dung; CSS trang trí; JavaScript tạo hành vi."),
Q("File trang web thuần HTML nên lưu với đuôi nào?", [".ht", ".html", ".web", ".txt"], 1, "Đuôi .html giúp hệ điều hành và trình duyệt nhận diện đúng loại file."),
Q("Để tiếng Việt hiển thị đúng, nên lưu file HTML với bảng mã nào?", ["ASCII", "UTF-8", "ISO-8859-1", "Windows-1252"], 1, "UTF-8 chứa đầy đủ ký tự tiếng Việt và là bảng mã chuẩn của web hiện đại."),
Q("Thẻ đóng khác thẻ mở ở điểm nào?", ["Có dấu / ngay sau dấu <", "Có dấu ! ở đầu", "Dùng ngoặc vuông", "Phải viết hoa"], 0, "Thẻ đóng có dạng </tên-thẻ> — dấu / là điểm nhận diện."),
Q("Đoạn code sau hiển thị gì?", ["Hai tiêu đề lớn", "Một tiêu đề lớn và một đoạn văn", "Hai đoạn văn thường", "Không hiển thị gì vì thiếu khung"], 1, "h1 là tiêu đề cấp 1, p là đoạn văn; trình duyệt tự bù khung thiếu.", "<h1>Xin chào</h1>\n<p>HTML</p>"),
Q("Công cụ nào phù hợp nhất để soạn code HTML?", ["Photoshop", "VS Code", "Excel", "Paint"], 1, "VS Code là trình soạn code miễn phí, có tô màu và gợi ý thẻ HTML."),
Q("Sau khi sửa file HTML, muốn thấy thay đổi trên trình duyệt thì làm gì?", ["Chỉ cần sửa, trang tự đổi", "Lưu file rồi tải lại trang (F5)", "Khởi động lại máy tính", "Xóa toàn bộ lịch sử duyệt web"], 1, "Trình duyệt chỉ đọc lại file khi tải lại — phải lưu (Ctrl+S) rồi F5.")
],
2: [
Q("Dòng <!DOCTYPE html> ở đầu file dùng để làm gì?", ["Khai báo tài liệu là HTML5", "Đặt tiêu đề trang", "Nạp file CSS", "Khai báo ngôn ngữ tiếng Việt"], 0, "DOCTYPE nói với trình duyệt: hãy xử lý tài liệu này theo chuẩn HTML5."),
Q("Thuộc tính lang=\"vi\" trong thẻ html cho biết điều gì?", ["Trang chỉ mở được ở Việt Nam", "Ngôn ngữ chính của nội dung là tiếng Việt", "Bàn phím gõ tiếng Việt", "Múi giờ của trang"], 1, "lang giúp trình đọc màn hình phát âm đúng và công cụ dịch nhận diện ngôn ngữ."),
Q("Thẻ meta charset=\"UTF-8\" nằm ở đâu trong tài liệu?", ["Trong body", "Trong head", "Trong footer", "Trong title"], 1, "meta charset là cấu hình nên thuộc head — phần không hiển thị."),
Q("meta name=\"viewport\" giúp ích gì?", ["Tăng tốc độ mạng", "Hiển thị đúng tỉ lệ trên thiết bị di động", "Đổi màu nền trang", "Chặn người dùng phóng to"], 1, "viewport khai báo bề rộng khung nhìn theo thiết bị, nền tảng của responsive."),
Q("Thẻ nào sau đây là thẻ rỗng (không cần đóng)?", ["p", "br", "div", "strong"], 1, "br không có nội dung nên là thẻ rỗng; p, div, strong đều cần thẻ đóng."),
Q("Cách lồng thẻ nào sau đây là ĐÚNG?", ["<p><em>a</p></em>", "<p><em>a</em></p>", "<em><p>a</em></p>", "<p><em>a</p>"], 1, "Mở trước đóng sau: em mở trong p thì phải đóng trước p.", null),
Q("Thuộc tính của thẻ được viết ở đâu?", ["Trong thẻ đóng", "Giữa thẻ mở và thẻ đóng", "Trong thẻ mở", "Ngoài thẻ, trên dòng riêng"], 2, "Thuộc tính luôn nằm trong thẻ mở, dạng tên=\"giá trị\"."),
Q("Chú thích (comment) trong HTML viết theo cú pháp nào?", ["// nội dung", "<!-- nội dung -->", "/* nội dung */", "# nội dung"], 1, "HTML dùng <!-- ... -->; các kiểu còn lại là của JavaScript/CSS/ngôn ngữ khác."),
Q("Muốn hiển thị dấu < trong nội dung trang, phải viết gì?", ["&lt;", "&gt;", "&amp;", "&quot;"], 0, "&lt; là entity của dấu < (less than), tránh bị hiểu là thẻ mở."),
Q("Đoạn code sau hiển thị ra chữ gì?", ["5 < 6", "5 &lt; 6", "5 > 6", "Báo lỗi cú pháp"], 0, "&lt; được trình duyệt dịch thành dấu < khi hiển thị.", "<p>5 &lt; 6</p>")
],
3: [
Q("Thẻ tiêu đề nào có cấp lớn nhất?", ["h6", "h1", "h0", "heading"], 1, "h1 là tiêu đề cấp 1 — lớn nhất; h6 nhỏ nhất."),
Q("Mỗi trang nên có mấy thẻ h1?", ["Tùy ý, càng nhiều càng tốt", "Một", "Hai", "Sáu"], 1, "Một h1 duy nhất cho chủ đề chính của trang, tốt cho SEO và truy cập."),
Q("Thẻ nào vừa in đậm vừa mang ngữ nghĩa \"quan trọng\"?", ["b", "strong", "mark", "bold"], 1, "strong báo nội dung quan trọng; b chỉ in đậm thuần túy không ngữ nghĩa."),
Q("Thẻ em dùng khi nào?", ["Khi cần chữ nhỏ", "Khi muốn nhấn mạnh ngữ điệu", "Khi viết chỉ số dưới", "Khi trích dẫn dài"], 1, "em nhấn mạnh (emphasis), trình đọc màn hình đổi ngữ điệu khi đọc."),
Q("Muốn tô sáng nền vàng một từ khóa, dùng thẻ nào?", ["mark", "highlight", "small", "sup"], 0, "mark tô nền vàng cho nội dung cần chú ý, như từ khóa tìm kiếm."),
Q("Trong công thức H₂O, số 2 được đặt trong thẻ nào?", ["sup", "sub", "small", "down"], 1, "sub viết chỉ số dưới (subscript); sup viết chỉ số trên."),
Q("Thẻ nào giữ nguyên khoảng trắng và xuống dòng đúng như trong code?", ["p", "pre", "code", "blockquote"], 1, "pre (preformatted) giữ nguyên mọi khoảng trắng, xuống dòng."),
Q("Thẻ nào trích dẫn ngắn trong dòng và tự thêm ngoặc kép?", ["blockquote", "q", "cite", "quote"], 1, "q (quote) cho trích dẫn ngắn trong dòng; blockquote cho khối dài."),
Q("Đoạn code sau hiển thị thế nào?", ["H2O và m2 (chữ thường)", "H₂O và m² (chỉ số dưới và trên)", "H2O và m2 đều chỉ số dưới", "Báo lỗi vì thiếu thẻ đóng"], 1, "sub hạ số 2 xuống dưới, sup nâng số 2 lên trên.", "H<sub>2</sub>O và m<sup>2</sup>"),
Q("Thẻ abbr cần thuộc tính nào để giải thích nghĩa đầy đủ khi di chuột?", ["alt", "title", "mean", "desc"], 1, "title của abbr chứa dạng đầy đủ, hiện khi di chuột vào chữ viết tắt.")
],
4: [
Q("Danh sách gạch đầu dòng (không thứ tự) dùng thẻ nào?", ["ol", "ul", "li", "dl"], 1, "ul = unordered list — danh sách không thứ tự."),
Q("Danh sách đánh số thứ tự dùng thẻ nào?", ["ul", "ol", "dl", "list"], 1, "ol = ordered list — danh sách có thứ tự, tự đánh số."),
Q("Con trực tiếp của ul hoặc ol bắt buộc phải là thẻ gì?", ["p", "li", "div", "ul"], 1, "Chỉ li mới được là con trực tiếp của ul/ol; nội dung khác phải nằm trong li."),
Q("ol type=\"A\" đánh số theo kiểu nào?", ["Số 1, 2, 3", "Chữ hoa A, B, C", "La Mã thường i, ii, iii", "Không đánh số"], 1, "type=\"A\" dùng chữ cái hoa; \"a\" chữ thường, \"I\"/\"i\" La Mã, \"1\" số."),
Q("Thuộc tính start=\"5\" trên ol có nghĩa gì?", ["Bỏ qua 5 mục đầu", "Đánh số bắt đầu từ 5", "Chỉ hiển thị 5 mục", "Đếm ngược từ 5"], 1, "start đặt giá trị bắt đầu của bộ đếm — mục đầu sẽ là 5 (hoặc E nếu type A)."),
Q("Thuộc tính reversed trên ol làm gì?", ["Đảo ngược chữ trong mục", "Đánh số giảm dần", "Đảo màu nền", "Ẩn số thứ tự"], 1, "reversed khiến bộ đếm chạy lùi: mục đầu mang số lớn nhất."),
Q("Danh sách con lồng trong danh sách cha phải đặt ở đâu?", ["Giữa hai li của cha", "Bên trong li của mục cha", "Bên ngoài ul cha", "Trong thẻ caption"], 1, "ul/ol con phải nằm trong li của mục cha để giữ đúng cấu trúc."),
Q("Bộ thẻ dl/dt/dd dùng để tạo gì?", ["Danh sách đánh số", "Danh sách thuật ngữ và mô tả", "Bảng dữ liệu", "Nhóm liên kết"], 1, "dl là danh sách mô tả: dt là thuật ngữ, dd là phần giải thích."),
Q("Đoạn code sau đánh số các mục thế nào?", ["1, 2", "ii, iii", "i, ii", "A, B"], 1, "type=\"i\" là La Mã thường, start=\"2\" bắt đầu từ ii → ii, iii.", "<ol type=\"i\" start=\"2\">\n  <li>A</li>\n  <li>B</li>\n</ol>"),
Q("Thẻ nào KHÔNG thuộc nhóm thẻ danh sách?", ["ul", "ol", "dl", "table"], 3, "table là thẻ bảng dữ liệu, không phải danh sách.")
],
5: [
Q("Thuộc tính nào của thẻ a chỉ địa chỉ đích của liên kết?", ["src", "href", "link", "to"], 1, "href (hypertext reference) chứa URL hoặc đích mà liên kết trỏ tới."),
Q("Đâu là đường dẫn tuyệt đối?", ["bai-2.html", "../anh/logo.png", "https://developer.mozilla.org/vi/", "#dau-trang"], 2, "Đường dẫn tuyệt đối đầy đủ từ giao thức https://; còn lại là tương đối hoặc neo."),
Q("target=\"_blank\" trên liên kết có tác dụng gì?", ["Mở trang trống", "Mở liên kết trong tab mới", "Tải file về máy", "Ẩn liên kết"], 1, "_blank yêu cầu mở đích trong tab (hoặc cửa sổ) mới."),
Q("Khi dùng target=\"_blank\", nên thêm thuộc tính nào để an toàn?", ["rel=\"noopener\"", "rel=\"stylesheet\"", "alt=\"tab mới\"", "type=\"blank\""], 0, "rel=\"noopener\" chặn tab mới truy ngược window.opener của trang gốc."),
Q("Liên kết href=\"#mucluc\" sẽ nhảy tới đâu?", ["Trang tên mucluc", "Phần tử có id=\"mucluc\" trong trang", "Luôn về đầu trang", "File #mucluc trên máy"], 1, "Href bắt đầu bằng # là liên kết neo, tìm id tương ứng trong cùng trang."),
Q("Liên kết mailto:hotro@example.com dùng để làm gì?", ["Gọi điện thoại", "Mở ứng dụng email để gửi thư", "Tải file đính kèm", "Mở bản đồ"], 1, "mailto: mở trình soạn email với địa chỉ nhận điền sẵn."),
Q("Trên điện thoại, bấm liên kết tel:+842412345678 sẽ thế nào?", ["Gửi tin nhắn SMS", "Mở ứng dụng gọi với số điền sẵn", "Lưu vào danh bạ", "Mở trang web"], 1, "tel: kích hoạt ứng dụng gọi điện với số cho trước."),
Q("Thuộc tính download trên thẻ a có tác dụng gì?", ["Mở file ngay trong trình duyệt", "Tải file về với tên gợi ý", "Xóa file sau khi xem", "Nén file trước khi mở"], 1, "download buộc tải về; giá trị của nó là tên file gợi ý khi lưu."),
Q("Liên kết href=\"www.google.com\" (thiếu https://) bị trình duyệt hiểu là gì?", ["Đường dẫn tuyệt đối", "Đường dẫn tương đối", "Liên kết neo", "Địa chỉ email"], 1, "Không có giao thức thì đây là đường dẫn tương đối — trình duyệt tìm file www.google.com cạnh trang hiện tại."),
Q("Để liên kết này hoạt động, trang cần có gì?", ["Phần tử có name=\"cuoi\"", "Phần tử có id=\"cuoi\"", "Phần tử có class=\"cuoi\"", "Thẻ <cuoi>"], 1, "Liên kết neo #cuoi tìm phần tử mang id=\"cuoi\".", "<a href=\"#cuoi\">Xuống cuối</a>")
],
6: [
Q("Thuộc tính alt của img dùng để làm gì?", ["Hiện chú thích dưới ảnh", "Mô tả thay thế khi ảnh lỗi và cho trình đọc màn hình", "Đặt tên file ảnh", "Đặt tiêu đề tab"], 1, "alt là văn bản thay thế: hiện khi ảnh hỏng và được trình đọc màn hình đọc."),
Q("loading=\"lazy\" trên img có nghĩa gì?", ["Ảnh tải chậm vĩnh viễn", "Hoãn tải ảnh đến khi sắp cuộn tới", "Tải ảnh trước tiên", "Không bao giờ tải ảnh"], 1, "lazy loading chỉ tải ảnh khi gần khung nhìn, giúp trang dài mở nhanh hơn."),
Q("Khai báo width và height cho img giúp gì?", ["Tăng độ nét của ảnh", "Giữ chỗ trước, tránh nhảy bố cục", "Nén ảnh nhẹ hơn", "Đổi định dạng ảnh"], 1, "Trình duyệt dành sẵn chỗ theo tỉ lệ khai báo, ảnh tải xong không đẩy nội dung khác."),
Q("Thẻ nào là chú thích chính thức của ảnh trong figure?", ["caption", "figcaption", "alt", "title"], 1, "figcaption là chú thích của figure; caption dùng cho bảng."),
Q("picture và srcset dùng khi nào?", ["Khi muốn ảnh luôn tải nhanh nhất", "Khi cần chọn phiên bản ảnh theo điều kiện màn hình", "Khi tạo ảnh động", "Khi vẽ đồ họa vector"], 1, "picture/source/srcset chọn ảnh phù hợp kích thước, độ phân giải màn hình."),
Q("Định dạng ảnh nào là vector, phóng to không vỡ nét?", ["JPG", "PNG", "WebP", "SVG"], 3, "SVG lưu hình bằng công thức vector nên sắc nét ở mọi kích thước."),
Q("Ảnh chụp nhiều màu, ưu tiên nhẹ, nên chọn định dạng nào?", ["JPG hoặc WebP", "SVG", "BMP", "GIF"], 0, "JPG và WebP nén tốt ảnh chụp; WebP thường nhẹ hơn JPG cùng chất lượng."),
Q("Thẻ img có cần thẻ đóng không?", ["Có, bắt buộc </img>", "Không, img là thẻ rỗng", "Tùy trình duyệt", "Chỉ cần khi có alt"], 1, "img không chứa nội dung nên là thẻ rỗng, không có thẻ đóng."),
Q("Đoạn code này có ý nghĩa gì?", ["Lỗi vì alt rỗng", "Ảnh trang trí, trình đọc màn hình sẽ bỏ qua", "alt sẽ tự sinh nội dung", "Ảnh không hiển thị"], 1, "alt=\"\" (rỗng có chủ đích) báo ảnh chỉ trang trí, không mang thông tin.", "<img src=\"hoa-van.png\" alt=\"\">"),
Q("Trong picture, thẻ nào là phương án dự phòng bắt buộc phải có?", ["source", "img", "fallback", "noscript"], 1, "img cuối cùng trong picture là ảnh mặc định khi không source nào khớp.")
],
7: [
Q("Phần tử block có đặc điểm gì?", ["Chỉ chiếm vừa nội dung", "Chiếm trọn một dòng, tự xuống dòng", "Luôn ẩn khỏi trang", "Không chứa được phần tử khác"], 1, "Block như p, div chiếm cả dòng và bắt đầu trên dòng mới."),
Q("Thẻ nào sau đây là phần tử inline?", ["div", "p", "span", "section"], 2, "span chỉ chiếm vừa nội dung và đứng cạnh phần tử khác trên cùng dòng."),
Q("Khi nào nên dùng div?", ["Bắt buộc dùng cho mọi khối", "Khi cần khối chứa trung tính, không có thẻ ngữ nghĩa phù hợp", "Khi tạo tiêu đề", "Khi tạo liên kết"], 1, "div là hộp chứa đa năng — chỉ dùng khi các thẻ ngữ nghĩa không diễn tả đúng vai trò."),
Q("id và class khác nhau thế nào?", ["Hoàn toàn giống nhau", "id là duy nhất, class dùng lại cho nhiều phần tử", "class là duy nhất, id dùng lại", "id cho CSS, class cho JavaScript"], 1, "Mỗi id chỉ xuất hiện một lần; class gắn được cho nhiều phần tử để gom nhóm."),
Q("Thuộc tính data-* dùng để làm gì?", ["Trang trí phần tử", "Lưu dữ liệu riêng gắn với phần tử cho JavaScript", "Khai báo CSS", "Tạo liên kết neo"], 1, "data-* là kho dữ liệu tùy ý (data-id, data-bai…) không ảnh hưởng hiển thị."),
Q("Chú thích của thuộc tính title hiển thị khi nào?", ["Luôn hiển thị cạnh phần tử", "Khi di chuột vào phần tử", "Khi bấm vào phần tử", "Khi trang vừa tải xong"], 1, "title hiện tooltip nhỏ khi con trỏ dừng trên phần tử."),
Q("Mỗi trang được có tối đa mấy thẻ main?", ["Một", "Hai", "Không giới hạn", "Không thẻ nào"], 0, "main chứa nội dung chính duy nhất của trang — chỉ một thẻ mỗi trang."),
Q("Thẻ ngữ nghĩa nào phù hợp cho một bài báo độc lập?", ["section", "article", "aside", "div"], 1, "article cho nội dung tự đứng vững: bài báo, tin, bình luận có thể tách đăng nơi khác."),
Q("Đoạn code này có vấn đề gì?", ["Hoàn toàn hợp lệ", "span là inline nên không nên chứa block như p", "Thiếu thuộc tính alt", "Thẻ p không được tồn tại"], 1, "Inline không nên chứa block; trình duyệt sẽ tự tách ngầm gây bố cục khó lường.", "<span><p>Đoạn văn</p></span>"),
Q("aside thường chứa loại nội dung nào?", ["Nội dung chính của trang", "Nội dung phụ: sidebar, ghi chú bên lề", "Tiêu đề trang", "Bảng dữ liệu chính"], 1, "aside cho nội dung liên quan gián tiếp, tách khỏi mạch chính vẫn hiểu được trang.")
],
8: [
Q("Thẻ nào tạo một hàng trong bảng?", ["td", "tr", "th", "row"], 1, "tr = table row, chứa các ô th/td của một hàng."),
Q("Ô tiêu đề của bảng dùng thẻ nào?", ["td", "th", "head", "caption"], 1, "th = table header cell, mang ngữ nghĩa tiêu đề và in đậm, căn giữa mặc định."),
Q("caption phải đặt ở vị trí nào trong table?", ["Cuối bảng", "Ngay sau thẻ mở table", "Bên trong một tr", "Bên ngoài table"], 1, "caption là con đầu tiên của table, đặt tên cho toàn bảng."),
Q("thead dùng để nhóm gì?", ["Các hàng dữ liệu chính", "Các hàng tiêu đề", "Các hàng tổng kết", "Các chú thích ảnh"], 1, "thead bao các hàng tiêu đề cột, thường chứa th."),
Q("tfoot thường chứa nội dung gì?", ["Tiêu đề cột", "Hàng tổng kết, cộng dồn", "Ảnh minh họa", "Danh sách liên kết"], 1, "tfoot là vùng tổng kết cuối bảng: tổng điểm, trung bình, số lượng."),
Q("Bảng HTML nên dùng cho mục đích gì?", ["Dàn bố cục toàn trang", "Hiển thị dữ liệu dạng lưới", "Tạo menu điều hướng", "Trang trí nền"], 1, "Bảng chỉ dành cho dữ liệu quan hệ hàng–cột; bố cục trang là việc của CSS."),
Q("Ô th mặc định hiển thị thế nào?", ["Chữ thường, căn trái", "In đậm và căn giữa", "In nghiêng", "Gạch chân"], 1, "Trình duyệt mặc định in đậm và căn giữa ô th để phân biệt với td."),
Q("Đoạn code này sai ở đâu?", ["Thiếu tbody", "td phải nằm trong hàng tr", "Thẻ table viết sai", "Không có lỗi"], 1, "Ô td/th không được đứng trực tiếp trong table — phải bọc trong tr.", "<table><td>1</td></table>"),
Q("Thứ tự chuẩn các thành phần trong table là gì?", ["thead → caption → tbody → tfoot", "caption → thead → tbody → tfoot", "tbody → thead → caption → tfoot", "Thứ tự nào cũng như nhau"], 1, "caption đứng đầu, rồi thead, tbody, tfoot — đúng ngữ nghĩa và dễ đọc."),
Q("Ô dữ liệu thường trong bảng dùng thẻ nào?", ["th", "td", "tr", "cell"], 1, "td = table data cell, ô dữ liệu thông thường của bảng.")
],9: [
Q("colspan=\"2\" trên một ô có nghĩa gì?", ["Ô trải dọc 2 hàng", "Ô trải ngang 2 cột", "Ô có 2 màu nền", "Ô chứa 2 thẻ con"], 1, "colspan gộp ô theo chiều ngang — ô chiếm chỗ của 2 cột."),
Q("rowspan=\"3\" trên một ô có nghĩa gì?", ["Ô trải dọc 3 hàng", "Ô trải ngang 3 cột", "Ô lặp lại 3 lần", "Ẩn 3 hàng sau"], 0, "rowspan gộp ô theo chiều dọc — ô chiếm chỗ của 3 hàng."),
Q("scope=\"col\" trên thẻ th khai báo điều gì?", ["Đây là tiêu đề của hàng", "Đây là tiêu đề của cột", "Cột có màu riêng", "Cột bị khóa"], 1, "scope=\"col\" nói với trình đọc màn hình: th này là tiêu đề cho cả cột."),
Q("scope=\"row\" trên thẻ th khai báo điều gì?", ["Đây là tiêu đề của hàng", "Đây là tiêu đề của cột", "Hàng bị ẩn", "Hàng tổng kết"], 0, "scope=\"row\" đánh dấu th là tiêu đề của hàng chứa nó."),
Q("Bảng có 2 cột nhưng một hàng dùng colspan=\"3\" thì sao?", ["Trình duyệt tự thêm cột cho đủ", "Ô thò ra ngoài, bảng bị lệch/vỡ", "Không có vấn đề gì", "colspan tự giảm về 2"], 0, "Số cột gộp vượt số cột thật làm hàng dài hơn các hàng khác — bảng lệch."),
Q("Hàng đứng sau một ô rowspan=\"2\" phải viết thế nào?", ["Thêm một ô cho đủ", "Bớt đi một ô vì đã bị chiếm chỗ", "Giữ nguyên số ô", "Xóa cả hàng"], 1, "Ô rowspan chiếm mất một chỗ của hàng sau — hàng đó phải viết ít hơn một ô."),
Q("Bộ đôi tối thiểu giúp bảng dễ truy cập là gì?", ["div và span", "caption và th có scope", "border và cellpadding", "thead và màu nền"], 1, "caption cho tên bảng, th scope cho biết tiêu đề hàng/cột — trình đọc màn hình đọc đúng ngữ cảnh."),
Q("Trong bảng này, ô C nằm ở vị trí nào?", ["Hàng 2, cột 1", "Hàng 2, cột 2", "Hàng 3, cột 1", "Bảng báo lỗi"], 1, "Ô A chiếm cột 1 của cả hai hàng, nên C đẩy sang cột 2 của hàng 2.", "<tr><td rowspan=\"2\">A</td><td>B</td></tr>\n<tr><td>C</td></tr>"),
Q("Tên môn học làm tiêu đề cho mỗi hàng nên viết bằng gì?", ["td thường", "th scope=\"row\"", "th scope=\"col\"", "thẻ b"], 1, "Tiêu đề hàng dùng th scope=\"row\" để máy hiểu quan hệ với các ô dữ liệu cùng hàng."),
Q("Khi nào nên dùng colspan/rowspan?", ["Để trang trí cho đẹp", "Khi dữ liệu thật sự có quan hệ nhóm", "Luôn luôn dùng cho mọi bảng", "Để giảm số chữ phải gõ"], 1, "Gộp ô chỉ dành cho quan hệ nhóm thật của dữ liệu, không phải công cụ trang trí.")
],
10: [
Q("Thuộc tính action của form chỉ điều gì?", ["Cách gửi dữ liệu", "Địa chỉ nhận dữ liệu khi gửi", "Kiểu ô nhập", "Màu của nút gửi"], 1, "action là URL sẽ xử lý dữ liệu biểu mẫu gửi lên."),
Q("Phương thức GET gửi dữ liệu ở đâu?", ["Trong thân (body) yêu cầu", "Lộ trên URL dạng ?tên=giá trị", "Trong cookie", "Trong localStorage"], 1, "GET đính dữ liệu vào URL — tiện chia sẻ nhưng không hợp dữ liệu nhạy cảm."),
Q("Phương thức POST phù hợp nhất cho gì?", ["Ô tìm kiếm công khai", "Mật khẩu và thông tin cá nhân", "Liên kết neo", "Bookmark trang"], 1, "POST gửi dữ liệu ngầm trong thân yêu cầu, không lộ trên URL."),
Q("label for=\"email\" sẽ gắn với ô nhập nào?", ["input có name=\"email\"", "input có id=\"email\"", "Thẻ <email>", "input có class=\"email\""], 1, "for của label trỏ đúng id của ô nhập — bấm label là focus vào ô."),
Q("Kiểu input nào che ký tự bằng dấu chấm?", ["text", "password", "hidden", "secret"], 1, "type=\"password\" ẩn ký tự đang gõ; hidden còn không hiển thị ô."),
Q("type=\"email\" tự kiểm tra gì khi bấm Gửi?", ["Độ dài mật khẩu", "Định dạng có @ hợp lệ", "Tên miền có tồn tại không", "Email đã đăng ký chưa"], 1, "Trình duyệt kiểm tra cấu trúc email (có @) ngay phía client, không kiểm tra hộp thư thật."),
Q("Muốn một nhóm radio chỉ chọn được một, các radio phải thế nào?", ["Cùng id", "Cùng name", "Cùng value", "Cùng class"], 1, "Radio cùng name thuộc một nhóm — chọn cái này thì bỏ cái kia."),
Q("checkbox cho phép người dùng làm gì?", ["Chỉ chọn một", "Chọn nhiều phương án", "Không chọn được gì", "Chỉ đọc nội dung"], 1, "Mỗi checkbox độc lập — tick được nhiều ô cùng lúc."),
Q("input type=\"hidden\" dùng để làm gì?", ["Ẩn toàn bộ form", "Gửi kèm dữ liệu ngầm không hiển thị", "Nhập mật khẩu", "Xóa ô nhập khác"], 1, "hidden vẫn gửi name=value khi submit nhưng người dùng không thấy ô."),
Q("Ô nhập thiếu thuộc tính nào thì dữ liệu KHÔNG được gửi khi submit?", ["id", "name", "class", "title"], 1, "name là tên kiện dữ liệu — thiếu name thì giá trị ô bị bỏ khỏi gói gửi đi.")
],
11: [
Q("textarea khác input type=\"text\" ở điểm nào?", ["Cho nhập nhiều dòng", "Tự kiểm tra email", "Chỉ nhập số", "Che ký tự"], 0, "textarea là ô nhập văn bản nhiều dòng, có rows/cols và kéo giãn được."),
Q("Nội dung mặc định của textarea viết ở đâu?", ["Trong thuộc tính value", "Giữa thẻ mở và thẻ đóng", "Trong placeholder", "Trong alt"], 1, "textarea không có value — nội dung nằm giữa <textarea> và </textarea>."),
Q("optgroup trong select dùng để làm gì?", ["Cho chọn nhiều mục", "Nhóm các option dưới một nhãn", "Tạo ô nhập mới", "Tự sắp xếp option"], 1, "optgroup nhóm lựa chọn liên quan, label là tên nhóm (không chọn được)."),
Q("datalist khác select ở điểm nào?", ["Bắt buộc chọn trong danh sách", "Vẫn cho nhập giá trị tự do ngoài gợi ý", "Không có gợi ý", "Chỉ nhập số"], 1, "datalist chỉ gợi ý — người dùng gõ giá trị bất kỳ; select thì bắt buộc chọn mục có sẵn."),
Q("input nối với datalist bằng cách nào?", ["Thuộc tính for trỏ id datalist", "Thuộc tính list trỏ id datalist", "Thuộc tính name trùng nhau", "Thuộc tính src"], 1, "input list=\"id-của-datalist\" tạo liên kết gợi ý."),
Q("Trong form, button không ghi type thì mặc định là gì?", ["button", "submit", "reset", "menu"], 1, "Mặc định của button trong form là submit — dễ gây gửi form ngoài ý muốn."),
Q("button type=\"reset\" làm gì?", ["Xóa sạch mọi ô vĩnh viễn", "Đưa các ô về giá trị ban đầu", "Gửi form đi", "Tải lại trang"], 1, "reset khôi phục giá trị mặc định lúc trang tải — không phải xóa trắng."),
Q("legend là tiêu đề của thẻ nào?", ["table", "fieldset", "select", "figure"], 1, "legend đặt tên nhóm cho fieldset, nằm trên đường viền nhóm."),
Q("Chọn Phở trong select này rồi gửi form thì dữ liệu gì được gửi?", ["mon=Phở", "mon=pho", "pho=mon", "Không gửi gì"], 1, "Giá trị gửi là value của option (pho), không phải chữ hiển thị (Phở).", "<select name=\"mon\">\n  <option value=\"pho\">Phở</option>\n</select>"),
Q("option không có value thì giá trị gửi đi là gì?", ["Chuỗi rỗng", "Chính chữ bên trong option", "Số thứ tự của option", "Gây lỗi form"], 1, "Thiếu value thì trình duyệt lấy nội dung chữ của option làm giá trị gửi.")
],
12: [
Q("Thuộc tính required trên ô nhập có nghĩa gì?", ["Ô chỉ đọc", "Bắt buộc nhập/chọn trước khi gửi", "Tự động điền", "Ô bị ẩn"], 1, "required khiến trình duyệt chặn gửi và báo lỗi nếu ô bị bỏ trống."),
Q("minlength=\"6\" được kiểm tra khi nào?", ["Cả khi ô để trống", "Khi người dùng có nhập và gửi form", "Ngay mỗi phím gõ", "Không bao giờ kiểm tra"], 1, "minlength chỉ áp dụng khi có nội dung; ô trống muốn bắt buộc thì cần thêm required."),
Q("min và max dùng được cho các type nào?", ["text và password", "number, date, range", "email và url", "checkbox và radio"], 1, "min/max ràng buộc giá trị số, ngày tháng, thanh kéo — không áp dụng cho ô chữ."),
Q("pattern=\"0[0-9]{9}\" yêu cầu giá trị thế nào?", ["10 chữ số bất kỳ", "Bắt đầu bằng 0 rồi đúng 9 chữ số", "Đúng 9 chữ số", "Chữ gì cũng được"], 1, "Regex: ký tự 0 đứng đầu, [0-9]{9} là đúng 9 chữ số tiếp theo — tổng 10 số."),
Q("placeholder có thay thế được label không?", ["Có, hoàn toàn", "Không — chỉ là gợi ý mờ, mất khi gõ", "Tùy trình duyệt", "Chỉ trên điện thoại"], 1, "placeholder biến mất khi nhập và không đủ cho truy cập — luôn cần label thật."),
Q("autocomplete=\"email\" giúp ích gì?", ["Tự gửi email", "Trình duyệt gợi ý điền email đã lưu", "Kiểm tra dấu @", "Ẩn ô email"], 1, "autocomplete đúng chuẩn giúp trình duyệt đề xuất thông tin người dùng đã lưu."),
Q("disabled khác readonly ở điểm then chốt nào?", ["Hoàn toàn giống nhau", "disabled KHÔNG gửi dữ liệu, readonly vẫn gửi", "readonly không gửi, disabled vẫn gửi", "Cả hai đều không gửi"], 1, "Ô disabled bị loại khỏi dữ liệu gửi đi; ô readonly vẫn gửi giá trị bình thường."),
Q("Ô có readonly khi submit form thì giá trị của nó thế nào?", ["Vẫn được gửi đi", "Không được gửi", "Tùy loại type", "Chỉ gửi khi có required"], 0, "readonly chỉ ngăn sửa — giá trị vẫn nằm trong gói dữ liệu gửi."),
Q("Bấm Gửi với ô này thì điều gì xảy ra?", ["Gửi bình thường", "Bị chặn, báo giá trị nhỏ hơn min=18", "Tự sửa thành 18", "Tự xóa giá trị"], 1, "15 < min=18 nên trình duyệt chặn submit và hiện thông báo ràng buộc.", "<input type=\"number\" min=\"18\" value=\"15\">"),
Q("select có required cần gì để trạng thái \"chưa chọn\" bị coi là thiếu?", ["Option đầu tiên bất kỳ", "Một option value=\"\" làm mốc chưa chọn", "Thuộc tính selected", "Thuộc tính disabled"], 1, "Option value=\"\" là giá trị rỗng — required sẽ chặn nếu người dùng để nguyên mục này.")
],
13: [
Q("Thuộc tính controls trên audio/video làm gì?", ["Tự động phát", "Hiện thanh điều khiển phát/tạm dừng/âm lượng", "Tắt tiếng", "Lặp lại bài"], 1, "controls hiện bộ điều khiển chuẩn của trình duyệt cho người dùng thao tác."),
Q("Muốn autoplay hoạt động trên trình duyệt hiện nay, thường phải kèm gì?", ["loop", "muted", "controls", "poster"], 1, "Chính sách chống làm phiền: chỉ cho tự phát khi tắt tiếng (muted)."),
Q("loop trên audio/video có tác dụng gì?", ["Phát đúng một lần", "Phát lại từ đầu khi kết thúc", "Tua nhanh gấp đôi", "Tải chậm lại"], 1, "loop khiến media quay vòng liên tục không dừng."),
Q("poster của video là gì?", ["Dòng phụ đề", "Ảnh bìa hiện trước khi phát", "Âm thanh nền", "Tiêu đề video"], 1, "poster là ảnh đại diện hiển thị khi video chưa phát."),
Q("Nhiều thẻ source trong audio/video dùng để làm gì?", ["Tăng âm lượng", "Khai báo nhiều định dạng cho trình duyệt chọn", "Thêm phụ đề", "Chèn quảng cáo"], 1, "Trình duyệt chọn source đầu tiên với định dạng nó hỗ trợ."),
Q("Thẻ track dùng để thêm gì cho video?", ["Nhạc nền", "Phụ đề / chú thích theo thời gian", "Khả năng tua", "Quảng cáo đầu video"], 1, "track nạp file .vtt chứa phụ đề, chú thích hoặc chương."),
Q("Thuộc tính nào của track chỉ ngôn ngữ phụ đề?", ["lang", "srclang", "language", "hreflang"], 1, "srclang (source language) khai báo mã ngôn ngữ của file phụ đề, ví dụ vi."),
Q("kind=\"subtitles\" trên track nghĩa là gì?", ["Danh sách chương", "Phụ đề lời thoại", "Mô tả âm thanh", "Siêu dữ liệu"], 1, "subtitles là phụ đề lời thoại; kind khác: captions, chapters, descriptions, metadata."),
Q("Video này không tự phát, vì sao?", ["File chắc chắn hỏng", "Thiếu muted nên autoplay bị trình duyệt chặn", "Thiếu loop", "Thiếu poster"], 1, "Autoplay có tiếng bị chặn theo chính sách — thêm muted hoặc để người dùng tự bấm phát.", "<video autoplay src=\"a.mp4\"></video>"),
Q("Văn bản đặt bên trong audio/video hiển thị khi nào?", ["Luôn luôn hiện", "Khi trình duyệt không hỗ trợ thẻ đó", "Khi tắt tiếng", "Khi phát hết file"], 1, "Đó là nội dung dự phòng (fallback) cho trình duyệt quá cũ không hiểu thẻ.")
],
14: [
Q("iframe dùng để làm gì?", ["Tạo bảng dữ liệu", "Nhúng một trang web khác vào trang hiện tại", "Vẽ đồ họa vector", "Tạo biểu mẫu"], 1, "iframe mở một khung chứa tài liệu HTML độc lập bên trong trang."),
Q("srcdoc của iframe chứa gì?", ["Một URL", "HTML viết thẳng trong thuộc tính", "Đường dẫn file CSS", "Tên khung"], 1, "srcdoc nhận mã HTML trực tiếp thay vì phải nạp từ URL."),
Q("Để dễ truy cập, iframe bắt buộc nên có thuộc tính gì?", ["name", "title", "alt", "aria-hidden"], 1, "title mô tả nội dung khung cho trình đọc màn hình quyết định có duyệt vào không."),
Q("URL nhúng video YouTube đúng chuẩn là dạng nào?", ["youtube.com/watch?v=ID", "youtube-nocookie.com/embed/ID", "youtu.be/ID", "youtube.com/video/ID"], 1, "Dạng /embed/ID dành cho iframe; youtube-nocookie.com hạn chế cookie theo dõi."),
Q("Nhúng Google Maps không cần API key dùng dạng URL nào?", ["maps.google.com/maps?q=...&output=embed", "maps.google.com/api?key=...", "maps.google.com/json", "maps.google.com/embed?key=..."], 0, "Dạng output=embed công khai, chỉ cần tham số q là địa điểm."),
Q("viewBox trên svg có vai trò gì?", ["Tăng độ nét chữ", "Giữ hệ tọa độ cố định để hình co giãn đúng tỉ lệ", "Đổi màu hình", "Tạo bóng đổ"], 1, "viewBox định nghĩa hệ tọa độ nội bộ — đổi kích thước ngoài hình vẫn đúng tỉ lệ."),
Q("circle cần các thuộc tính nào?", ["x, y, width", "cx, cy, r", "points", "d"], 1, "Hình tròn cần tâm (cx, cy) và bán kính r."),
Q("rect dùng bộ thuộc tính nào?", ["cx, cy, r", "x, y, width, height", "points", "x1, y1, x2, y2"], 1, "Hình chữ nhật cần góc trên trái (x, y) và kích thước (width, height)."),
Q("polygon nhận tọa độ qua thuộc tính nào?", ["d", "points", "cx", "src"], 1, "points là danh sách các đỉnh \"x,y x,y ...\" của đa giác."),
Q("Đoạn code này hiển thị gì?", ["Báo lỗi vì thiếu src", "Một khung chứa chữ Hi", "Chữ Hi nằm ngoài khung", "Tải file tên Hi"], 1, "srcdoc dựng trang con chứa đoạn p ngay trong khung.", "<iframe srcdoc=\"<p>Hi</p>\" title=\"Khung demo\"></iframe>")
],
15: [
Q("details kết hợp summary tạo ra thành phần gì?", ["Hộp thoại nổi", "Khối nội dung bấm để đóng/mở", "Thanh tiến trình", "Bảng dữ liệu"], 1, "summary là nhãn bấm được, nội dung còn lại của details ẩn/hiện theo."),
Q("Thuộc tính open trên details có nghĩa gì?", ["Khóa không cho mở", "Mục mở sẵn khi tải trang", "Ẩn vĩnh viễn", "Mở trong tab mới"], 1, "open khiến details hiển thị nội dung ngay từ đầu."),
Q("Mở dialog dạng hộp thoại có nền mờ bằng hàm nào?", ["open()", "showModal()", "show()", "start()"], 1, "showModal() mở dạng modal: có nền mờ ::backdrop và chặn tương tác phía sau; show() chỉ mở thường."),
Q("Đóng dialog bằng cách nào?", ["hide()", "close() hoặc phím Esc", "stop()", "end()"], 1, "Phương thức close() đóng hộp thoại; với modal, Esc cũng đóng được."),
Q("progress value=\"7\" max=\"16\" thể hiện gì?", ["16/7 phần việc", "7/16 phần việc đã xong", "7% công việc", "16% công việc"], 1, "Thanh hiển thị tỉ lệ value/max = 7/16 tiến độ."),
Q("progress không có value thì hiển thị thế nào?", ["0%", "Thanh chạy vô định (indeterminate)", "100%", "Báo lỗi"], 1, "Thiếu value nghĩa là chưa biết tiến độ — thanh chạy qua lại kiểu \"đang xử lý\"."),
Q("meter khác progress ở điểm nào?", ["Hoàn toàn giống nhau", "Đo giá trị trong khoảng và đổi màu theo vùng tốt/xấu", "Chỉ hiển thị số", "Chỉ hiển thị phần trăm chữ"], 1, "meter đo giá trị (pin, điểm) trong min/max với vùng low/high/optimum; progress đo tiến độ việc."),
Q("low, high, optimum của meter dùng để làm gì?", ["Đặt độ dài thanh", "Phân vùng giá trị tốt/xấu để đổi màu", "Đặt tốc độ chạy", "Ẩn/hiện thanh"], 1, "Các mốc này chia thang đo thành vùng — trình duyệt tô màu tương ứng (xanh/vàng/đỏ)."),
Q("Khi tải trang, khối này hiển thị thế nào?", ["Nội dung ẩn kín", "Mở sẵn, thấy cả Hỏi và Đáp", "Báo lỗi thiếu open", "Chỉ thấy chữ Hỏi"], 1, "open khiến mục mở sẵn ngay khi tải.", "<details open>\n  <summary>Hỏi</summary>\n  <p>Đáp</p>\n</details>"),
Q("details thiếu summary thì hậu quả gì?", ["Lỗi nặng không chạy", "Trình duyệt tự sinh nhãn chung chung, người dùng khó hiểu", "Tự ẩn toàn trang", "Không thể mở bằng chuột"], 1, "Không có summary thì trình duyệt gán nhãn mặc định kiểu \"Details\" — mất ngữ cảnh câu hỏi.")
],
16: [
Q("ARIA là gì?", ["Một ngôn ngữ lập trình mới", "Bộ thuộc tính bổ sung khả năng truy cập", "Framework CSS", "Công cụ chấm SEO"], 1, "ARIA (Accessible Rich Internet Applications) bổ sung ngữ nghĩa cho trình đọc màn hình."),
Q("aria-label dùng khi nào?", ["Khi muốn đổi màu phần tử", "Khi phần tử cần tên rõ cho trình đọc màn hình", "Khi tạo liên kết", "Khi ẩn phần tử"], 1, "aria-label đặt tên truy cập, đặc biệt cho nút chỉ có icon hoặc nhãn mơ hồ."),
Q("aria-current=\"page\" trên liên kết đánh dấu điều gì?", ["Trang bị lỗi", "Đây là trang hiện tại trong điều hướng", "Trang đầu tiên", "Trang cuối cùng"], 1, "aria-current=\"page\" báo cho trình đọc màn hình biết mục nào đang được mở."),
Q("aria-expanded báo thông tin gì?", ["Kích thước phần tử", "Trạng thái đóng/mở của vùng điều khiển", "Màu nền", "Số trang con"], 1, "aria-expanded=true/false cho biết vùng nội dung nút điều khiển đang mở hay đóng."),
Q("Quy tắc vàng khi dùng ARIA là gì?", ["ARIA thay thế mọi thẻ HTML", "Dùng thẻ ngữ nghĩa đúng trước, ARIA chỉ bổ sung", "Chỉ dùng div rồi gắn ARIA", "Không bao giờ dùng cả hai"], 1, "Thẻ đúng ngữ nghĩa (button, nav…) tự có vai trò; ARIA chỉ vá khi không có thẻ phù hợp."),
Q("meta description nên dài khoảng bao nhiêu?", ["10 ký tự", "150–160 ký tự", "1000 ký tự", "Càng dài càng tốt"], 1, "Khoảng 150–160 ký tự là độ dài Google thường hiển thị trong kết quả tìm kiếm."),
Q("og:title (Open Graph) phát huy tác dụng khi nào?", ["Khi in trang", "Khi chia sẻ liên kết lên mạng xã hội", "Khi tìm kiếm nội bộ", "Khi dịch trang"], 1, "Open Graph quyết định tiêu đề/mô tả/ảnh của thẻ xem trước trên Facebook, Zalo…"),
Q("Vì sao button thật tốt hơn div gắn onclick?", ["Trông đẹp hơn", "Focus được bằng bàn phím, đúng ngữ nghĩa, kích hoạt bằng Enter/Space", "Nhẹ file hơn", "Chạy nhanh hơn"], 1, "button có sẵn vai trò, focus và phím kích hoạt — div phải tự xây lại tất cả bằng ARIA + JS."),
Q("Đoạn code này có vấn đề gì?", ["Hoàn toàn hợp lệ", "Nhảy cấp tiêu đề từ h1 xuống h4", "Thiếu alt", "h4 không tồn tại"], 1, "Cấu trúc heading phải đi từng cấp h1→h2→h3; nhảy cóc phá vỡ mục lục ngữ nghĩa.", "<h1>A</h1>\n<h4>B</h4>"),
Q("Cách kiểm tra nhanh khả năng dùng bàn phím của trang?", ["Rút chuột, chỉ dùng Tab/Enter/Space", "Đổi sang màu xám", "Phóng to 200%", "Tắt màn hình"], 0, "Điều hướng thuần bàn phím phải với tới và kích hoạt được mọi chức năng.")
]
};

/* ---------- A4. BẢNG TRA (CHEAT SHEET) ---------- */
/* tags: [tên, công dụng, loại (block/inline/head/both), ví dụ] */
const CHEATSHEET = {
tags: [
["a", "Tạo liên kết", "inline", '<a href="#bai-1">Bài 1</a>'],
["abbr", "Chữ viết tắt kèm giải thích", "inline", '<abbr title="HyperText Markup Language">HTML</abbr>'],
["article", "Nội dung độc lập (bài viết, tin)", "block", "<article>…</article>"],
["aside", "Nội dung phụ bên lề", "block", "<aside>…</aside>"],
["audio", "Nhúng âm thanh", "both", '<audio controls src="nhac.mp3"></audio>'],
["b", "In đậm thuần túy (không ngữ nghĩa)", "inline", "<b>in đậm</b>"],
["blockquote", "Trích dẫn khối dài", "block", "<blockquote><p>…</p></blockquote>"],
["body", "Phần nội dung hiển thị", "block", "<body>…</body>"],
["br", "Xuống một dòng (thẻ rỗng)", "inline", "<br>"],
["button", "Nút bấm", "inline", '<button type="button">Bấm</button>'],
["caption", "Tiêu đề của bảng", "block", "<caption>Điểm thi</caption>"],
["circle", "Hình tròn trong SVG", "inline", '<circle cx="50" cy="50" r="40"/>'],
["code", "Mã máy tính trong dòng", "inline", "<code>&lt;p&gt;</code>"],
["datalist", "Gợi ý giá trị cho input", "head", '<datalist id="ds"><option value="Hà Nội"></datalist>'],
["dd", "Mô tả trong danh sách dl", "block", "<dd>Phần giải thích</dd>"],
["details", "Khối đóng/mở được", "block", "<details>…</details>"],
["dialog", "Hộp thoại chuẩn", "block", "<dialog>…</dialog>"],
["div", "Khối chứa trung tính", "block", '<div class="khung">…</div>'],
["dl", "Danh sách thuật ngữ – mô tả", "block", "<dl>…</dl>"],
["dt", "Thuật ngữ trong dl", "block", "<dt>HTML</dt>"],
["em", "Nhấn mạnh (nghiêng + ngữ nghĩa)", "inline", "<em>rất</em>"],
["fieldset", "Nhóm ô nhập có viền", "block", "<fieldset>…</fieldset>"],
["figcaption", "Chú thích của figure", "block", "<figcaption>Hình 1…</figcaption>"],
["figure", "Nhóm nội dung minh họa", "block", "<figure>…</figure>"],
["footer", "Phần cuối trang/khu vực", "block", "<footer>…</footer>"],
["form", "Biểu mẫu nhập liệu", "block", '<form action="/gui" method="post">…</form>'],
["h1–h6", "Tiêu đề 6 cấp", "block", "<h1>Tiêu đề chính</h1>"],
["head", "Phần cấu hình tài liệu", "head", "<head>…</head>"],
["header", "Phần đầu trang/khu vực", "block", "<header>…</header>"],
["hr", "Đường phân tách chủ đề (rỗng)", "block", "<hr>"],
["html", "Thẻ gốc của tài liệu", "block", '<html lang="vi">…</html>'],
["i", "In nghiêng thuần túy", "inline", "<i>algorithm</i>"],
["iframe", "Nhúng trang web khác", "both", '<iframe src="…" title="Khung"></iframe>'],
["img", "Chèn ảnh (thẻ rỗng)", "inline", '<img src="anh.jpg" alt="Mô tả">'],
["input", "Ô nhập liệu (thẻ rỗng)", "inline", '<input type="text" name="ten">'],
["label", "Nhãn của ô nhập", "inline", '<label for="ten">Họ tên</label>'],
["legend", "Tiêu đề nhóm fieldset", "block", "<legend>Liên lạc</legend>"],
["li", "Một mục danh sách", "block", "<li>Cà phê</li>"],
["link", "Nạp tài nguyên ngoài (CSS)", "head", '<link rel="stylesheet" href="style.css">'],
["main", "Nội dung chính duy nhất", "block", "<main>…</main>"],
["mark", "Tô sáng nền vàng", "inline", "<mark>từ khóa</mark>"],
["meta", "Siêu dữ liệu (rỗng)", "head", '<meta charset="UTF-8">'],
["meter", "Thanh đo giá trị trong khoảng", "inline", '<meter value="0.8" max="1"></meter>'],
["nav", "Nhóm liên kết điều hướng", "block", "<nav>…</nav>"],
["ol", "Danh sách có thứ tự", "block", "<ol><li>…</li></ol>"],
["optgroup", "Nhóm option trong select", "block", '<optgroup label="Đồ uống">…</optgroup>'],
["option", "Một lựa chọn", "block", '<option value="pho">Phở</option>'],
["p", "Đoạn văn", "block", "<p>Nội dung…</p>"],
["picture", "Chọn ảnh theo màn hình", "block", "<picture>…</picture>"],
["pre", "Giữ nguyên khoảng trắng", "block", "<pre>…</pre>"],
["progress", "Thanh tiến trình", "inline", '<progress value="7" max="16"></progress>'],
["q", "Trích dẫn ngắn trong dòng", "inline", "<q>…</q>"],
["rect", "Hình chữ nhật trong SVG", "inline", '<rect x="0" y="0" width="100" height="60"/>'],
["script", "Chứa/nạp JavaScript", "both", '<script src="script.js"></script>'],
["section", "Phần nội dung theo chủ đề", "block", "<section>…</section>"],
["select", "Danh sách thả xuống", "inline", '<select name="mon">…</select>'],
["small", "Chữ nhỏ ghi chú", "inline", "<small>© 2026</small>"],
["source", "Nguồn cho picture/audio/video (rỗng)", "head", '<source src="phim.mp4" type="video/mp4">'],
["span", "Vùng chứa trong dòng", "inline", '<span class="do">đỏ</span>'],
["strong", "Nội dung quan trọng", "inline", "<strong>cảnh báo</strong>"],
["style", "CSS nội tuyến", "head", "<style>…</style>"],
["sub", "Chỉ số dưới", "inline", "H<sub>2</sub>O"],
["summary", "Nhãn đóng/mở của details", "block", "<summary>Câu hỏi</summary>"],
["sup", "Chỉ số trên", "inline", "m<sup>2</sup>"],
["svg", "Đồ họa vector", "inline", '<svg viewBox="0 0 100 100">…</svg>'],
["table", "Bảng dữ liệu", "block", "<table>…</table>"],
["tbody", "Nhóm hàng dữ liệu", "block", "<tbody>…</tbody>"],
["td", "Ô dữ liệu thường", "block", "<td>9</td>"],
["textarea", "Ô nhập nhiều dòng", "inline", '<textarea rows="4"></textarea>'],
["tfoot", "Nhóm hàng tổng kết", "block", "<tfoot>…</tfoot>"],
["th", "Ô tiêu đề (scope)", "block", '<th scope="col">Môn</th>'],
["thead", "Nhóm hàng tiêu đề", "block", "<thead>…</thead>"],
["title", "Tên trang (trên tab)", "head", "<title>Học HTML</title>"],
["tr", "Hàng của bảng", "block", "<tr>…</tr>"],
["track", "Phụ đề cho media (rỗng)", "head", '<track kind="subtitles" src="vi.vtt" srclang="vi">'],
["ul", "Danh sách không thứ tự", "block", "<ul><li>…</li></ul>"],
["video", "Nhúng video", "both", '<video controls src="phim.mp4"></video>']
],
/* attrs: [tên, công dụng, dùng cho, ví dụ] */
attrs: [
["href", "Đích của liên kết", "a, link", 'href="#bai-2"'],
["src", "Nguồn tài nguyên", "img, audio, video, iframe, source, script", 'src="anh.jpg"'],
["alt", "Mô tả thay thế của ảnh", "img", 'alt="Logo HTML"'],
["title", "Chú thích khi di chuột", "Mọi thẻ", 'title="Giải thích thêm"'],
["id", "Định danh duy nhất", "Mọi thẻ", 'id="dau-trang"'],
["class", "Nhãn gom nhóm (CSS/JS)", "Mọi thẻ", 'class="ghi-chu"'],
["style", "CSS inline", "Mọi thẻ", 'style="color:red"'],
["lang", "Ngôn ngữ nội dung", "Mọi thẻ (hay dùng ở html)", 'lang="vi"'],
["data-*", "Dữ liệu riêng cho JS", "Mọi thẻ", 'data-bai="7"'],
["target", "Nơi mở liên kết", "a, form", 'target="_blank"'],
["rel", "Quan hệ với đích (bảo mật)", "a, link", 'rel="noopener"'],
["download", "Tải file với tên gợi ý", "a", 'download="tai-lieu.txt"'],
["type", "Kiểu phần tử", "input, button, ol, script…", 'type="email"'],
["name", "Tên dữ liệu gửi đi", "input, select, textarea, form…", 'name="hoten"'],
["value", "Giá trị ô/lựa chọn", "input, option, button, progress, meter…", 'value="pho"'],
["placeholder", "Gợi ý mờ trong ô", "input, textarea", 'placeholder="Nguyễn Văn An"'],
["required", "Bắt buộc nhập/chọn", "input, select, textarea", "required"],
["disabled", "Vô hiệu hóa (không gửi)", "input, select, button…", "disabled"],
["readonly", "Chỉ đọc (vẫn gửi)", "input, textarea", "readonly"],
["min / max", "Giá trị nhỏ/lớn nhất", "input number/date/range, meter", 'min="18" max="60"'],
["minlength / maxlength", "Giới hạn số ký tự", "input text, textarea", 'minlength="6"'],
["pattern", "Mẫu regex phải khớp", "input", 'pattern="0[0-9]{9}"'],
["autocomplete", "Gợi ý điền tự động", "input, form", 'autocomplete="email"'],
["for", "Nối label với id ô nhập", "label", 'for="ho-ten"'],
["action / method", "Nơi nhận / cách gửi form", "form", 'method="post"'],
["colspan / rowspan", "Gộp ô ngang / dọc", "td, th", 'colspan="2"'],
["scope", "Tiêu đề cột hay hàng", "th", 'scope="col"'],
["controls / loop / muted", "Điều khiển / lặp / tắt tiếng", "audio, video", "controls"],
["autoplay", "Tự phát (cần muted)", "audio, video", "autoplay muted"],
["poster", "Ảnh bìa video", "video", 'poster="bia.jpg"'],
["loading", "Hoãn tải khi xa màn hình", "img, iframe", 'loading="lazy"'],
["srcset / media", "Nguồn ảnh theo điều kiện", "source, img", 'media="(min-width: 600px)"'],
["open", "Mở sẵn", "details, dialog", "open"],
["start / reversed", "Số bắt đầu / đếm ngược", "ol", 'start="3"'],
["aria-label", "Tên truy cập", "Mọi thẻ", 'aria-label="Đóng"'],
["aria-current", "Đánh dấu mục hiện tại", "a, nav…", 'aria-current="page"']
],
/* inputs: [type, công dụng, ví dụ] */
inputs: [
["text", "Văn bản một dòng", '<input type="text" name="ten">'],
["password", "Che ký tự nhập", '<input type="password" name="mk">'],
["email", "Email, tự kiểm tra @", '<input type="email" name="em">'],
["number", "Số, có nút tăng giảm", '<input type="number" min="0" max="10">'],
["tel", "Số điện thoại (bàn phím số)", '<input type="tel" name="sdt">'],
["url", "Địa chỉ web", '<input type="url" name="web">'],
["date", "Chọn ngày", '<input type="date" name="ngay">'],
["time", "Chọn giờ", '<input type="time" name="gio">'],
["color", "Bảng chọn màu", '<input type="color" value="#E44D26">'],
["range", "Thanh kéo giá trị", '<input type="range" min="0" max="10">'],
["file", "Chọn tệp từ máy", '<input type="file" accept="image/*">'],
["checkbox", "Ô tick chọn nhiều", '<input type="checkbox" name="st" value="doc">'],
["radio", "Chọn một trong nhóm", '<input type="radio" name="gt" value="nam">'],
["hidden", "Dữ liệu gửi ngầm", '<input type="hidden" name="nguon" value="home">'],
["search", "Ô tìm kiếm có nút xóa", '<input type="search" name="q">'],
["submit", "Nút gửi form", '<input type="submit" value="Gửi">'],
["reset", "Nút khôi phục mặc định", '<input type="reset" value="Nhập lại">'],
["button", "Nút trung tính", '<input type="button" value="Bấm">'],
["datetime-local", "Ngày + giờ địa phương", '<input type="datetime-local">'],
["month", "Chọn tháng/năm", '<input type="month">'],
["week", "Chọn tuần/năm", '<input type="week">'],
["image", "Nút gửi bằng ảnh", '<input type="image" src="nut.png" alt="Gửi">']
],
/* entities: [cách viết, ký tự, ý nghĩa] */
entities: [
["&lt;", "<", "Dấu nhỏ hơn (less than) — tránh hiểu là thẻ mở"],
["&gt;", ">", "Dấu lớn hơn (greater than)"],
["&amp;", "&", "Dấu và (ampersand) — bắt đầu mọi entity"],
["&quot;", "\"", "Ngoặc kép trong giá trị thuộc tính"],
["&apos;", "'", "Ngoặc đơn"],
["&nbsp;", " ", "Khoảng cách không ngắt dòng (non-breaking space)"],
["&copy;", "©", "Bản quyền (copyright)"],
["&reg;", "®", "Nhãn hiệu đăng ký (registered)"],
["&trade;", "™", "Nhãn hiệu (trademark)"],
["&hellip;", "…", "Ba chấm lửng"],
["&mdash;", "—", "Gạch ngang dài (em dash)"],
["&ndash;", "–", "Gạch ngang ngắn (en dash)"],
["&times;", "×", "Dấu nhân"],
["&divide;", "÷", "Dấu chia"],
["&deg;", "°", "Độ (degree)"],
["&euro;", "€", "Đồng euro"]
],
/* semantic: [tên, vai trò, ví dụ] */
semantic: [
["header", "Phần đầu trang hoặc đầu khu vực (logo, tên site)", "<header><h1>Tên site</h1></header>"],
["nav", "Nhóm liên kết điều hướng chính", "<nav><a href=\"#/\">Trang chủ</a></nav>"],
["main", "Nội dung chính duy nhất của trang", "<main><article>…</article></main>"],
["section", "Một phần nội dung theo chủ đề, có tiêu đề", "<section><h2>Tin tức</h2>…</section>"],
["article", "Nội dung độc lập, tách ra vẫn có nghĩa", "<article><h2>Bài viết</h2>…</article>"],
["aside", "Nội dung phụ, liên quan gián tiếp", "<aside>Bài liên quan…</aside>"],
["footer", "Phần cuối trang/khu vực (bản quyền, liên hệ)", "<footer><small>© 2026</small></footer>"],
["figure + figcaption", "Khối minh họa kèm chú thích", "<figure><img …><figcaption>…</figcaption></figure>"]
],
/* shortcuts: [phím, tác dụng trong VS Code] */
shortcuts: [
["!", "Gõ ! rồi Tab → sinh khung HTML5 chuẩn (Emmet)"],
["Ctrl + S", "Lưu file"],
["Ctrl + /", "Bật/tắt chú thích dòng đang chọn"],
["Alt + Shift + F", "Format (thụt lề) toàn file"],
["Alt + ↑ / ↓", "Di chuyển dòng lên/xuống"],
["Alt + Shift + ↑ / ↓", "Nhân đôi dòng lên/xuống"],
["Ctrl + D", "Chọn lần lượt các từ giống nhau"],
["Ctrl + Shift + K", "Xóa dòng hiện tại"],
["Ctrl + Space", "Gợi ý code (IntelliSense)"],
["Ctrl + F", "Tìm trong file; Ctrl + H: thay thế"],
["Ctrl + Shift + P", "Bảng lệnh (Command Palette)"],
["Ctrl + `", "Mở/đóng terminal tích hợp"],
["F5 / Ctrl + F5", "Chạy / tải lại không cache (tùy cấu hình)"],
["Tab / Shift + Tab", "Thụt lề / lùi lề khối đang chọn"]
]
};

/* ============================================================
   PHẦN B — LOGIC
   ============================================================ */

/* ---------- B1. TIỆN ÍCH CHUNG ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
/* Escape HTML để in code an toàn */
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/* Debounce cho auto-run của editor */
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
/* Bỏ dấu tiếng Việt để tìm kiếm không dấu vẫn ra */
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
/* Trộn mảng (Fisher–Yates) */
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- B2. KHO LƯU TIẾN ĐỘ (localStorage, bọc try/catch) ---------- */
const STORE_KEY = "hochtml-tien-do-v1";
let store = { done: {}, best: {}, ex: {}, marks: [], last: 0, theme: null, collapsed: {}, sideHidden: false };
function loadStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) { const d = JSON.parse(raw); if (d && typeof d === "object") store = Object.assign(store, d); }
  } catch (e) { /* storage bị chặn hoặc hỏng: chạy như người mới, không báo lỗi */ }
}
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) { /* bỏ qua: vẫn học được bình thường */ }
}

/* ---------- B3. THEME SÁNG/TỐI ---------- */
function applyTheme(t, save = true) {
  document.documentElement.setAttribute("data-theme", t);
  if (save) { store.theme = t; saveStore(); }
}
function initTheme() {
  let t = store.theme;
  if (t !== "light" && t !== "dark") {
    try { t = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }
    catch (e) { t = "light"; }
  }
  applyTheme(t, false);
}

/* ---------- B4. TÀI NGUYÊN MẪU (data URI, không cần file ngoài) ---------- */
/* Sinh ảnh SVG dạng data URI */
function svgURI(w, h, bg, label) {
  const s = "<svg xmlns='http://www.w3.org/2000/svg' width='" + w + "' height='" + h + "'><rect width='" + w + "' height='" + h + "' fill='" + bg + "'/><text x='" + (w / 2) + "' y='" + (h / 2 + 6) + "' font-family='sans-serif' font-size='16' text-anchor='middle' fill='#ffffff'>" + label + "</text></svg>";
  return "data:image/svg+xml," + encodeURIComponent(s);
}
/* Sinh tiếng beep 0,5 giây (sóng sine 440Hz) thành WAV data URI */
function makeWav() {
  const sr = 8000, dur = 0.5, n = Math.floor(sr * dur);
  const buf = new ArrayBuffer(44 + n * 2), dv = new DataView(buf);
  const ws = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
  ws(0, "RIFF"); dv.setUint32(4, 36 + n * 2, true); ws(8, "WAVE"); ws(12, "fmt ");
  dv.setUint32(16, 16, true); dv.setUint16(20, 1, true); dv.setUint16(22, 1, true);
  dv.setUint32(24, sr, true); dv.setUint32(28, sr * 2, true); dv.setUint16(32, 2, true); dv.setUint16(34, 16, true);
  ws(36, "data"); dv.setUint32(40, n * 2, true);
  for (let i = 0; i < n; i++) {
    const fade = Math.min(1, i / 400, (n - i) / 2000); // mờ dần hai đầu cho khỏi "bụp"
    dv.setInt16(44 + i * 2, Math.sin(2 * Math.PI * 440 * i / sr) * 0.4 * fade * 32767, true);
  }
  let bin = ""; const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return "data:audio/wav;base64," + btoa(bin);
}
/* Bảng thay thế: tên file trong ví dụ → data URI thật (chỉ dùng trong khung demo) */
const MEDIA = {
  "anh.svg": svgURI(160, 100, "#E44D26", "HTML"),
  "anh-nho.svg": svgURI(160, 100, "#2563EB", "Ảnh nhỏ"),
  "anh-to.svg": svgURI(320, 200, "#15803D", "Ảnh lớn"),
  "poster.svg": svgURI(320, 180, "#1C2333", "Video mẫu"),
  "beep.wav": makeWav(),
  "phude.vtt": "data:text/vtt;charset=utf-8," + encodeURIComponent("WEBVTT\n\n00:00.000 --> 00:03.000\nĐây là phụ đề minh họa của demo.\n\n00:03.000 --> 00:06.000\nHọc HTML mỗi ngày!\n")
};

/* ---------- B5. TÔ MÀU CODE HTML ĐƠN GIẢN (tự viết, không thư viện) ---------- */
/* Tô một dòng: quét tuần tự, phân biệt chú thích / doctype / thẻ / thuộc tính / chữ */
function highlightLine(line) {
  let out = "", i = 0;
  while (i < line.length) {
    const lt = line.indexOf("<", i);
    if (lt === -1) { out += esc(line.slice(i)); break; }
    if (lt > i) out += esc(line.slice(i, lt));
    if (line.startsWith("<!--", lt)) { // chú thích
      const end = line.indexOf("-->", lt + 4);
      const j = end === -1 ? line.length : end + 3;
      out += '<span class="tk-c">' + esc(line.slice(lt, j)) + "</span>"; i = j; continue;
    }
    const m = /^<(\/?)([a-zA-Z][\w-]*)/.exec(line.slice(lt));
    if (m) { // thẻ: quét thuộc tính có ý thức ngoặc kép
      let j = lt + m[0].length, q = null;
      while (j < line.length) {
        const ch = line[j];
        if (q) { if (ch === q) q = null; }
        else if (ch === '"' || ch === "'") q = ch;
        else if (ch === ">") break;
        j++;
      }
      const attrs = line.slice(lt + m[0].length, j);
      const aHtml = esc(attrs).replace(/([\w-]+)(\s*=\s*)("[^"]*"|'[^']*')/g, '<span class="tk-a">$1</span>$2<span class="tk-v">$3</span>');
      out += '<span class="tk-p">&lt;' + m[1] + '</span><span class="tk-t">' + m[2] + "</span>" + aHtml + (j < line.length ? '<span class="tk-p">&gt;</span>' : "");
      i = j < line.length ? j + 1 : j; continue;
    }
    if (line.startsWith("<!", lt)) { // doctype hoặc khai báo khác
      const end = line.indexOf(">", lt);
      const j = end === -1 ? line.length : end + 1;
      out += '<span class="tk-d">' + esc(line.slice(lt, j)) + "</span>"; i = j; continue;
    }
    out += "&lt;"; i = lt + 1;
  }
  return out;
}
/* Tô cả khối, mỗi dòng một span .ln (cur = dòng đang chạy từng dòng) */
function highlightHTML(src, cur = -1) {
  return src.split("\n").map((ln, idx) =>
    '<span class="ln' + (idx === cur ? " cur" : "") + '">' + highlightLine(ln) + "</span>"
  ).join("");
}
/* Khối code tĩnh chỉ đọc */
function codeBlock(code) { return '<pre class="codeblock"><code>' + highlightHTML(code) + "</code></pre>"; }

/* ---------- B6. KIỂM TRA LỖI CÚ PHÁP ĐƠN GIẢN ---------- */
const VOID_TAGS = new Set("area base br col embed hr img input link meta param source track wbr".split(" "));
const RAW_TAGS = new Set(["script", "style", "textarea", "title"]);
/* Tách token thẻ có ý thức ngoặc kép (tránh nhầm > trong srcdoc) */
function tokenizeTags(src) {
  const tokens = []; let i = 0;
  while (i < src.length) {
    const lt = src.indexOf("<", i);
    if (lt === -1) break;
    if (src.startsWith("<!--", lt)) { const end = src.indexOf("-->", lt + 4); i = end === -1 ? src.length : end + 3; continue; }
    const m = /^<(\/?)([a-zA-Z][\w-]*)/.exec(src.slice(lt));
    if (!m) { i = lt + 1; continue; }
    let j = lt + m[0].length, q = null;
    while (j < src.length) {
      const ch = src[j];
      if (q) { if (ch === q) q = null; }
      else if (ch === '"' || ch === "'") q = ch;
      else if (ch === ">") break;
      j++;
    }
    tokens.push({ closing: m[1] === "/", name: m[2].toLowerCase(), self: /\/\s*$/.test(src.slice(lt + m[0].length, j)) });
    i = j + 1;
  }
  return tokens;
}
/* Trả về thông báo lỗi tiếng Việt, hoặc null nếu ổn */
function checkHTML(src) {
  const tokens = tokenizeTags(src);
  const stack = [];
  for (let k = 0; k < tokens.length; k++) {
    const t = tokens[k];
    if (!t.closing && RAW_TAGS.has(t.name)) { // bỏ qua nội dung thô của script/style/textarea
      let found = -1;
      for (let j = k + 1; j < tokens.length; j++) if (tokens[j].closing && tokens[j].name === t.name) { found = j; break; }
      if (found === -1) return "Thẻ <" + t.name + "> chưa được đóng.";
      k = found; continue;
    }
    if (t.closing) {
      if (!stack.length) return "Thừa thẻ đóng </" + t.name + "> — không có thẻ mở tương ứng.";
      if (stack[stack.length - 1] === t.name) stack.pop();
      else if (stack.includes(t.name)) return "Lồng thẻ sai: cần đóng </" + stack[stack.length - 1] + "> trước khi đóng </" + t.name + ">.";
      else return "Thẻ đóng </" + t.name + "> không khớp với thẻ mở nào.";
    } else if (!t.self && !VOID_TAGS.has(t.name)) stack.push(t.name);
  }
  if (stack.length) return "Thẻ <" + stack[stack.length - 1] + "> chưa được đóng.";
  // Dùng DOMParser bắt lỗi lồng block/inline mà trình duyệt sẽ âm thầm sửa
  try {
    const doc = new DOMParser().parseFromString(src, "text/html");
    const bad = doc.querySelector("p p, p div, p ul, p ol, p table, p h1, p h2, p h3, p section, span p, span div, a a, button button");
    if (bad && bad.parentElement) {
      return "Thẻ <" + bad.parentElement.tagName.toLowerCase() + "> không nên chứa thẻ <" + bad.tagName.toLowerCase() + "> — sai kiểu lồng block/inline.";
    }
  } catch (e) { /* trình duyệt quá cũ: bỏ qua bước này */ }
  return null;
}

/* ---------- B7. GIẢI THÍCH TỪNG DÒNG (chế độ chạy từng dòng) ---------- */
function explainLine(line) {
  const t = line.trim();
  if (!t) return "Dòng trống — chỉ giúp code dễ đọc hơn.";
  if (/^<!--/.test(t)) return "Chú thích: trình duyệt bỏ qua, không hiển thị lên trang.";
  if (/^<!DOCTYPE/i.test(t)) return TAG_INFO["!doctype"];
  const m = /^<(\/?)([a-zA-Z][\w-]*)([^>]*)>/.exec(t);
  if (m) {
    const name = m[2].toLowerCase();
    if (m[1]) return "Đóng thẻ <" + name + ">: kết thúc vùng nội dung của thẻ này.";
    let base = TAG_INFO[name] || "Thẻ <" + name + ">.";
    const attrs = Array.from(m[3].matchAll(/([\w-]+)\s*=/g)).map(x => x[1].toLowerCase()).filter(a => ATTR_INFO[a]);
    if (attrs.length) base += " " + attrs.map(a => ATTR_INFO[a]).join(" ");
    return base;
  }
  return "Nội dung văn bản: hiển thị trực tiếp lên trang.";
}

/* ---------- B8. LIVE EDITOR ---------- */
let editorSeq = 0;
let liveEditors = [];   // các editor của trang hiện tại (để dọn dẹp khi chuyển trang)
let lastActiveEditor = null;
const BASE_CSS = "html{background:#fff}body{font-family:system-ui,'Segoe UI',Arial,sans-serif;color:#111;margin:0;padding:14px;line-height:1.6}img,video,iframe{max-width:100%}";

function destroyEditors() {
  liveEditors.forEach(ed => { try { ed.destroy(); } catch (e) {} });
  liveEditors = []; lastActiveEditor = null;
}

/* Tạo một khối live code: soạn trái — kết quả phải, chạy từng dòng, báo lỗi */
function createEditor(host, opts) {
  const original = opts.code;
  const el = document.createElement("div");
  el.className = "editor";
  el.innerHTML =
    '<div class="ed-head">' +
      '<span class="ed-title">' + esc(opts.title || "Live code") + "</span>" +
      '<div class="ed-actions">' +
        '<button type="button" class="ed-btn primary" data-act="run">▶ Chạy</button>' +
        '<button type="button" class="ed-btn" data-act="step">Chạy từng dòng</button>' +
        '<button type="button" class="ed-btn" data-act="reset">↺ Reset</button>' +
        '<button type="button" class="ed-btn" data-act="copy">Copy</button>' +
        '<button type="button" class="ed-btn" data-act="full">⛶ Toàn màn hình</button>' +
      "</div>" +
    "</div>" +
    '<div class="ed-body">' +
      '<div class="ed-code">' +
        '<div class="ed-gutter" aria-hidden="true"></div>' +
        '<div class="ed-main">' +
          '<pre class="ed-hl" aria-hidden="true"></pre>' +
          '<textarea class="ed-ta" spellcheck="false" wrap="off" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Ô soạn code HTML"></textarea>' +
        "</div>" +
      "</div>" +
      '<iframe class="ed-result" title="Kết quả chạy code" sandbox="allow-forms"></iframe>' +
    "</div>" +
    '<div class="ed-stepbar" hidden>' +
      '<button type="button" class="ed-btn primary" data-act="next">Bước tiếp ▸</button>' +
      '<button type="button" class="ed-btn" data-act="restart">Chạy lại từ đầu</button>' +
      '<button type="button" class="ed-btn" data-act="exitstep">Thoát chế độ dòng</button>' +
      '<span class="ed-stepcount"></span>' +
      '<p class="ed-stepnote"></p>' +
    "</div>" +
    (opts.note ? '<div class="ed-note">' + esc(opts.note) + "</div>" : "") +
    '<div class="ed-status" role="status"></div>';
  host.appendChild(el);

  const ta = $(".ed-ta", el), hl = $(".ed-hl", el), gutter = $(".ed-gutter", el);
  const frame = $(".ed-result", el), status = $(".ed-status", el);
  const stepbar = $(".ed-stepbar", el), stepnote = $(".ed-stepnote", el), stepcount = $(".ed-stepcount", el);
  let stepMode = false, stepIdx = -1, stepLines = [];

  /* Vẽ highlight + số dòng */
  function paint(cur = -1) {
    hl.innerHTML = highlightHTML(ta.value, cur);
    const n = ta.value.split("\n").length;
    let g = "";
    for (let i = 1; i <= n; i++) g += "<div" + (i - 1 === cur ? ' class="cur"' : "") + ">" + i + "</div>";
    gutter.innerHTML = g;
  }
  function syncScroll() { hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; gutter.scrollTop = ta.scrollTop; }

  /* Ghép tài liệu hoàn chỉnh cho iframe: luôn nền sáng để thấy giao diện HTML thật */
  function buildDoc(code) {
    code = code.replace(/anh-nho\.svg|anh-to\.svg|anh\.svg|poster\.svg|beep\.wav|phude\.vtt/g, m => MEDIA[m]);
    if (/<html[\s>]/i.test(code)) {
      if (/<head[^>]*>/i.test(code)) return code.replace(/<head[^>]*>/i, m => m + "<style>" + BASE_CSS + "</style>");
      return code;
    }
    return '<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><style>' + BASE_CSS + "</style></head><body>" + code + "</body></html>";
  }
  /* Sandbox tối thiểu: chỉ allow-forms; thêm allow-scripts khi ví dụ CÓ script,
     thêm allow-downloads khi ví dụ có tải file. Tuyệt đối không allow-same-origin. */
  function sandboxFor(code) {
    let s = "allow-forms";
    if (/<script|on[a-z]+\s*=/i.test(code)) s += " allow-scripts allow-modals";
    if (/\bdownload\b/i.test(code)) s += " allow-downloads";
    return s;
  }
  function run(code) {
    const src = code !== undefined ? code : ta.value;
    frame.setAttribute("sandbox", sandboxFor(src));
    frame.srcdoc = buildDoc(src);
  }
  function checkAndReport() {
    const err = checkHTML(ta.value);
    status.className = "ed-status " + (err ? "err" : "ok");
    status.textContent = err ? "⚠ " + err + " Trình duyệt vẫn tự sửa để hiển thị, nhưng bạn nên sửa code." : "✓ Không phát hiện lỗi cú pháp.";
  }
  const autoRun = debounce(() => { if (!stepMode) { run(); checkAndReport(); } }, 300);

  /* --- Chế độ chạy từng dòng --- */
  function enterStep() {
    stepMode = true; stepLines = ta.value.split("\n"); stepIdx = -1;
    stepbar.hidden = false;
    $('[data-act="step"]', el).classList.add("on");
    stepcount.textContent = "0/" + stepLines.length + " dòng";
    stepnote.innerHTML = "Bấm <b>Bước tiếp ▸</b> — mỗi lần bấm thêm đúng 1 dòng vào kết quả.";
    status.className = "ed-status"; status.textContent = "Đang ở chế độ chạy từng dòng (tạm ngưng kiểm tra lỗi vì code còn dở dang).";
    run(""); paint(-1);
  }
  function exitStep() {
    stepMode = false; stepbar.hidden = true;
    $('[data-act="step"]', el).classList.remove("on");
    paint(); run(); checkAndReport();
  }
  function stepNext() {
    if (stepIdx >= stepLines.length - 1) {
      stepnote.innerHTML = "Đã chạy hết <b>" + stepLines.length + " dòng</b>. Bấm <b>Chạy lại từ đầu</b> để xem lại.";
      return;
    }
    stepIdx++;
    run(stepLines.slice(0, stepIdx + 1).join("\n"));
    paint(stepIdx);
    stepcount.textContent = (stepIdx + 1) + "/" + stepLines.length + " dòng";
    stepnote.innerHTML = "<b>Dòng " + (stepIdx + 1) + ":</b> " + esc(explainLine(stepLines[stepIdx]));
    const lh = parseFloat(getComputedStyle(ta).lineHeight) || 20.8;
    ta.scrollTop = Math.max(0, (stepIdx - 3) * lh); syncScroll();
  }

  /* --- Copy --- */
  function copyCode(btn) {
    const done = () => { const t = btn.textContent; btn.textContent = "Đã copy ✓"; setTimeout(() => { btn.textContent = t; }, 1200); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(ta.value).then(done).catch(() => { ta.select(); try { document.execCommand("copy"); done(); } catch (e) {} ta.setSelectionRange(0, 0); });
    } else {
      ta.select(); try { document.execCommand("copy"); done(); } catch (e) {} ta.setSelectionRange(0, 0);
    }
  }

  /* --- Toàn màn hình (API thật, dự phòng bằng class) --- */
  const btnFull = $('[data-act="full"]', el);
  function onFsChange() { btnFull.textContent = document.fullscreenElement === el ? "⛶ Thu nhỏ" : "⛶ Toàn màn hình"; }
  document.addEventListener("fullscreenchange", onFsChange);
  function toggleFull() {
    if (document.fullscreenElement === el) { document.exitFullscreen().catch(() => {}); return; }
    if (el.classList.contains("pseudo-full")) { el.classList.remove("pseudo-full"); btnFull.textContent = "⛶ Toàn màn hình"; return; }
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => { el.classList.add("pseudo-full"); btnFull.textContent = "⛶ Thu nhỏ"; });
    } else { el.classList.add("pseudo-full"); btnFull.textContent = "⛶ Thu nhỏ"; }
  }

  /* --- Sự kiện --- */
  ta.addEventListener("input", () => { paint(); syncScroll(); autoRun(); });
  ta.addEventListener("scroll", syncScroll);
  ta.addEventListener("focus", () => { lastActiveEditor = api; });
  ta.addEventListener("keydown", e => {
    if (e.key === "Tab") { // Tab = thụt lề 2 spaces thay vì chuyển focus
      e.preventDefault();
      ta.setRangeText("  ", ta.selectionStart, ta.selectionEnd, "end");
      paint(); syncScroll(); autoRun();
    } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { // Ctrl+Enter chạy ngay
      e.preventDefault();
      if (stepMode) exitStep(); else { run(); checkAndReport(); }
    }
  });
  el.addEventListener("click", e => {
    const b = e.target.closest("[data-act]");
    if (!b || !el.contains(b)) return;
    const act = b.dataset.act;
    if (act === "run") { if (stepMode) exitStep(); else { run(); checkAndReport(); } }
    else if (act === "step") { stepMode ? exitStep() : enterStep(); }
    else if (act === "reset") { ta.value = original; if (stepMode) exitStep(); else { paint(); run(); checkAndReport(); } }
    else if (act === "copy") copyCode(b);
    else if (act === "full") toggleFull();
    else if (act === "next") stepNext();
    else if (act === "restart") {
      stepIdx = -1; run(""); paint(-1);
      stepcount.textContent = "0/" + stepLines.length + " dòng";
      stepnote.innerHTML = "Đã tua về đầu. Bấm <b>Bước tiếp ▸</b> để chạy lại.";
    }
    else if (act === "exitstep") exitStep();
  });

  const api = {
    el,
    getCode: () => ta.value,
    setCode: c => { ta.value = c; if (stepMode) exitStep(); else { paint(); run(); checkAndReport(); } },
    run: () => { run(); checkAndReport(); },
    destroy: () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      el.classList.remove("pseudo-full");
      if (document.fullscreenElement === el) document.exitFullscreen().catch(() => {});
    }
  };
  liveEditors.push(api);
  ta.value = original;
  paint(); run(); checkAndReport();
  return api;
}

/* ---------- B9. QUIZ (trộn đáp án, giải thích, điểm cao nhất, làm lại câu sai) ---------- */
/* questions: mảng câu hỏi (có thể gắn .lesson); opts: {lessonId, onDone} */
function renderQuiz(host, questions, opts = {}) {
  host.innerHTML = "";
  const box = document.createElement("div"); box.className = "quiz-box"; host.appendChild(box);
  const prog = document.createElement("div"); prog.className = "quiz-progress"; box.appendChild(prog);
  const state = questions.map(q => ({ q, order: shuffle([0, 1, 2, 3]), picked: null }));
  let resultShown = false;

  function updateProg() {
    const done = state.filter(s => s.picked !== null).length;
    prog.innerHTML = '<span>Đã trả lời <b>' + done + "/" + state.length + "</b></span>" +
      '<div class="part-progress"><i style="width:' + (done / state.length * 100) + '%"></i></div>';
    if (done === state.length) showResult();
  }

  state.forEach((s, idx) => {
    const card = document.createElement("div"); card.className = "q-card";
    card.innerHTML = '<div class="q-title"><span class="q-num">' + (idx + 1) + "</span><span>" + esc(s.q.q) + "</span></div>" +
      (s.q.code ? codeBlock(s.q.code) : "") + '<div class="q-opts"></div>';
    const optsBox = $(".q-opts", card);
    s.order.forEach((orig, pos) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "q-opt";
      b.innerHTML = '<span class="opt-key">' + "ABCD"[pos] + "</span><span>" + esc(s.q.a[orig]) + "</span>";
      b.addEventListener("click", () => {
        if (s.picked !== null) return;
        s.picked = orig;
        $$(".q-opt", optsBox).forEach((x, p) => {
          x.disabled = true;
          if (s.order[p] === s.q.c) x.classList.add("correct");
          else if (s.order[p] === orig) x.classList.add("wrong");
        });
        const ex = document.createElement("div");
        ex.className = "q-explain";
        ex.innerHTML = (orig === s.q.c ? "<b>Chính xác!</b> " : "<b>Chưa đúng.</b> ") + esc(s.q.e);
        card.appendChild(ex);
        updateProg();
      });
      optsBox.appendChild(b);
    });
    box.appendChild(card);
  });

  function showResult() {
    if (resultShown) return; resultShown = true;
    const correct = state.filter(s => s.picked === s.q.c).length;
    const wrong = state.filter(s => s.picked !== s.q.c);
    if (opts.lessonId) {
      const prev = store.best[opts.lessonId] || 0;
      if (correct > prev) { store.best[opts.lessonId] = correct; saveStore(); }
    }
    /* Chế độ kiểm tra cuối khóa: trang kiểm tra tự dựng bảng kết quả riêng */
    if (!opts.exam) {
      const pct = Math.round(correct / state.length * 100);
      const verdict = pct >= 80 ? "Xuất sắc! Bạn nắm rất chắc nội dung này." :
        pct >= 50 ? "Khá ổn — hãy làm lại các câu sai để chắc kiến thức hơn." :
        "Đừng nản! Đọc lại phần tóm tắt rồi làm lại câu sai nhé.";
      const panel = document.createElement("div"); panel.className = "quiz-result";
      panel.innerHTML = '<div class="quiz-score">' + correct + "<small>/" + state.length + '</small></div>' +
        '<p class="quiz-verdict">' + verdict + "</p>" +
        (opts.lessonId ? '<p class="quiz-best">Điểm cao nhất Bài ' + opts.lessonId + ": <b>" + (store.best[opts.lessonId] || 0) + "/10</b> (đã lưu)</p>" : "") +
        '<div class="quiz-actions"></div>';
      const actions = $(".quiz-actions", panel);
      const btnWrong = document.createElement("button");
      btnWrong.type = "button"; btnWrong.className = "btn secondary";
      btnWrong.textContent = "Làm lại câu sai (" + wrong.length + ")";
      btnWrong.disabled = wrong.length === 0;
      btnWrong.addEventListener("click", () => renderQuiz(host, wrong.map(s => s.q), opts));
      const btnAll = document.createElement("button");
      btnAll.type = "button"; btnAll.className = "btn";
      btnAll.textContent = opts.lessonId ? "Làm lại 10 câu" : "Làm lại";
      btnAll.addEventListener("click", () => renderQuiz(host, questions, opts));
      actions.append(btnWrong, btnAll);
      box.appendChild(panel);
    }
    if (opts.onDone) opts.onDone({ correct, total: state.length, state });
  }
  updateProg();
}

/* ---------- B10. BÀI TẬP CODE (gợi ý từng bước, lời giải, tự chấm) ---------- */
function buildExercise(host, ex, lessonId, exIdx) {
  const wrap = document.createElement("div"); wrap.className = "exercise";
  wrap.innerHTML =
    "<h3><span class=\"ex-tag\">Bài tập " + (exIdx + 1) + "</span>" + esc(ex.t) + "</h3>" +
    '<p class="ex-prompt">' + esc(ex.prompt) + "</p>" +
    '<div class="ex-editor"></div>' +
    '<div class="ex-tools">' +
      '<button type="button" class="btn small ghost" data-x="hint">Gợi ý từng bước</button>' +
      '<button type="button" class="btn small ghost" data-x="solution">Xem lời giải</button>' +
      '<button type="button" class="btn small" data-x="check">✓ Kiểm tra bài làm</button>' +
    "</div>" +
    '<div class="ex-hints" hidden><b>Gợi ý từng bước:</b><ol></ol><button type="button" class="btn small ghost" data-x="morehint">Gợi ý tiếp theo ▸</button></div>' +
    '<div class="ex-solution" hidden></div>' +
    '<div class="ex-result"></div>';
  host.appendChild(wrap);
  const ed = createEditor($(".ex-editor", wrap), { code: ex.starter, title: "Bài tập: " + ex.t });
  const hintsBox = $(".ex-hints", wrap), hintsOl = $("ol", hintsBox);
  const solBox = $(".ex-solution", wrap), resBox = $(".ex-result", wrap);
  let hintCount = 0;
  solBox.innerHTML = "<b>Lời giải tham khảo:</b>" + codeBlock(ex.solution) +
    '<button type="button" class="btn small secondary" data-x="usesol">Nạp lời giải vào ô code</button>';

  function addHint() {
    if (hintCount >= ex.hints.length) return;
    const li = document.createElement("li"); li.textContent = ex.hints[hintCount++];
    hintsOl.appendChild(li);
    if (hintCount >= ex.hints.length) $('[data-x="morehint"]', hintsBox).disabled = true;
  }
  function runChecks() {
    const code = ed.getCode();
    const results = ex.checks.map(c => {
      let ok = false;
      try { ok = new RegExp(c.r, "i").test(code); } catch (e) { ok = false; }
      return { d: c.d, ok };
    });
    const pass = results.every(r => r.ok);
    resBox.innerHTML =
      '<div class="ex-check ' + (pass ? "pass" : "fail") + '">' +
      '<span class="ex-verdict">' + (pass ? "✓ Đạt yêu cầu! Làm tốt lắm." : "✗ Chưa đạt — xem lý do bên dưới:") + "</span>" +
      "<ul>" + results.map(r => '<li class="' + (r.ok ? "ok" : "no") + '"><span class="mark">' + (r.ok ? "✓" : "✗") + "</span><span>" + esc(r.d) + "</span></li>").join("") + "</ul>" +
      (pass ? "<p>Hai bài tập đều đạt thì hãy đánh dấu hoàn thành bài học nhé.</p>" : "") +
      "</div>";
    if (pass) {
      store.ex[lessonId + "-" + exIdx] = true; saveStore();
      toast("Bài tập " + (exIdx + 1) + " đạt yêu cầu!", "ok");
      /* Báo cho trang Thực hành (nếu đang mở) cập nhật trạng thái card */
      document.dispatchEvent(new CustomEvent("ex-passed", { detail: { lessonId, exIdx } }));
    }
  }
  wrap.addEventListener("click", e => {
    const b = e.target.closest("[data-x]");
    if (!b || !wrap.contains(b)) return;
    const act = b.dataset.x;
    if (act === "hint") { hintsBox.hidden = !hintsBox.hidden; if (!hintsBox.hidden && hintCount === 0) addHint(); }
    else if (act === "morehint") addHint();
    else if (act === "solution") solBox.hidden = !solBox.hidden;
    else if (act === "usesol") { ed.setCode(ex.solution); toast("Đã nạp lời giải — hãy đọc hiểu rồi tự gõ lại nhé!"); }
    else if (act === "check") runChecks();
  });
}

/* ---------- B11. TIẾN ĐỘ, HUY HIỆU, BOOKMARK ---------- */
const PARTS = [
  { id: 1, name: "Phần 1 — HTML cơ bản", short: "HTML cơ bản", badge: "Nền tảng vững" },
  { id: 2, name: "Phần 2 — HTML nâng cao", short: "HTML nâng cao", badge: "Tay nghề cứng" },
  { id: 3, name: "Phần 3 — Mở rộng nâng cao", short: "Mở rộng nâng cao", badge: "Về đích chuyên gia" }
];
const SHORT_TITLES = {
  1: "Làm quen với HTML", 2: "Khung tài liệu & cú pháp", 3: "Văn bản", 4: "Danh sách",
  5: "Liên kết", 6: "Hình ảnh", 7: "Block, inline & ngữ nghĩa", 8: "Bảng cơ bản",
  9: "Bảng nâng cao", 10: "Biểu mẫu 1: input", 11: "Biểu mẫu 2: select…", 12: "Kiểm tra dữ liệu",
  13: "Audio & video", 14: "Iframe & SVG", 15: "Details, dialog, meter", 16: "ARIA & SEO"
};
const lessonsOfPart = p => LESSONS.filter(l => l.part === p.id);
const partDoneCount = p => lessonsOfPart(p).filter(l => store.done[l.id]).length;
const isPartComplete = p => partDoneCount(p) === lessonsOfPart(p).length;
const totalDone = () => LESSONS.filter(l => store.done[l.id]).length;

function updateProgressUI() {
  const pct = Math.round(totalDone() / LESSONS.length * 100);
  $("#mini-progress-bar").style.width = pct + "%";
  $("#mini-progress-text").textContent = pct + "%";
}
function toggleDone(id) {
  const wasComplete = {};
  PARTS.forEach(p => wasComplete[p.id] = isPartComplete(p));
  if (store.done[id]) delete store.done[id]; else store.done[id] = true;
  saveStore(); updateProgressUI(); renderSidebar();
  PARTS.forEach(p => {
    if (!wasComplete[p.id] && isPartComplete(p))
      toast("Chúc mừng! Hoàn thành " + p.name + ' — nhận huy hiệu "' + p.badge + '"!', "ok");
  });
}
function toggleMark(id) {
  const i = store.marks.indexOf(id);
  if (i === -1) store.marks.push(id); else store.marks.splice(i, 1);
  saveStore(); renderSidebar();
  return i === -1;
}
function resetProgress() {
  if (!window.confirm("Xóa toàn bộ tiến độ, điểm quiz và bookmark đã lưu?")) return;
  store.done = {}; store.best = {}; store.ex = {}; store.marks = []; store.last = 0;
  saveStore(); updateProgressUI(); renderSidebar(); route();
  toast("Đã reset toàn bộ tiến độ.");
}

/* ---------- B12. TOAST ---------- */
function toast(msg, kind = "") {
  const box = $("#toast-box");
  const t = document.createElement("div");
  t.className = "toast " + kind; t.textContent = msg;
  box.appendChild(t);
  setTimeout(() => {
    t.style.opacity = "0"; t.style.transition = "opacity .2s ease";
    setTimeout(() => t.remove(), 220);
  }, 2600);
}

/* ---------- B13. SIDEBAR (accordion từng phần, badge số, icon trạng thái) ---------- */
function renderSidebar() {
  const nav = $("#side-nav");
  const cur = (location.hash.match(/^#bai-(\d+)$/) || [])[1];
  const curPart = cur ? (LESSONS.find(l => l.id === +cur) || {}).part : null;
  let html = "";
  PARTS.forEach(p => {
    const ls = lessonsOfPart(p);
    const done = partDoneCount(p);
    const pct = Math.round(done / ls.length * 100);
    const complete = isPartComplete(p);
    /* Phần chứa bài đang xem luôn mở; các phần khác nhớ trạng thái thu gọn */
    const collapsed = p.id !== curPart && !!store.collapsed[p.id];
    html += '<div class="side-part' + (collapsed ? " collapsed" : "") + '" data-part="' + p.id + '">' +
      '<button type="button" class="side-part-head" aria-expanded="' + !collapsed + '">' +
        '<svg class="side-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<span class="side-part-name">Phần ' + p.id + ' <small>· ' + esc(p.short) + "</small></span>" +
        '<span class="side-part-count' + (complete ? " done" : "") + '" title="' + (complete ? "Huy hiệu: " + p.badge : done + "/" + ls.length + " bài hoàn thành") + '">' + (complete ? "✓ " : "") + done + "/" + ls.length + "</span>" +
      "</button>" +
      '<div class="side-part-bar"><i style="width:' + pct + '%"></i></div>' +
      '<div class="side-items"><div class="side-items-inner">';
    ls.forEach(l => {
      const cls = ["side-link"];
      if (store.done[l.id]) cls.push("done");
      if (+cur === l.id) cls.push("active");
      html += '<a class="' + cls.join(" ") + '" href="#bai-' + l.id + '" title="Bài ' + l.id + ": " + esc(SHORT_TITLES[l.id]) + '">' +
        '<span class="side-num">' + String(l.id).padStart(2, "0") + "</span>" +
        '<span class="side-name">' + esc(SHORT_TITLES[l.id]) + "</span>" +
        (store.marks.includes(l.id) ? '<span class="side-star" title="Đã bookmark">★</span>' : "") +
        '<span class="side-status" title="' + (store.done[l.id] ? "Đã hoàn thành" : "Chưa hoàn thành") + '">✓</span></a>';
    });
    html += "</div></div></div>";
  });
  nav.innerHTML = html;
}
function openSidebar() { $("#sidebar").classList.add("open"); $("#sidebar-overlay").hidden = false; $("#btn-menu").setAttribute("aria-expanded", "true"); }
function closeSidebar() { $("#sidebar").classList.remove("open"); $("#sidebar-overlay").hidden = true; $("#btn-menu").setAttribute("aria-expanded", "false"); }
const sideMQ = window.matchMedia("(min-width: 901px)");
function applySideState(moveFocus) {
  const hide = !!store.sideHidden && sideMQ.matches;
  $(".app").classList.toggle("side-hidden", hide);
  $("#sidebar").inert = hide;
  $("#btn-side-collapse").setAttribute("aria-expanded", String(!hide));
  $("#btn-side-open").setAttribute("aria-expanded", String(!hide));
  if (moveFocus) (hide ? $("#btn-side-open") : $("#btn-side-collapse")).focus();
}
function toggleSide(moveFocus) {
  store.sideHidden = !store.sideHidden;
  saveStore();
  applySideState(moveFocus);
}

/* ---------- B14. TÌM KIẾM TOÀN SITE ---------- */
let searchIndex = [];
function buildSearchIndex() {
  searchIndex = [];
  LESSONS.forEach(l => searchIndex.push({
    type: "lesson", icon: String(l.id).padStart(2, "0"), title: "Bài " + l.id + ": " + l.title,
    sub: "Phần " + l.part + " · " + l.minutes + " phút", hash: "#bai-" + l.id,
    text: norm("bai " + l.id + " " + l.title + " " + l.goals.join(" ") + " " + l.summary.join(" "))
  }));
  CHEATSHEET.tags.forEach(t => searchIndex.push({
    type: "tag", icon: "&lt;&gt;", title: "<" + t[0] + ">", sub: t[1], hash: "#bang-tra", text: norm(t[0] + " " + t[1])
  }));
  CHEATSHEET.attrs.forEach(a => searchIndex.push({
    type: "tag", icon: "=", title: a[0], sub: "Thuộc tính · " + a[1], hash: "#bang-tra", text: norm(a[0] + " " + a[1])
  }));
}
let searchSel = 0, searchItems = [];
function openSearch() {
  $("#search-modal").hidden = false;
  const inp = $("#search-input");
  inp.value = ""; renderSearch("");
  setTimeout(() => inp.focus(), 30);
}
function closeSearch() { $("#search-modal").hidden = true; }
function renderSearch(query) {
  const box = $("#search-results");
  const q = norm(query.trim());
  searchSel = 0; searchItems = [];
  if (!q) {
    // Chưa gõ gì: hiện bài đã bookmark + gợi ý
    const marks = store.marks.map(id => searchIndex.find(x => x.hash === "#bai-" + id)).filter(Boolean);
    let html = "";
    if (marks.length) {
      html += '<div class="sr-group">★ Bài đã bookmark</div>';
      marks.forEach(m => { searchItems.push(m); html += srItem(m, searchItems.length - 1); });
    }
    html += '<div class="sr-group">Gợi ý</div>';
    ["#bai-1", "#thuc-hanh", "#bang-tra", "#kiem-tra"].forEach((h, i) => {
      const item = { type: "lesson", icon: "→", title: { "#bai-1": "Bắt đầu từ Bài 1", "#thuc-hanh": "Luyện 32 bài thực hành", "#bang-tra": "Mở Bảng tra (cheat sheet)", "#kiem-tra": "Làm bài kiểm tra cuối khóa" }[h], sub: "", hash: h };
      searchItems.push(item); html += srItem(item, searchItems.length - 1);
    });
    box.innerHTML = html;
  } else {
    const found = searchIndex.filter(x => x.text.includes(q)).slice(0, 14);
    if (!found.length) { box.innerHTML = '<div class="sr-empty">Không tìm thấy "' + esc(query) + '". Thử từ khóa khác: thẻ, thuộc tính, tên bài…</div>'; return; }
    const groups = { lesson: "Bài học", tag: "Thẻ & thuộc tính" };
    let html = "";
    ["lesson", "tag"].forEach(g => {
      const list = found.filter(x => x.type === g);
      if (!list.length) return;
      html += '<div class="sr-group">' + groups[g] + "</div>";
      list.forEach(m => { searchItems.push(m); html += srItem(m, searchItems.length - 1); });
    });
    box.innerHTML = html;
  }
  markSearchSel();
  $$(".sr-item", box).forEach(b => b.addEventListener("click", () => gotoSearchItem(+b.dataset.i)));
}
function srItem(m, i) {
  return '<button type="button" class="sr-item" data-i="' + i + '" role="option">' +
    '<span class="sr-icon ' + m.type + '">' + m.icon + "</span>" +
    "<span><span>" + esc(m.title) + "</span>" + (m.sub ? "<small>" + esc(m.sub) + "</small>" : "") + "</span></button>";
}
function markSearchSel() {
  $$(".sr-item").forEach((b, i) => b.classList.toggle("sel", i === searchSel));
  const sel = $('.sr-item.sel'); if (sel) sel.scrollIntoView({ block: "nearest" });
}
function gotoSearchItem(i) {
  const m = searchItems[i]; if (!m) return;
  closeSearch();
  if (location.hash === m.hash) route(); else location.hash = m.hash;
}

/* ---------- B15. CÁC TRANG: TRANG CHỦ, LỘ TRÌNH ---------- */
const LEVELS = [
  { name: "Người mới", ids: [1, 2], desc: "Làm quen & khung tài liệu" },
  { name: "Cơ bản", ids: [3, 4, 5, 6, 7], desc: "Văn bản, danh sách, liên kết, ảnh" },
  { name: "Trung cấp", ids: [8, 9, 10, 11, 12], desc: "Bảng & biểu mẫu đầy đủ" },
  { name: "Nâng cao", ids: [13, 14, 15, 16], desc: "Media, nhúng, tương tác, ARIA/SEO" }
];
function levelStatus(ids) {
  const done = ids.filter(id => store.done[id]).length;
  if (done === ids.length) return "done";
  if (done > 0 || ids.includes(store.last)) return "doing";
  return "todo";
}
function roadmapHTML() {
  return '<div class="roadmap">' + LEVELS.map((lv, i) => {
    const st = levelStatus(lv.ids);
    const minutes = lv.ids.reduce((n, id) => n + LESSONS.find(l => l.id === id).minutes, 0);
    const stLabel = { todo: "Chưa học", doing: "Đang học", done: "Hoàn thành" }[st];
    return '<div class="milestone st-' + st + '">' +
      '<span class="m-level">Cột mốc ' + (i + 1) + "</span><h3>" + lv.name + "</h3>" +
      '<p class="m-meta">' + lv.ids.length + " bài · ~" + minutes + " phút<br>" + lv.desc + "</p>" +
      '<span class="m-status ' + st + '">' + stLabel + "</span>" +
      '<ul class="m-list">' + lv.ids.map(id =>
        '<li><a href="#bai-' + id + '"><span class="m-dot ' + (store.done[id] ? "done" : id === store.last ? "doing" : "") + '"></span>Bài ' + id + ": " + esc(SHORT_TITLES[id]) + "</a></li>"
      ).join("") + "</ul></div>";
  }).join("") + "</div>";
}
function partCardHTML(p) {
  const ls = lessonsOfPart(p), done = partDoneCount(p), pct = Math.round(done / ls.length * 100);
  const complete = isPartComplete(p);
  return '<div class="part-card"><h3>' + p.name + "</h3>" +
    '<span class="part-meta">Bài ' + ls[0].id + "–" + ls[ls.length - 1].id + " · " + done + "/" + ls.length + " bài hoàn thành</span>" +
    '<div class="part-progress"><i style="width:' + pct + '%"></i></div>' +
    '<span class="part-pct">' + pct + "%</span>" +
    '<span class="badge-chip ' + (complete ? "" : "locked") + '">' + (complete ? "✓ Huy hiệu: " + p.badge : "Huy hiệu: " + p.badge + " (chưa mở)") + "</span></div>";
}
/* Icon + thẻ KPI cho thống kê trang chủ */
const KPI_ICONS = {
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z"/><path d="M4 20.5V5.5M20 18v3H6.5"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13 4l-2 16"/></svg>',
  quiz: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.6L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5Z"/><path d="M9.5 9a2.5 2.5 0 0 1 4.9.6c0 1.7-2.4 2.2-2.4 3.4"/><circle cx="12" cy="16.5" r=".6" fill="currentColor"/></svg>',
  task: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v4H9zM9 5H5v16h14V5h-4"/><path d="m9 14 2 2 4-4"/></svg>'
};
function kpi(color, num, label, icon) {
  return '<div class="kpi-card"><span class="kpi-icon ' + color + '">' + icon + "</span>" +
    '<span><span class="kpi-num">' + num + '</span><span class="kpi-label">' + label + "</span></span></div>";
}
function renderHome(app) {
  const totalExamples = LESSONS.reduce((n, l) => n + l.examples.filter(e => !e.static).length, 0);
  const totalQuiz = Object.values(QUIZ).reduce((n, a) => n + a.length, 0);
  const cont = LESSONS.find(l => l.id === store.last && !store.done[l.id]) || LESSONS.find(l => !store.done[l.id]) || LESSONS[0];
  const started = totalDone() > 0 || store.last > 0;
  const totalExercises = LESSONS.reduce((n, l) => n + l.exercises.length, 0);
  /* Khối preview code HTML sinh động bên phải hero (mỗi dòng hiện lần lượt) */
  const heroLines = [
    "<!DOCTYPE html>", '<html lang="vi">', "  <head>", '    <title>Trang đầu tiên</title>',
    "  </head>", "  <body>", "    <h1>Xin chào, HTML!</h1>", "    <p>Tôi đang học lập trình web.</p>",
    "  </body>", "</html>"
  ];
  const previewBody = heroLines.map((ln, i) =>
    '<span class="ln" style="animation-delay:' + (i * 0.12).toFixed(2) + 's">' + highlightLine(ln) +
    (i === heroLines.length - 1 ? '<span class="cp-caret"></span>' : "") + "</span>"
  ).join("");
  app.innerHTML =
  '<section class="hero">' +
    '<div class="hero-main">' +
      '<span class="hero-kicker">Khóa học HTML5 · Miễn phí · 100% tiếng Việt</span>' +
      "<h1>Học <span class=\"grad\">HTML</span> từ số 0,<br>thấy kết quả ngay từng dòng code</h1>" +
      '<p class="lead">16 bài học theo lộ trình từ người mới đến nâng cao. Mỗi thẻ, mỗi thuộc tính đều có ô live code chạy ngay trong trình duyệt — kèm chế độ chạy từng dòng, 160 câu quiz và bài tập tự chấm.</p>' +
      '<div class="hero-actions">' +
        '<a class="btn" href="#bai-' + cont.id + '">' + (started ? "Tiếp tục: Bài " + cont.id + " — " + esc(SHORT_TITLES[cont.id]) : "Bắt đầu học") + "</a>" +
        '<a class="btn secondary" href="#thuc-hanh">Luyện thực hành</a>' +
      "</div>" +
    "</div>" +
    '<div class="hero-code"><div class="code-preview" aria-hidden="true">' +
      '<div class="cp-head"><span class="cp-dot r"></span><span class="cp-dot y"></span><span class="cp-dot g"></span>' +
        '<span class="cp-tab">index.html</span><span class="cp-live"><i></i>Live</span></div>' +
      '<div class="cp-body">' + previewBody + "</div>" +
      '<div class="cp-result"><span class="cp-result-label">Kết quả</span><h4>Xin chào, HTML!</h4><p>Tôi đang học lập trình web.</p></div>' +
    "</div></div>" +
  "</section>" +
  '<section class="kpi-grid" aria-label="Thống kê khóa học">' +
    kpi("c1", "16", "bài học", KPI_ICONS.book) +
    kpi("c2", String(totalExamples), "ví dụ live code", KPI_ICONS.code) +
    kpi("c3", String(totalQuiz), "câu quiz", KPI_ICONS.quiz) +
    kpi("c4", String(totalExercises), "bài tập tự chấm", KPI_ICONS.task) +
  "</section>" +
  '<section class="lesson-section" id="cach-hoc"><h2>Cách học hiệu quả — 3 bước</h2>' +
    '<div class="steps-grid">' +
      '<div class="step-card"><span class="step-num">1</span><h3>Đọc & chạy thử</h3><p>Đọc khái niệm rồi sửa code trong từng ô live code để thấy kết quả đổi ngay. Bấm "Chạy từng dòng" để hiểu từng thẻ làm gì.</p></div>' +
      '<div class="step-card"><span class="step-num">2</span><h3>Luyện bài tập</h3><p>Mỗi bài có 2 bài tập tự chấm: làm, bấm Kiểm tra, xem gợi ý từng bước khi bí — chỉ xem lời giải sau cùng.</p></div>' +
      '<div class="step-card"><span class="step-num">3</span><h3>Quiz & đánh dấu</h3><p>Trả lời 10 câu quiz, làm lại câu sai rồi đánh dấu Hoàn thành. Cuối khóa làm bài kiểm tra 30 câu ngẫu nhiên.</p></div>' +
    "</div></section>" +
  '<section class="lesson-section" id="lo-trinh-tom-tat"><h2>Lộ trình học</h2>' + roadmapHTML() + "</section>" +
  '<section class="lesson-section" id="tien-do"><h2>Tiến độ của bạn</h2>' +
    '<div class="part-cards">' + PARTS.map(partCardHTML).join("") + "</div>" +
    '<p style="margin-top:14px"><button class="btn small ghost" id="home-reset" type="button">Reset toàn bộ tiến độ</button></p></section>';
  $("#home-reset").addEventListener("click", resetProgress);
}

/* ---------- B15b. TIỆN ÍCH: TRÌNH PHÁT YOUTUBE (YouTube IFrame Player API) ---------- */
/* Nạp thư viện chính thức https://www.youtube.com/iframe_api MỘT lần cho cả site.
   Dùng API (không phải iframe tĩnh) để điều khiển phát/dừng/âm lượng bằng JavaScript. */
let ytApiInjected = false, ytApiReady = false, ytApiFailed = false;
const ytReadyCallbacks = [];
window.onYouTubeIframeAPIReady = function () {
  ytApiReady = true;
  ytReadyCallbacks.splice(0).forEach(cb => { try { cb(); } catch (e) {} });
};
function ensureYouTubeApi() {
  if (ytApiInjected) return;
  ytApiInjected = true;
  const s = document.createElement("script");
  s.src = "https://www.youtube.com/iframe_api";
  s.async = true;
  s.onerror = () => { ytApiFailed = true; };
  document.head.appendChild(s);
}
function whenYtReady(cb) { if (ytApiReady) cb(); else ytReadyCallbacks.push(cb); }

/* Bóc tách ID YouTube (11 ký tự) từ mọi dạng link: watch?v=, youtu.be/,
   /embed/, /shorts/, /live/, /v/ — hoặc một ID thô. Trả null nếu không hợp lệ. */
function parseYouTubeId(url) {
  if (!url) return null;
  const s = String(url).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  let m = s.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = s.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  m = s.match(/youtube\.com\/(?:embed|shorts|live|v)\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  return null;
}

/* Icon SVG cho các nút điều khiển */
const YT_ICON = {
  play: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5.3v13.4L19 12z" fill="currentColor"/></svg>',
  pause: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M7 5h3.3v14H7zM13.7 5H17v14h-3.3z" fill="currentColor"/></svg>',
  volHigh: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16.5 8.8a4.2 4.2 0 0 1 0 6.4M19 6.2a7.4 7.4 0 0 1 0 11.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  volLow: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="M16.5 9.4a3.2 3.2 0 0 1 0 5.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  muted: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor"/><path d="m16.5 9.5 5 5m0-5-5 5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
  music: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 18V5.5l12-2.2V16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6.6" cy="18" r="2.6" fill="currentColor"/><circle cx="18.4" cy="16" r="2.6" fill="currentColor"/></svg>',
  chev: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
};

/* Trạng thái player (một trình phát ẩn dùng chung toàn site, không hủy khi chuyển trang) */
let ytPlayer = null, ytPlayerReady = false, ytPendingId = null;
let audioSetOpen = null; /* hàm đóng/mở popup, gán bởi buildAudioDock, dùng cho phím Esc */

/* Trình phát nhạc ẩn dạng "floating audio dock": neo gọn ở góc trên bên phải
   (trong cụm nút header), mặc định thu gọn thành nút icon nhạc; bấm để bung popup điều khiển.
   Khung video YouTube đẩy ra ngoài màn hình (1px) — chỉ lấy tiếng. Player sống xuyên suốt mọi trang. */
function buildAudioDock() {
  const actions = document.querySelector(".top-actions");
  if (!actions || document.querySelector("#audio-dock")) return;
  const dock = document.createElement("div");
  dock.className = "audio-dock"; dock.id = "audio-dock";
  dock.innerHTML =
    '<button class="audio-pill" id="audio-pill" type="button" aria-expanded="false" aria-controls="audio-panel" aria-label="Mở trình phát nhạc YouTube" title="Trình phát nhạc YouTube">' +
      '<span class="audio-ic">' + YT_ICON.music + "</span>" +
    "</button>" +
    '<div class="audio-panel" id="audio-panel" hidden role="dialog" aria-label="Trình phát nhạc YouTube">' +
      '<div class="audio-panel-head"><span>Trình phát nhạc YouTube</span><button class="audio-close" id="audio-close" type="button" aria-label="Thu gọn">' + YT_ICON.close + "</button></div>" +
      '<div class="audio-now"><span class="audio-eq" aria-hidden="true"><i></i><i></i><i></i></span><span class="audio-now-text"><span class="audio-title" id="audio-title">Nhạc nền</span><span class="audio-state" id="audio-state">Chưa phát · dán link để nghe</span></span></div>' +
      '<div class="yt-input-row">' +
        '<input id="yt-url" class="yt-input" type="text" inputmode="url" autocomplete="off" placeholder="Dán link YouTube…" aria-label="Link YouTube">' +
        '<button id="yt-load" class="btn small" type="button">' + YT_ICON.play + "<span>Tải / Phát</span></button>" +
      "</div>" +
      '<p class="yt-error" id="yt-error" role="alert" hidden></p>' +
      '<div class="yt-controls" aria-label="Điều khiển trình phát">' +
        '<button id="yt-pp" class="yt-btn" type="button" aria-label="Phát">' + YT_ICON.play + "</button>" +
        '<button id="yt-mute" class="yt-btn" type="button" aria-label="Tắt tiếng">' + YT_ICON.muted + "</button>" +
        '<input id="yt-vol" class="yt-vol" type="range" min="0" max="100" step="1" value="70" aria-label="Âm lượng">' +
        '<span class="yt-vol-num" id="yt-volnum">70</span>' +
      "</div>" +
      '<p class="audio-hint">Chỉ phát tiếng — khung video YouTube được ẩn hoàn toàn.</p>' +
    "</div>" +
    '<div class="yt-audio-frame" aria-hidden="true"><div id="yt-frame"></div></div>';
  actions.appendChild(dock);

  const pill = dock.querySelector("#audio-pill");
  const panel = dock.querySelector("#audio-panel");
  const errEl = dock.querySelector("#yt-error");
  const ppBtn = dock.querySelector("#yt-pp");
  const muteBtn = dock.querySelector("#yt-mute");
  const vol = dock.querySelector("#yt-vol");
  const volnum = dock.querySelector("#yt-volnum");
  const titleEl = dock.querySelector("#audio-title");
  const stateEl = dock.querySelector("#audio-state");
  let open = false;

  function setOpen(v) {
    open = v; panel.hidden = !v;
    pill.setAttribute("aria-expanded", String(v));
    dock.classList.toggle("open", v);
    if (v) setTimeout(() => { const i = panel.querySelector("#yt-url"); if (i) i.focus(); }, 80);
  }
  audioSetOpen = setOpen;

  function showErr(msg) { errEl.textContent = msg || ""; errEl.hidden = !msg; }
  function setPP(playing) { ppBtn.innerHTML = playing ? YT_ICON.pause : YT_ICON.play; ppBtn.setAttribute("aria-label", playing ? "Tạm dừng" : "Phát"); }
  function setVolIcon() {
    const v = +vol.value;
    let muted = false;
    try { muted = !!(ytPlayer && ytPlayerReady && ytPlayer.isMuted()); } catch (e) {}
    muteBtn.innerHTML = (muted || v === 0) ? YT_ICON.muted : (v < 50 ? YT_ICON.volLow : YT_ICON.volHigh);
    muteBtn.setAttribute("aria-label", muted ? "Bật tiếng" : "Tắt tiếng");
  }
  /* Đồng bộ mini-bar: tiêu đề bài (getVideoData) + trạng thái phát + hiệu ứng sóng nhạc */
  function refreshMeta() {
    let title = "Nhạc nền", state = "Chưa phát · dán link để nghe", playing = false;
    if (ytPlayer && ytPlayerReady) {
      try { const d = ytPlayer.getVideoData(); if (d && d.title) title = d.title; } catch (e) {}
      let st = -1; try { st = ytPlayer.getPlayerState(); } catch (e) {}
      if (st === 1) { state = "Đang phát"; playing = true; }
      else if (st === 3) { state = "Đang tải…"; playing = true; }
      else if (st === 2) state = "Tạm dừng";
      else if (st === 0) state = "Đã hết bài";
      else state = "Sẵn sàng · bấm phát";
    } else if (ytPendingId) state = "Đang tải…";
    titleEl.textContent = title; stateEl.textContent = state;
    dock.classList.toggle("playing", playing);
    setPP(playing);
  }

  function createPlayer() {
    ensureYouTubeApi();
    whenYtReady(() => {
      if (ytPlayer || typeof YT === "undefined" || !YT.Player) return;
      ytPlayer = new YT.Player("yt-frame", {
        playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3 },
        events: {
          onReady(e) {
            ytPlayerReady = true;
            /* iframe cross-origin cần allow="autoplay" để thừa hưởng quyền tự phát từ thao tác bấm của người dùng */
            try {
              const ifr = document.getElementById("yt-frame");
              if (ifr && ifr.tagName === "IFRAME") ifr.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen");
            } catch (err) {}
            try { e.target.setVolume(+vol.value); e.target.unMute(); } catch (err) {}
            setVolIcon();
            if (ytPendingId) { const id = ytPendingId; ytPendingId = null; try { e.target.loadVideoById(id); e.target.playVideo(); } catch (err) {} }
            refreshMeta();
          },
          onStateChange() { refreshMeta(); },
          onError() { showErr("Video này không phát được (có thể chủ kênh chặn nhúng). Hãy thử link khác nhé."); refreshMeta(); }
        }
      });
    });
  }

  function loadId(id) {
    showErr("");
    if (ytPlayer && ytPlayerReady) {
      try { ytPlayer.loadVideoById(id); ytPlayer.unMute(); ytPlayer.setVolume(+vol.value); ytPlayer.playVideo(); } catch (e) {}
    } else { ytPendingId = id; createPlayer(); }
    setTimeout(refreshMeta, 120);
    setTimeout(refreshMeta, 700);
  }
  function doLoad() {
    const id = parseYouTubeId(dock.querySelector("#yt-url").value);
    if (!id) { showErr("Link không hợp lệ — hãy dán link YouTube dạng youtube.com/watch?v=… hoặc youtu.be/…"); return; }
    loadId(id);
    if (ytApiFailed) showErr("Không tải được YouTube IFrame API — kiểm tra kết nối mạng rồi thử lại nhé.");
  }

  pill.addEventListener("click", e => { e.stopPropagation(); setOpen(!open); });
  dock.querySelector("#audio-close").addEventListener("click", e => { e.stopPropagation(); setOpen(false); });
  document.addEventListener("click", e => { if (open && !dock.contains(e.target)) setOpen(false); });
  dock.querySelector("#yt-load").addEventListener("click", doLoad);
  dock.querySelector("#yt-url").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); doLoad(); } });
  ppBtn.addEventListener("click", () => {
    if (!(ytPlayer && ytPlayerReady)) return;
    try {
      if (ytPlayer.getPlayerState() === 1) ytPlayer.pauseVideo();
      else { ytPlayer.unMute(); ytPlayer.setVolume(+vol.value); ytPlayer.playVideo(); }
    } catch (e) {}
    setTimeout(refreshMeta, 80);
    setTimeout(refreshMeta, 500);
  });
  muteBtn.addEventListener("click", () => {
    if (!(ytPlayer && ytPlayerReady)) return;
    try { if (ytPlayer.isMuted()) ytPlayer.unMuteVideo(); else ytPlayer.muteVideo(); } catch (e) {}
    setTimeout(setVolIcon, 60);
  });
  vol.addEventListener("input", () => {
    volnum.textContent = vol.value;
    if (ytPlayer && ytPlayerReady) { try { ytPlayer.setVolume(+vol.value); if (+vol.value > 0 && ytPlayer.isMuted()) ytPlayer.unMuteVideo(); } catch (e) {} }
    setVolIcon();
  });

  createPlayer(); /* nạp sẵn API; player ẩn giữ tiếng chạy xuyên suốt khi chuyển trang */
  refreshMeta();
  setInterval(refreshMeta, 700); /* đồng bộ icon/trạng thái liên tục, kể cả khi bỏ lỡ sự kiện state */
}

/* ---------- B16. TRANG BÀI HỌC ---------- */
function mistakeHTML(m) {
  return '<div class="mistake"><div class="mistake-cols">' +
    '<div class="mistake-col bad"><div class="mistake-label">✗ Sai</div>' + codeBlock(m.bad) + "</div>" +
    '<div class="mistake-col good"><div class="mistake-label">✓ Đúng</div>' + codeBlock(m.good) + "</div>" +
    '</div><div class="mistake-why">' + esc(m.why) + "</div></div>";
}
function renderLesson(app, lesson) {
  const part = PARTS.find(p => p.id === lesson.part);
  const idx = LESSONS.findIndex(l => l.id === lesson.id);
  const prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
  const best = store.best[lesson.id];
  const marked = store.marks.includes(lesson.id);
  app.innerHTML =
  '<nav class="breadcrumb" aria-label="Breadcrumb">' +
    '<a href="#/">Trang chủ</a><span class="sep">›</span>' +
    '<a href="#lo-trinh">' + part.name + '</a><span class="sep">›</span>' +
    '<span aria-current="page">Bài ' + lesson.id + "</span></nav>" +
  '<header class="lesson-head"><h1>Bài ' + lesson.id + ". " + esc(lesson.title) + "</h1>" +
    '<div class="lesson-meta">' +
      '<span class="meta-chip">~' + lesson.minutes + " phút đọc</span>" +
      '<span class="meta-chip">' + part.name + "</span>" +
      (best !== undefined ? '<span class="meta-chip">Quiz tốt nhất: ' + best + "/10</span>" : "") +
      '<button id="btn-mark" class="btn small ghost btn-bookmark ' + (marked ? "on" : "") + '" type="button" aria-pressed="' + marked + '">' + (marked ? "★ Đã bookmark" : "☆ Bookmark") + "</button>" +
    "</div></header>" +
  '<section class="lesson-section" id="muc-tieu"><h2>Mục tiêu bài học</h2><ul class="goal-list">' + lesson.goals.map(g => "<li>" + esc(g) + "</li>").join("") + "</ul></section>" +
  '<section class="lesson-section" id="khai-niem"><h2>Giải thích khái niệm</h2>' + lesson.intro + "</section>" +
  '<section class="lesson-section" id="cu-phap"><h2>Cú pháp</h2>' + codeBlock(lesson.syntax) + "</section>" +
  '<section class="lesson-section" id="live-code"><h2>Thực hành: Live code từng thẻ</h2>' +
    '<p class="callout info">Mỗi khối dưới đây là một ví dụ chạy được: sửa code bên trái, kết quả tự cập nhật bên phải (hoặc bấm ▶ Chạy / Ctrl+Enter). Bấm <b>Chạy từng dòng</b> để xem từng dòng hoạt động thế nào.</p>' +
    lesson.examples.map((ex, i) => '<h3 id="vi-du-' + (i + 1) + '">' + (i + 1) + ". " + esc(ex.t) + '</h3><div class="ex-host" data-ex="' + i + '"></div>').join("") +
  "</section>" +
  '<section class="lesson-section" id="loi-hay-gap"><h2>Lỗi hay gặp: sai vs đúng</h2>' + lesson.mistakes.map(mistakeHTML).join("") + "</section>" +
  '<section class="lesson-section" id="meo"><h2>Mẹo & best practice</h2><ul class="goal-list">' + lesson.tips.map(t => "<li>" + esc(t) + "</li>").join("") + "</ul></section>" +
  '<section class="lesson-section" id="bai-tap"><h2>Bài tập code (tự chấm)</h2><div id="ex-list"></div></section>' +
  '<section class="lesson-section" id="tom-tat"><h2>Tóm tắt</h2><div class="summary-box"><ol>' + lesson.summary.map(s => "<li>" + esc(s) + "</li>").join("") + "</ol></div></section>" +
  '<button id="btn-done" class="btn btn-complete ' + (store.done[lesson.id] ? "done" : "") + '" type="button">' + (store.done[lesson.id] ? "✓ Đã hoàn thành — bấm để bỏ đánh dấu" : "Đánh dấu Hoàn thành bài " + lesson.id) + "</button>" +
  '<section class="lesson-section" id="quiz"><h2>Quiz: 10 câu kiểm tra</h2><p>Chọn một đáp án mỗi câu — có giải thích ngay. Thứ tự đáp án được trộn mỗi lần làm.</p><div id="quiz-host"></div></section>' +
  '<nav class="lesson-nav" aria-label="Bài trước và bài tiếp">' +
    (prev ? '<a href="#bai-' + prev.id + '" class="prev"><span class="dir">← Bài trước</span><span class="ttl">Bài ' + prev.id + ". " + esc(SHORT_TITLES[prev.id]) + "</span></a>"
          : '<a class="disabled prev"><span class="dir">← Bài trước</span><span class="ttl">Đây là bài đầu tiên</span></a>') +
    (next ? '<a href="#bai-' + next.id + '" class="next"><span class="dir">Bài tiếp →</span><span class="ttl">Bài ' + next.id + ". " + esc(SHORT_TITLES[next.id]) + "</span></a>"
          : '<a class="disabled next" href="#kiem-tra"><span class="dir">Bài tiếp →</span><span class="ttl">Kiểm tra cuối khóa</span></a>') +
  "</nav>";

  // Ví dụ động → editor; ví dụ tĩnh (YouTube/Maps/SEO head) → code chỉ đọc
  lesson.examples.forEach((ex, i) => {
    const hostEl = $('.ex-host[data-ex="' + i + '"]', app);
    if (ex.static) hostEl.innerHTML = codeBlock(ex.code) + (ex.note ? '<p class="callout warn">' + esc(ex.note) + "</p>" : "");
    else createEditor(hostEl, { code: ex.code, title: ex.t, note: ex.note });
  });
  lesson.exercises.forEach((ex, i) => buildExercise($("#ex-list", app), ex, lesson.id, i));
  renderQuiz($("#quiz-host", app), QUIZ[lesson.id], { lessonId: lesson.id });

  $("#btn-mark").addEventListener("click", () => {
    const on = toggleMark(lesson.id);
    const b = $("#btn-mark");
    b.classList.toggle("on", on); b.setAttribute("aria-pressed", String(on));
    b.textContent = on ? "★ Đã bookmark" : "☆ Bookmark";
    toast(on ? "Đã bookmark Bài " + lesson.id + "." : "Đã bỏ bookmark Bài " + lesson.id + ".");
  });
  $("#btn-done").addEventListener("click", () => {
    toggleDone(lesson.id);
    const b = $("#btn-done"), d = !!store.done[lesson.id];
    b.classList.toggle("done", d);
    b.textContent = d ? "✓ Đã hoàn thành — bấm để bỏ đánh dấu" : "Đánh dấu Hoàn thành bài " + lesson.id;
  });
  buildToc(lesson);
}

/* Mục lục phải + tô sáng theo cuộn */
let tocObserver = null;
function buildToc(lesson) {
  const box = $("#toc-box");
  const items = [
    ["muc-tieu", "Mục tiêu"], ["khai-niem", "Khái niệm"], ["cu-phap", "Cú pháp"], ["live-code", "Live code"],
    ...lesson.examples.map((ex, i) => ["vi-du-" + (i + 1), (i + 1) + ". " + ex.t, true]),
    ["loi-hay-gap", "Lỗi hay gặp"], ["meo", "Mẹo & best practice"], ["bai-tap", "Bài tập"], ["tom-tat", "Tóm tắt"], ["quiz", "Quiz 10 câu"]
  ];
  box.innerHTML = '<p class="toc-title">Trong bài này</p>' + items.map(it =>
    '<a href="#' + it[0] + '" data-sec="' + it[0] + '" class="' + (it[2] ? "toc-sub" : "") + '">' + esc(it[1]) + "</a>"
  ).join("");
  $$("#toc-box a").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    const target = document.getElementById(a.dataset.sec);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  if (tocObserver) tocObserver.disconnect();
  const links = $$("#toc-box a");
  tocObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle("active", l.dataset.sec === en.target.id));
    });
  }, { rootMargin: "-80px 0px -65% 0px" });
  items.forEach(it => { const el = document.getElementById(it[0]); if (el) tocObserver.observe(el); });
}

/* ---------- B17. TRANG BẢNG TRA ---------- */
function cheatSection(k, title, heads) {
  const rows = CHEATSHEET[k].map(row => "<tr>" + row.map((cell, i) => {
    if (k === "tags" && i === 0) return '<td><span class="tag-name">&lt;' + esc(cell) + "&gt;</span></td>";
    if (k === "tags" && i === 2) {
      const label = { block: "Block", inline: "Inline", head: "Trong head", both: "Cả hai" }[cell] || cell;
      return '<td><span class="kind-chip ' + (cell === "head" ? "both" : cell) + '">' + label + "</span></td>";
    }
    if ((k === "attrs" || k === "inputs") && i === 0) return '<td><span class="tag-name">' + esc(cell) + "</span></td>";
    if (k === "entities" && i === 0) return "<td><code>" + esc(cell) + "</code></td>";
    if (k === "shortcuts" && i === 0) return "<td><kbd>" + esc(cell) + "</kbd></td>";
    const isExample = (k === "tags" && i === 3) || (k === "attrs" && i === 3) || (k === "inputs" && i === 2) || (k === "semantic" && i === 2);
    if (isExample) return "<td><code>" + esc(cell) + "</code></td>";
    return "<td>" + esc(cell) + "</td>";
  }).join("") + "</tr>").join("");
  return '<section class="cheat-section" data-k="' + k + '" id="cheat-' + k + '"><h2>' + title + '</h2>' +
    '<div class="table-wrap"><table class="cheat"><thead><tr>' + heads.map(h => "<th>" + h + "</th>").join("") + "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
    '<p class="no-result" hidden>Không có mục nào khớp bộ lọc.</p></section>';
}
function renderCheatsheet(app) {
  app.classList.add("wide");
  const sections = [
    ["tags", "Bảng thẻ HTML", ["Thẻ", "Công dụng", "Loại", "Ví dụ"]],
    ["attrs", "Bảng thuộc tính", ["Thuộc tính", "Công dụng", "Dùng cho", "Ví dụ"]],
    ["inputs", "Bảng input type", ["Type", "Công dụng", "Ví dụ"]],
    ["entities", "Bảng entities (ký tự đặc biệt)", ["Cách viết", "Ký tự", "Ý nghĩa"]],
    ["semantic", "Bảng thẻ ngữ nghĩa", ["Thẻ", "Vai trò", "Ví dụ"]],
    ["shortcuts", "Phím tắt VS Code", ["Phím", "Tác dụng"]]
  ];
  const chipNames = { all: "Tất cả", tags: "Thẻ", attrs: "Thuộc tính", inputs: "Input type", entities: "Entities", semantic: "Ngữ nghĩa", shortcuts: "Phím tắt" };
  app.innerHTML =
    '<div class="page-head"><h1>Bảng tra nhanh (Cheat Sheet)</h1><p class="lead">Tra cứu thẻ, thuộc tính, kiểu input, entities, thẻ ngữ nghĩa và phím tắt VS Code. Gõ để lọc tức thì, hoặc in / lưu PDF.</p></div>' +
    '<div class="filter-bar">' +
      '<input id="cheat-q" class="filter-input" type="search" placeholder="Lọc bảng tra… (ví dụ: table, href, email)" aria-label="Lọc bảng tra">' +
      ["all"].concat(sections.map(s => s[0])).map(k => '<button class="chip' + (k === "all" ? " on" : "") + '" data-k="' + k + '" type="button">' + chipNames[k] + "</button>").join("") +
      '<button id="btn-print" class="btn small secondary" type="button">In / Lưu PDF</button>' +
    "</div>" +
    '<div id="cheat-sections">' + sections.map(s => cheatSection(s[0], s[1], s[2])).join("") + "</div>";
  const q = $("#cheat-q");
  let kind = "all";
  function apply() {
    const query = norm(q.value.trim());
    $$(".cheat-section").forEach(sec => {
      sec.hidden = kind !== "all" && sec.dataset.k !== kind;
      let visible = 0;
      $$("tbody tr", sec).forEach(tr => {
        const show = !query || norm(tr.textContent).includes(query);
        tr.hidden = !show; if (show) visible++;
      });
      $(".no-result", sec).hidden = visible > 0;
      $(".table-wrap", sec).hidden = visible === 0 && !!query;
    });
  }
  q.addEventListener("input", apply);
  $$(".chip").forEach(c => c.addEventListener("click", () => {
    kind = c.dataset.k;
    $$(".chip").forEach(x => x.classList.toggle("on", x === c));
    apply();
  }));
  $("#btn-print").addEventListener("click", () => window.print());
}

/* ---------- B18. TRANG THỰC HÀNH (gộp 32 bài tập, lọc theo Phần & trạng thái) ---------- */
let practiceObserver = null;  // lazy-mount editor khi card gần khung nhìn
let practiceCleanup = null;   // gỡ listener khi rời trang
function renderPractice(app) {
  app.classList.add("wide");
  /* Gộp toàn bộ bài tập từ 16 bài, giữ đúng thứ tự bài học */
  const all = [];
  LESSONS.forEach(l => l.exercises.forEach((ex, i) => all.push({ lesson: l, ex, idx: i, key: l.id + "-" + i })));
  let partFilter = "all", statusFilter = "all";
  const chip = (group, val, label) =>
    '<button type="button" class="chip' + (val === "all" ? " on" : "") + '" data-group="' + group + '" data-val="' + val + '">' + label + "</button>";
  app.innerHTML =
    '<div class="page-head"><h1>Bài thực hành</h1><p class="lead">Toàn bộ ' + all.length + ' bài tập code từ 16 bài học, gom về một nơi để luyện tập tập trung. Mỗi bài có ô live code, gợi ý từng bước, lời giải và chấm tự động.</p></div>' +
    '<div class="practice-filters">' +
      '<div class="pf-group" role="group" aria-label="Lọc theo phần"><span class="pf-label">Phần</span>' +
        chip("part", "all", "Tất cả") + chip("part", "1", "Phần 1") + chip("part", "2", "Phần 2") + chip("part", "3", "Phần 3") +
      '</div><span class="pf-sep" aria-hidden="true"></span>' +
      '<div class="pf-group" role="group" aria-label="Lọc theo trạng thái"><span class="pf-label">Trạng thái</span>' +
        chip("status", "all", "Tất cả") + chip("status", "todo", "Chưa làm") + chip("status", "done", "Đã đạt") +
      "</div>" +
      '<span class="practice-count" id="practice-count"></span>' +
    "</div>" +
    '<div id="practice-list"></div>';

  const list = $("#practice-list", app);
  const countEl = $("#practice-count", app);
  const updateCount = () => { countEl.innerHTML = "<b>" + all.filter(x => store.ex[x.key]).length + "</b>/" + all.length + " bài đã đạt"; };

  function renderList() {
    if (practiceObserver) { practiceObserver.disconnect(); practiceObserver = null; }
    /* Gỡ editor của các card sắp bị thay thế (chỉ editor nằm trong list này) */
    liveEditors = liveEditors.filter(ed => { if (list.contains(ed.el)) { try { ed.destroy(); } catch (e) {} return false; } return true; });
    const filtered = all.filter(x =>
      (partFilter === "all" || x.lesson.part === +partFilter) &&
      (statusFilter === "all" || (statusFilter === "done") === !!store.ex[x.key])
    );
    updateCount();
    if (!filtered.length) {
      list.innerHTML = '<div class="practice-empty"><b>Không có bài tập phù hợp</b>Thử đổi bộ lọc Phần hoặc Trạng thái nhé.</div>';
      return;
    }
    list.innerHTML = filtered.map((x, i) =>
      '<div class="practice-card" data-key="' + x.key + '">' +
        '<div class="practice-head">' +
          '<span class="practice-lesson">Bài ' + x.lesson.id + " · " + esc(SHORT_TITLES[x.lesson.id]) + "</span>" +
          '<span class="practice-status ' + (store.ex[x.key] ? "pass" : "todo") + '">' + (store.ex[x.key] ? "✓ Đã đạt" : "Chưa làm") + "</span>" +
          '<a class="practice-link" href="#bai-' + x.lesson.id + '">Xem bài học →</a>' +
        "</div>" +
        '<div class="practice-body" data-i="' + i + '"><div class="practice-skel">Đang tải ô code…</div></div>' +
      "</div>"
    ).join("");
    /* Lazy-mount: chỉ dựng editor khi card gần khung nhìn (32 editor cùng lúc rất nặng) */
    practiceObserver = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const body = en.target;
        practiceObserver.unobserve(body);
        const x = filtered[+body.dataset.i];
        body.innerHTML = "";
        buildExercise(body, x.ex, x.lesson.id, x.idx);
      });
    }, { rootMargin: "500px 0px" });
    $$(".practice-body", list).forEach(b => practiceObserver.observe(b));
  }

  /* Lọc bằng chip (event delegation trên thanh lọc) */
  $(".practice-filters", app).addEventListener("click", e => {
    const c = e.target.closest(".chip");
    if (!c) return;
    if (c.dataset.group === "part") partFilter = c.dataset.val; else statusFilter = c.dataset.val;
    $$('.chip[data-group="' + c.dataset.group + '"]', app).forEach(x => x.classList.toggle("on", x === c));
    renderList();
  });
  /* Khi một bài tập được chấm đạt: cập nhật badge card + bộ đếm tại chỗ */
  const onPassed = e => {
    const key = e.detail.lessonId + "-" + e.detail.exIdx;
    const card = $('.practice-card[data-key="' + key + '"]', list);
    if (card) {
      const st = $(".practice-status", card);
      st.className = "practice-status pass"; st.textContent = "✓ Đã đạt";
    }
    updateCount();
  };
  document.addEventListener("ex-passed", onPassed);
  practiceCleanup = () => document.removeEventListener("ex-passed", onPassed);
  renderList();
}

/* ---------- B19. TRANG KIỂM TRA CUỐI KHÓA ---------- */
function renderExam(app) {
  app.innerHTML =
    '<div class="page-head"><h1>Bài kiểm tra cuối khóa</h1><p class="lead">30 câu ngẫu nhiên lấy từ ngân hàng 160 câu của 16 bài — không có câu mới. Đạt khi đúng từ 24/30 (80%).</p></div>' +
    '<div class="exam-intro" id="exam-intro"><h2>Sẵn sàng chưa?</h2>' +
    "<ul><li>30 câu trắc nghiệm, 4 đáp án, trộn thứ tự mỗi lần làm.</li><li>Có giải thích ngay sau mỗi câu chọn.</li><li>Xem lại câu sai và gợi ý bài cần ôn khi làm xong.</li><li>Điểm đạt: ≥ 24/30 câu (80%).</li></ul>" +
    '<button class="btn" id="btn-start-exam" type="button">Bắt đầu kiểm tra</button></div>' +
    '<div id="exam-host"></div>';
  $("#btn-start-exam").addEventListener("click", () => {
    $("#exam-intro").hidden = true;
    const pool = [];
    Object.keys(QUIZ).forEach(id => QUIZ[id].forEach(q => pool.push(Object.assign({ lesson: +id }, q))));
    const picked = shuffle(pool).slice(0, 30);
    renderQuiz($("#exam-host"), picked, {
      exam: true,
      onDone: r => showExamReview(r.correct, r.total, r.state)
    });
    $("#exam-host").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
function showExamReview(correct, total, state) {
  const host = $("#exam-host");
  const pass = correct >= Math.ceil(total * 0.8);
  const wrong = state.filter(s => s.picked !== s.q.c);
  const byLesson = {};
  wrong.forEach(s => { byLesson[s.q.lesson] = (byLesson[s.q.lesson] || 0) + 1; });
  const suggest = Object.keys(byLesson).sort((a, b) => byLesson[b] - byLesson[a]);
  const panel = document.createElement("div");
  panel.className = "quiz-result";
  let html = '<div class="quiz-score">' + correct + "<small>/" + total + '</small></div>' +
    '<p class="quiz-verdict">' + (pass ? "ĐẠT yêu cầu — chúc mừng, bạn đã nắm vững khóa học!" : "Chưa đạt (cần ≥ 24/30) — xem gợi ý ôn tập bên dưới rồi thử lại nhé.") + "</p>";
  if (suggest.length) {
    html += '<div class="review-suggest"><b>Nên ôn lại:</b> ' + suggest.map(id => '<a href="#bai-' + id + '">Bài ' + id + " (" + byLesson[id] + " câu sai)</a>").join(" · ") + "</div>";
  }
  if (wrong.length) {
    html += '<div class="exam-review"><h3>Xem lại ' + wrong.length + " câu sai</h3>" + wrong.map(s =>
      '<div class="exam-review-item"><div class="q-title"><span>' + esc(s.q.q) + "</span></div>" +
      (s.q.code ? codeBlock(s.q.code) : "") +
      '<p class="ans no">Bạn chọn: ' + esc(s.q.a[s.picked]) + "</p>" +
      '<p class="ans ok">Đáp án đúng: ' + esc(s.q.a[s.q.c]) + "</p>" +
      "<p>" + esc(s.q.e) + ' — <a href="#bai-' + s.q.lesson + '">Ôn Bài ' + s.q.lesson + "</a></p></div>"
    ).join("") + "</div>";
  }
  html += '<div class="quiz-actions" style="margin-top:16px"><button class="btn" id="btn-new-exam" type="button">Làm đề mới (30 câu khác)</button></div>';
  panel.innerHTML = html;
  host.appendChild(panel);
  $("#btn-new-exam").addEventListener("click", () => renderExam($("#app")));
  panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- B20. ROUTER THEO HASH ---------- */
let currentPage = null; // hash đã render gần nhất (để phân biệt neo trong trang)
const PAGE_HASHES = ["#lo-trinh", "#thuc-hanh", "#bang-tra", "#kiem-tra"];
function setActiveNav(key) {
  $$(".topnav a").forEach(a => a.classList.toggle("active", a.dataset.nav === key));
}
function hideToc() {
  $(".app").classList.add("no-toc");
  $("#right-toc").hidden = true;
  $("#toc-box").innerHTML = "";
}
function route() {
  const hash = location.hash || "#/";
  /* Neo trong trang (vd skip-link #noi-dung-chinh): không phải route —
     giữ nguyên trang hiện tại, để trình duyệt tự cuộn tới phần tử. */
  const isRoute = hash === "#/" || /^#bai-\d+$/.test(hash) || PAGE_HASHES.indexOf(hash) !== -1;
  if (!isRoute && currentPage && document.getElementById(hash.slice(1))) return;
  destroyEditors();
  if (tocObserver) { tocObserver.disconnect(); tocObserver = null; }
  if (practiceObserver) { practiceObserver.disconnect(); practiceObserver = null; }
  if (practiceCleanup) { practiceCleanup(); practiceCleanup = null; }
  const app = $("#app");
  app.classList.remove("wide");
  closeSidebar();
  const m = hash.match(/^#bai-(\d+)$/);
  if (m) {
    const lesson = LESSONS.find(l => l.id === +m[1]);
    if (!lesson) { location.hash = "#/"; return; }
    store.last = lesson.id; saveStore();
    document.title = "Bài " + lesson.id + ": " + lesson.title + " — Học HTML";
    $(".app").classList.remove("no-toc");
    $("#right-toc").hidden = false;
    renderLesson(app, lesson);
    setActiveNav("");
  } else if (hash === "#bang-tra") {
    document.title = "Bảng tra nhanh — Học HTML";
    hideToc(); renderCheatsheet(app); setActiveNav("bang-tra");
  } else if (hash === "#thuc-hanh") {
    document.title = "Bài thực hành — Học HTML";
    hideToc(); renderPractice(app); setActiveNav("thuc-hanh");
  } else if (hash === "#kiem-tra") {
    document.title = "Kiểm tra cuối khóa — Học HTML";
    hideToc(); renderExam(app); setActiveNav("kiem-tra");
  } else if (hash === "#lo-trinh") {
    document.title = "Lộ trình học — Học HTML";
    hideToc();
    app.innerHTML = '<div class="page-head"><h1>Lộ trình học</h1><p class="lead">Bốn cột mốc từ người mới đến nâng cao. Trạng thái cập nhật theo tiến độ của bạn; bấm vào từng bài để học.</p></div>' + roadmapHTML();
    setActiveNav("lo-trinh");
  } else {
    document.title = "Học HTML Từ Số 0 — 16 bài học tương tác";
    hideToc(); renderHome(app); setActiveNav("home");
  }
  renderSidebar(); updateProgressUI();
  applySideState(false);
  currentPage = hash;
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/* ---------- B21. PHÍM TẮT TOÀN CỤC ---------- */
/* Popup phím tắt mở bằng nút ? trên header */
function closeShortcuts() {
  const pop = $("#shortcuts-pop");
  if (pop && !pop.hidden) { pop.hidden = true; $("#btn-shortcuts").setAttribute("aria-expanded", "false"); }
}
function toggleShortcuts() {
  const pop = $("#shortcuts-pop");
  const willOpen = pop.hidden;
  pop.hidden = !willOpen;
  $("#btn-shortcuts").setAttribute("aria-expanded", String(willOpen));
}
function onGlobalKey(e) {
  const ae = document.activeElement;
  const typing = ae && (/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName) || ae.isContentEditable);
  const modalOpen = !$("#search-modal").hidden;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault(); modalOpen ? closeSearch() : openSearch(); return;
  }
  if (e.key === "Escape") {
    if (modalOpen) closeSearch();
    closeShortcuts();
    if (audioSetOpen) audioSetOpen(false);
    closeSidebar();
    $$(".editor.pseudo-full").forEach(x => x.classList.remove("pseudo-full"));
    return;
  }
  if (modalOpen) return;
  if (e.key === "[" && !typing && sideMQ.matches) { e.preventDefault(); toggleSide(false); return; }
  if (e.key === "/" && !typing) { e.preventDefault(); openSearch(); return; }
  if (!typing && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
    const m = location.hash.match(/^#bai-(\d+)$/);
    if (m) {
      const next = +m[1] + (e.key === "ArrowRight" ? 1 : -1);
      if (next >= 1 && next <= LESSONS.length) location.hash = "#bai-" + next;
    }
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !typing && lastActiveEditor) {
    e.preventDefault(); lastActiveEditor.run();
  }
}

/* ---------- B22. KHỞI ĐỘNG ---------- */
function init() {
  loadStore(); initTheme(); buildSearchIndex();
  buildAudioDock(); /* trình phát nhạc ẩn neo góc trên phải, sống xuyên suốt các trang */
  $("#btn-theme").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    applyTheme(cur === "dark" ? "light" : "dark");
  });
  $("#btn-search").addEventListener("click", openSearch);
  $("#btn-shortcuts").addEventListener("click", e => { e.stopPropagation(); toggleShortcuts(); });
  document.addEventListener("click", e => {
    const pop = $("#shortcuts-pop");
    if (!pop.hidden && !pop.contains(e.target) && !e.target.closest("#btn-shortcuts")) closeShortcuts();
  });
  $("#btn-close-search").addEventListener("click", closeSearch);
  $("#search-modal").addEventListener("click", e => { if (e.target === e.currentTarget) closeSearch(); });
  $("#search-input").addEventListener("input", e => renderSearch(e.target.value));
  $("#search-input").addEventListener("keydown", e => {
    if (e.key === "ArrowDown") { e.preventDefault(); searchSel = Math.min(searchSel + 1, searchItems.length - 1); markSearchSel(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); searchSel = Math.max(searchSel - 1, 0); markSearchSel(); }
    else if (e.key === "Enter") { e.preventDefault(); gotoSearchItem(searchSel); }
  });
  $("#btn-menu").addEventListener("click", () => { $("#sidebar").classList.contains("open") ? closeSidebar() : openSidebar(); });
  $("#sidebar-overlay").addEventListener("click", closeSidebar);
  $("#btn-side-collapse").addEventListener("click", () => toggleSide(true));
  $("#btn-side-open").addEventListener("click", () => toggleSide(true));
  sideMQ.addEventListener("change", () => applySideState(false));
  applySideState(false);
  /* Accordion sidebar: thu gọn/mở rộng từng phần, nhớ trạng thái vào localStorage */
  $("#side-nav").addEventListener("click", e => {
    const head = e.target.closest(".side-part-head");
    if (!head) return;
    const part = head.closest(".side-part");
    const id = +part.dataset.part;
    const collapsed = part.classList.toggle("collapsed");
    head.setAttribute("aria-expanded", String(!collapsed));
    if (collapsed) store.collapsed[id] = true; else delete store.collapsed[id];
    saveStore();
  });
  $("#btn-reset-progress").addEventListener("click", resetProgress);
  $("#btn-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", debounce(() => { $("#btn-top").hidden = window.scrollY < 500; }, 100), { passive: true });
  window.addEventListener("hashchange", route);
  document.addEventListener("keydown", onGlobalKey);
  route();
}
document.addEventListener("DOMContentLoaded", init);