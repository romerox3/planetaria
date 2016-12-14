<?php

namespace Romero\PlanetaBundle\Controller;

use Romero\PlanetaBundle\Entity\Planetas;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction()
    {
        return $this->render('::base.html.twig');
    }

    public function sistemaAction()
    {
        return $this->render('::sistema.html.twig');
    }

    public function comparadorAction()
    {
        return $this->render('::comparador.html.twig');
    }

    public function portfolioAction()
    {
        return $this->render('::portfolio.html.twig');
    }

    /**
     * @Route("/")
     */
    public function createAction()
    {
        $planet = new Planetas();
        $planet->setNombre('Jupiter');
        $planet->setDescripcion('');
        $planet->setSimbolo('img/simbJupiter.jpg');
        $planet->setimagen1('/img/jupiter.jpg');
        $planet->setimagen2('/img/jupiter2.jpg');
        $planet->setIOrbital('1.30530');
        $planet->setIAxial('3');
        $planet->setTraslacion('4329');
        $planet->setVelOrbMedia('13.0697');
        $planet->setDistSol('778');
        $planet->setAfelio('816');
        $planet->setPerihelio('740');
        $planet->setDiametro('142985');
        $planet->setCircunferencia('449197');
        $planet->setSuperficie('64000');
        $planet->setMasa('317.8');
        $planet->setNSatelites('64');
        $planet->setVEscape('210744');
        $planet->setAlbedo('0.52');


        $em = $this->getDoctrine()->getManager();
        $em->persist($planet);
        $em->flush();

        return new Response('Created product id ' . $planet->getId());
    }

    public function updateAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $product = $em->getRepository('RomeroPlanetaBundle:Planetas')->find($id);

        if (!$product) {
            throw $this->createNotFoundException(
                'No product found for id '.$id
            );
        }


        $product->setIOrbital('0.00005');
        $em->flush();

        return $this->redirect($this->generateUrl('indexA'));
    }


    public function verPlanetaAction($planeta)
    {

        $planet = $this->getDoctrine()
            ->getRepository('RomeroPlanetaBundle:Planetas')
            ->findByNombre($planeta);

        if (!$planet) {
            throw $this->createNotFoundException(
                'Planeta no encontrado'
            );
        }

            return $this->render('::indexPla.html.twig',
                array('planeta' => $planet));

        }
}

