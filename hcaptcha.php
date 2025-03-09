<?php
    // Replace with your actual secret key from hCaptcha
    $secretKey = 'ES_54c11092ee6b4e528da600055be98508';

    // Get the hCaptcha response from the form submission
    $hcaptchaResponse = $_POST['h-captcha-response'];

    // Get the user's IP address
    $userIP = $_SERVER['REMOTE_ADDR'];

    // Prepare data for verification request
    $data = [
        'secret'   => $secretKey,
        'response' => $hcaptchaResponse,
        'remoteip' => $userIP
    ];

    // Create POST request to hCaptcha verification endpoint
    $verifyUrl = 'https://hcaptcha.com/siteverify';
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    $context  = stream_context_create($options);
    $response = file_get_contents($verifyUrl, false, $context);

    // Decode JSON response
    $responseData = json_decode($response);

    if ($responseData->success) {
        // hCaptcha validation passed
        // Continue processing form submission (e.g., save data, send email, etc.)
        echo 'Captcha verified successfully!';
    } else {
        // hCaptcha validation failed
        echo 'Captcha verification failed. Please try again.';
        exit;
    }
?>