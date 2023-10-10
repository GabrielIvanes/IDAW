<!DOCTYPE html>
<html>
    <head>
        <title>Cours PHP & MySQL</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="cours.css">
    </head>
    
    <body>
        <?php
            echo 'Hello World <br>';
            echo "Bonjour le Monde"; 
            define("N", 10);

            $prenoms = array('Mathilde', 'Pierre', 'Amandine', 'Florian');
            $ages = ['Mathilde' => 27, 'Pierre' => 29, 'Amandine' => 21];
            
            $mails['Mathilde'] = 'math@gmail.com';
            $mails['Pierre'] = 'pierre.giraud@edhec.com';
            $mails['Amandine'] = 'amandine@lp.fr';
            $age = 28;

             $suite = [
                [1, 2, 4, 8, 16],
                [1, 3, 9, 27, 81]
            ];

            echo $suite[0][1];

            $lengthArray = count($prenoms);
            echo "<br> age: ", $age;

            function helloWorld($chaine) {
                echo "<br/>$chaine";
            }

            $x = 0;

            function plus3(&$p) {
                $p += 3;
                echo "<br>Valeur dans la fonction : $p";
            }
           
            echo "<br/>Valeur en dehors de la fonction avant appel: $x";
            plus3($x);
            echo "<br/>Valeur en dehors de la fonction après appel: $x";

            function bonjour (...$prenoms) {
                foreach($prenoms as $prenom) {
                    echo "<br/>Bonjour $prenom.";
                }
            }

            function test2() {
                global $x;
                return "<br/>J'ai accès à x global: " .$x;
            }

            function test($a, $b) {
                echo "<br/>" .$a. " + " .$b. " = " .($a + $b);
            }

            test(4, 5);
            // test(4, "3Gabriel");

            bonjour("Gabriel", "Arthur", "Augustin");

            helloWorld("Hello World !");

            echo test2();

            setlocale(LC_TIME, 'fr_FR');
            date_default_timezone_set('Europe/Paris');
            echo "<br/>Date du jour: ",date('d/m/Y');
            echo "<br/>Heure: ",date('h:i:s');
          
        ?>
    </body>
</html>