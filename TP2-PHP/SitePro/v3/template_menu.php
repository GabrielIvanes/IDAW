<?php

function renderMenuToHTML($currentPageId, $lang) {
   
    // Définition du tableau mymenu en fonction de la langue sélectionnée
    $lang === 'fr' ?  $mymenu = array(
    'accueil' => array( 'Accueil' ),
    'cv' => array( 'Cv' ),
    'projets' => array('Mes Projets'),
    'contact' => array('Contact')
    ) :  $mymenu = array(
    'home' => array( 'Home' ),
    'cv' => array( 'Cv' ),
    'projects' => array('My projects'),
    'contact' => array('Contact')
    );

    echo '<nav class="menu">
    <ul>';
    foreach($mymenu as $pageId => $pageParameters) {
        foreach($pageParameters as $pageParameters => $pageLabel) {
            if ($pageId === $currentPageId) {
                echo '<li><a href="index.php?page=' .$pageId. '&lang='.$lang.'" id="currentpage">' .$pageLabel. '</a></li>';
            } else {
                echo '<li><a href="index.php?page=' .$pageId.'&lang='.$lang.'">' .$pageLabel. '</a></li>';
            }
        }  
       
    }
    echo '</ul>
    </nav>';
}
?>