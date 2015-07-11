<?php 
$I = new AcceptanceTester($scenario);
$I->wantTo('quiero registrarme');
$I->amOnPage('/#/user');
$I->see('Registro de Usuario');
?>
