<?php
class User {
	public $user_active = 0;
	private $clean_email;
	public $status = false;
	private $clean_password;
	private $clean_username;
	private $unclean_username;
	public $sql_failure = false;
	public $mail_failure = false;
	public $email_taken = false;
	public $username_taken = false;
	public $activation_token = 0;
	
	function __construct($pass,$email,$unique) {		
		$this->clean_email = sanitize($email);
		$this->clean_password = trim($pass);
		$this->user_token = $unique;
		
		if(emailExists($this->clean_email)) {
			$this->email_taken = true;
		} else {
			$this->status = true;
		}
	}
	
	public function userCakeAddUser() {
		global $db,$emailActivation,$websiteUrl,$db_table_prefix;
	
		if($this->status) {
			$secure_pass = generateHash($this->clean_password);
			
			$this->activation_token = generateActivationToken();
	
			if($emailActivation) {
				$this->user_active = 0;
			
				$mail = new userCakeMail();
			
				$activation_message = lang("ACTIVATION_MESSAGE",array($websiteUrl,$this->activation_token));
				
				$hooks = array(
					"searchStrs" => array("#ACTIVATION-MESSAGE","#ACTIVATION-KEY","#USERNAME#"),
					"subjectStrs" => array($activation_message,$this->activation_token,$this->unclean_username)
				);
				
				if(!$mail->newTemplateMsg("new-registration.txt",$hooks)) {
					$this->mail_failure = true;
				} else {
					if(!$mail->sendMail($this->clean_email,"New User")) {
						$this->mail_failure = true;
					}
				}
			} else {
				$this->user_active = 1;
			}	
	
	
			if(!$this->mail_failure){
				$Data = new Data;

				$Data->insertData("Member_Users", "", array("Email"=>$this->clean_email, "Password"=>$secure_pass, "ActivationToken"=>$this->activation_token, "LastActivationRequest"=>time(), "LostPasswordRequest"=>"0", "Active"=>$this->user_active, "Group_ID"=>"1", "SignUpDate"=>time(), "LastSignIn"=>"0", "User_Token"=>$this->user_token));
			}
		}
	}
}

?>