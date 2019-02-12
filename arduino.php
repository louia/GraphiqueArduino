<?php
date_default_timezone_set('Europe/Paris');
// Ouvre un fichier pour lire un contenu existant
$current3 = file_get_contents('meteo.json');
$tempArray = json_decode($current3, true);
$nb=0;
foreach ($tempArray as $key => $value) {
    $date = new DateTime("now");
    $dateReleve= DateTime::createFromFormat('Y-m-d H:i',$value['date']);
    $interval = $date->diff($dateReleve);
    $nbheuredecalage = $interval->format('%H');
    $nbjourdecalage = $interval->format('%a') . "\n";
    //Supprime les enregistrement qui ont plus de 24heures
    if ($nbjourdecalage >=7) {
        \array_splice($tempArray, $key, 1);
    }
    
}

$datehour= date("Y-m-d H:i"); //FORMAT YYYY/DD/MM
$heure= date("H:i");
$data =array(
    'temp' => $_GET["temp"] ,
    'humidity' => $_GET["hum"],
     'date'=> $datehour,
     'heure'=>$heure
    );
$tempArray[]= $data;

$jsonData = json_encode($tempArray, JSON_PRETTY_PRINT);
file_put_contents('meteo.json', $jsonData);

echo "temp : " . $_GET["temp"] . "  * hum : " . $_GET["hum"];
