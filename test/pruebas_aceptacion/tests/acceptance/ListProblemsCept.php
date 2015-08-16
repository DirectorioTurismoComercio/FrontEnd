<?php 
$I = new AcceptanceTester($scenario);
$I->wantTo('Quiero ver el listado de problemas de usuario');
$I->amOnPage('/#/user/1/problem');

$I->waitForText('Titulo: Editar, edita',10);
$I->waitForText('Titulo: Ya funciona Editar - Super!',10);

$I->see('crear problema');