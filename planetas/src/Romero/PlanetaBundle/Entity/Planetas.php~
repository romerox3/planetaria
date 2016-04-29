<?php

namespace Romero\PlanetaBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Planetas
 *
 * @ORM\Table(name="planetas")
 * @ORM\Entity(repositoryClass="Romero\PlanetaBundle\Repository\PlanetasRepository")
 */
class Planetas
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="nombre", type="string", length=50)
     */
    private $nombre;

    /**
     * @var string
     *
     * @ORM\Column(name="descripcion", type="text")
     */
    private $descripcion;

    /**
     * @var string
     *
     * @ORM\Column(name="imagen1", type="string", length=100)
     */
    private $imagen1;

    /**
     * @var string
     *
     * @ORM\Column(name="imagen2", type="string", length=100)
     */
    private $imagen2;

    /**
     * @var string
     *
     * @ORM\Column(name="simbolo", type="string", length=100)
     */
    private $simbolo;

    /**
     * @var string
     *
     * @ORM\Column(name="iOrbital", type="decimal", precision=10, scale=5)
     */
    private $iOrbital;

    /**
     * @var string
     *
     * @ORM\Column(name="iAxial", type="decimal", precision=10, scale=2)
     */
    private $iAxial;

    /**
     * @var string
     *
     * @ORM\Column(name="traslacion", type="decimal", precision=10, scale=2)
     */
    private $traslacion;

    /**
     * @var string
     *
     * @ORM\Column(name="velOrbMedia", type="decimal", precision=10, scale=5)
     */
    private $velOrbMedia;

    /**
     * @var string
     *
     * @ORM\Column(name="distSol", type="decimal", precision=10, scale=0)
     */
    private $distSol;

    /**
     * @var int
     *
     * @ORM\Column(name="afelio", type="integer")
     */
    private $afelio;

    /**
     * @var int
     *
     * @ORM\Column(name="perihelio", type="integer")
     */
    private $perihelio;

    /**
     * @var int
     *
     * @ORM\Column(name="diametro", type="integer")
     */
    private $diametro;

    /**
     * @var int
     *
     * @ORM\Column(name="circunferencia", type="integer")
     */
    private $circunferencia;

    /**
     * @var int
     *
     * @ORM\Column(name="superficie", type="integer")
     */
    private $superficie;

    /**
     * @var string
     *
     * @ORM\Column(name="masa", type="decimal", precision=10, scale=4)
     */
    private $masa;

    /**
     * @var int
     *
     * @ORM\Column(name="nSatelites", type="integer")
     */
    private $nSatelites;

    /**
     * @var int
     *
     * @ORM\Column(name="vEscape", type="integer")
     */
    private $vEscape;

    /**
     * @var string
     *
     * @ORM\Column(name="albedo", type="decimal", precision=10, scale=3)
     */
    private $albedo;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set nombre
     *
     * @param string $nombre
     * @return Planetas
     */
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get nombre
     *
     * @return string 
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set descripcion
     *
     * @param string $descripcion
     * @return Planetas
     */
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    /**
     * Get descripcion
     *
     * @return string 
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Set imagen1
     *
     * @param string $imagen1
     * @return Planetas
     */
    public function setImagen1($imagen1)
    {
        $this->imagen1 = $imagen1;

        return $this;
    }

    /**
     * Get imagen1
     *
     * @return string 
     */
    public function getImagen1()
    {
        return $this->imagen1;
    }

    /**
     * Set imagen2
     *
     * @param string $imagen2
     * @return Planetas
     */
    public function setImagen2($imagen2)
    {
        $this->imagen2 = $imagen2;

        return $this;
    }

    /**
     * Get imagen2
     *
     * @return string 
     */
    public function getImagen2()
    {
        return $this->imagen2;
    }

    /**
     * Set simbolo
     *
     * @param string $simbolo
     * @return Planetas
     */
    public function setSimbolo($simbolo)
    {
        $this->simbolo = $simbolo;

        return $this;
    }

    /**
     * Get simbolo
     *
     * @return string 
     */
    public function getSimbolo()
    {
        return $this->simbolo;
    }

    /**
     * Set iOrbital
     *
     * @param string $iOrbital
     * @return Planetas
     */
    public function setIOrbital($iOrbital)
    {
        $this->iOrbital = $iOrbital;

        return $this;
    }

    /**
     * Get iOrbital
     *
     * @return string 
     */
    public function getIOrbital()
    {
        return $this->iOrbital;
    }

    /**
     * Set iAxial
     *
     * @param string $iAxial
     * @return Planetas
     */
    public function setIAxial($iAxial)
    {
        $this->iAxial = $iAxial;

        return $this;
    }

    /**
     * Get iAxial
     *
     * @return string 
     */
    public function getIAxial()
    {
        return $this->iAxial;
    }

    /**
     * Set traslacion
     *
     * @param string $traslacion
     * @return Planetas
     */
    public function setTraslacion($traslacion)
    {
        $this->traslacion = $traslacion;

        return $this;
    }

    /**
     * Get traslacion
     *
     * @return string 
     */
    public function getTraslacion()
    {
        return $this->traslacion;
    }

    /**
     * Set velOrbMedia
     *
     * @param string $velOrbMedia
     * @return Planetas
     */
    public function setVelOrbMedia($velOrbMedia)
    {
        $this->velOrbMedia = $velOrbMedia;

        return $this;
    }

    /**
     * Get velOrbMedia
     *
     * @return string 
     */
    public function getVelOrbMedia()
    {
        return $this->velOrbMedia;
    }

    /**
     * Set distSol
     *
     * @param string $distSol
     * @return Planetas
     */
    public function setDistSol($distSol)
    {
        $this->distSol = $distSol;

        return $this;
    }

    /**
     * Get distSol
     *
     * @return string 
     */
    public function getDistSol()
    {
        return $this->distSol;
    }

    /**
     * Set afelio
     *
     * @param integer $afelio
     * @return Planetas
     */
    public function setAfelio($afelio)
    {
        $this->afelio = $afelio;

        return $this;
    }

    /**
     * Get afelio
     *
     * @return integer 
     */
    public function getAfelio()
    {
        return $this->afelio;
    }

    /**
     * Set perihelio
     *
     * @param integer $perihelio
     * @return Planetas
     */
    public function setPerihelio($perihelio)
    {
        $this->perihelio = $perihelio;

        return $this;
    }

    /**
     * Get perihelio
     *
     * @return integer 
     */
    public function getPerihelio()
    {
        return $this->perihelio;
    }

    /**
     * Set diametro
     *
     * @param integer $diametro
     * @return Planetas
     */
    public function setDiametro($diametro)
    {
        $this->diametro = $diametro;

        return $this;
    }

    /**
     * Get diametro
     *
     * @return integer 
     */
    public function getDiametro()
    {
        return $this->diametro;
    }

    /**
     * Set circunferencia
     *
     * @param integer $circunferencia
     * @return Planetas
     */
    public function setCircunferencia($circunferencia)
    {
        $this->circunferencia = $circunferencia;

        return $this;
    }

    /**
     * Get circunferencia
     *
     * @return integer 
     */
    public function getCircunferencia()
    {
        return $this->circunferencia;
    }

    /**
     * Set superficie
     *
     * @param integer $superficie
     * @return Planetas
     */
    public function setSuperficie($superficie)
    {
        $this->superficie = $superficie;

        return $this;
    }

    /**
     * Get superficie
     *
     * @return integer 
     */
    public function getSuperficie()
    {
        return $this->superficie;
    }

    /**
     * Set masa
     *
     * @param string $masa
     * @return Planetas
     */
    public function setMasa($masa)
    {
        $this->masa = $masa;

        return $this;
    }

    /**
     * Get masa
     *
     * @return string 
     */
    public function getMasa()
    {
        return $this->masa;
    }

    /**
     * Set nSatelites
     *
     * @param integer $nSatelites
     * @return Planetas
     */
    public function setNSatelites($nSatelites)
    {
        $this->nSatelites = $nSatelites;

        return $this;
    }

    /**
     * Get nSatelites
     *
     * @return integer 
     */
    public function getNSatelites()
    {
        return $this->nSatelites;
    }

    /**
     * Set vEscape
     *
     * @param integer $vEscape
     * @return Planetas
     */
    public function setVEscape($vEscape)
    {
        $this->vEscape = $vEscape;

        return $this;
    }

    /**
     * Get vEscape
     *
     * @return integer 
     */
    public function getVEscape()
    {
        return $this->vEscape;
    }

    /**
     * Set albedo
     *
     * @param string $albedo
     * @return Planetas
     */
    public function setAlbedo($albedo)
    {
        $this->albedo = $albedo;

        return $this;
    }

    /**
     * Get albedo
     *
     * @return string 
     */
    public function getAlbedo()
    {
        return $this->albedo;
    }
}
