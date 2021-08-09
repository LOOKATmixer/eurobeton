<?php 

$name = $_POST['userName'];
$phone = $_POST['userPhone'];
$email = $_POST['userQuestion'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'd_m_b-2012@mail.ru';                 // Наш логин
$mail->Password = 'Premium1991';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('d_m_b-2012@mail.ru', 'Заявка с сайта');   // От кого письмо
$mail->addAddress('konkrid72@mail.ru'); // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'От konkrid.ru';
$mail->Body    = '
		<strong>Пользователь оставил данные</strong> <br> 
	<strong>Имя:</strong> ' . $name . ' <br>
	<strong>Номер телефона:</strong> ' . $phone . '<br>
	<strong>Вопрос:</strong> ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>