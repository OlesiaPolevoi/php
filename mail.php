<?php
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$name = $obj['user-name'];
$phone = $obj['user-phone'];

// Формирование самого письма
$title = "Заголовок письма";

$body = " <h2>Новое письмо</h2>
  <tr style='background-color: #f8f8f8;'>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Имя: </b>$name</td>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Номер телефона: </b>$phone</td>
  </tr>
  ";
$body = "<table style='width: 100%;'>$body</table>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;
  // $mail->SMTPDebug = 2; 
  $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

  // Настройки вашей почты
  $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username   = 'olesia.tiho@gmail.com'; // Логин на почте
  $mail->Password   = ''; // Пароль 
  

  $mail->Port       = 465;


  $mail->SMTPSecure = 'ssl';

  $mail->setFrom('olesia.tiho@gmail.com', 'Olesia Polevoi'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('olesia.tiho@gmail.com');
  $mail->addAddress('olesia.polevoi@gmail.com');



  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
  $result = "error";
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "status" => $status]);