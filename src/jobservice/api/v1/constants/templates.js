module.exports.welcomeEmail = (user) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to [Your Company Name]</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #ff6f00; /* Orange color */
            color: #ffffff;
            padding: 10px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            font-size: 20px;
            color: #ff6f00; /* Orange color */
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: #ffffff;
            background-color: #ff6f00; /* Orange color */
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 10px;
            text-align: center;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            text-align: center;
        }
        .footer a {
            color: #ff6f00; /* Orange color */
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to TechStore</h1>
        </div>
        <div class="content">
            <h2>Xin chào ${user.fullName},</h2>
            <p>Chào mừng bạn đến với K2H Team! Chúng tồi rất vui khi bạn đã tham gia cùng chúng tôi.</p>
            <p>Khám phá các sản phẩm đa dạng của chúng tôi và tận hưởng các ưu đãi đặc biệt. Chúng tôi cam kết cung cấp cho bạn trải nghiệm mua sắm tốt nhất có thể.</p>
            <a href="[Your Website URL]" class="button">Mua sắm ngay</a>
        </div>
        <div class="footer">
            <p>Chúc bạn mua sắm vui vẻ!</p>
            <p>Trân trọng,<br>K2H Team</p>
            <p>Nếu có bất kì câu hỏi hoặc sự hỗ trợ nào, hãy <a href="mailto:support@[yourcompany].com">liên hệ chúng tôi</a>.</p>
            <p>Theo dõi chúng tôi trên <a href="[Liên Kết Mạng Xã Hội Của Bạn]">mạng xã hội</a> để cập nhật và khuyến mãi.</p>
        </div>
    </div>
</body>
</html>
    `
    return html
}
