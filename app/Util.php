<?php

class Util
{
    const DB_SERVER_ERROR = "Server error occurred. Please try again later.";

    public static function dateToday($plus)
    {
        $dateToday = date("Y-m-d");
        if ($plus != '0') {
            return date('Y-m-d', strtotime($dateToday . ' + ' . $plus . ' days'));
        }
        return date("Y-m-d");
    }

    public static function timestampNow()
    {
        return date("Y-m-d H:i:s");
    }

    public static function displayAlertV1($msg, $type)
    {
        return '<div class="alert alert-' . $type . ' alert-dismissible fade show" role="alert">
          ' . $msg . '
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>';
    }

    public static function displayAlertV2($message, $type)
    {
        return '<div class="alert alert-' . $type . ' alert-dismissible fade show" role="alert">
          <h4 class="alert-heading">' . $message["heading"] . '</h4>
          <p>' . $message["content"] . '</p><hr>
          <p class="mb-0">' . $message["footer"] . '</p>
        </div>';
    }

    public static function sanitize_xss($value) 
    {
      return htmlspecialchars(strip_tags($value));
    }
      
  
}
