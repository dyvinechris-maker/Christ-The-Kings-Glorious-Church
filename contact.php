<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $first_name = htmlspecialchars($_POST['first_name']);
    $last_name  = htmlspecialchars($_POST['last_name']);
    $email      = htmlspecialchars($_POST['email']);
    $message    = htmlspecialchars($_POST['message']);

    $mail = new PHPMailer(true);

    try {

        // SMTP SETTINGS
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;

        // YOUR GMAIL
        $mail->Username   = 'dyvinechris@gmail.com';

        // YOUR APP PASSWORD
        $mail->Password   = 'fjeb oavq ayuk dwcf';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // SENDER
        $mail->setFrom('dyvinechris@gmail.com', 'Website Contact Form');

        // RECEIVER
        $mail->addAddress('dyvinechris@gmail.com');

        // REPLY TO USER
        $mail->addReplyTo($email, $first_name . ' ' . $last_name);

        // EMAIL CONTENT
        $mail->isHTML(true);

        $mail->Subject = 'New Website Message';

        $mail->Body = "
            <h3>New Contact Message</h3>

            <p><strong>First Name:</strong> {$first_name}</p>

            <p><strong>Last Name:</strong> {$last_name}</p>

            <p><strong>Email:</strong> {$email}</p>

            <p><strong>Message:</strong><br>{$message}</p>
        ";

        $mail->send();

        echo "
        <script>
            alert('Message Sent Successfully!');
            window.location.href='contact.php';
        </script>
        ";

    } catch (Exception $e) {

        echo "
        <script>
            alert('Message Failed: {$mail->ErrorInfo}');
            window.history.back();
        </script>
        ";

    }

}
?>