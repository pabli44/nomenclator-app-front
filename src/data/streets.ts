export interface Monument {
  id: string;
  name: string;
  description: string;
  period: string;
  image?: string;
}

export interface Street {
  id: string;
  name: string;
  period: string;
  description: string;
  history: string;
  latitude: number;
  longitude: number;
  imageBefore?: string;
  imageAfter?: string;
  monuments: Monument[];
}

export const streets: Street[] = [
  {
    id: '1',
    name: 'Calle de la Media Luna',
    period: 'Siglo XVII',
    description: 'Una de las calles más emblemáticas del Centro Histórico.',
    history:
      'La Calle de la Media Luna debe su nombre a la forma curva que describe su trazado, semejante a una luna en cuarto creciente. Durante la época colonial, esta calle albergó a importantes comerciantes y militares.',
    latitude: 10.423,
    longitude: -75.5504,
    monuments: [
      {
        id: 'm1',
        name: 'Casa del Marqués de Valdehoyos',
        description: 'Casona colonial del siglo XVIII con hermosa portada en piedra.',
        period: 'Siglo XVIII',
      },
      {
        id: 'm2',
        name: 'Iglesia de Santo Domingo',
        description: 'Una de las iglesias más antiguas de la ciudad, construida entre 1550 y 1570.',
        period: 'Siglo XVI',
      },
    ],
  },
  {
    id: '2',
    name: 'Calle del Arzobispado',
    period: 'Siglo XVI',
    description: 'Calle que conecta la Catedral con el Palacio Arzobispal.',
    history:
      'Esta calle ha sido testigo del desarrollo eclesiástico de Cartagena. Alberga algunas de las construcciones religiosas más importantes de la ciudad.',
    latitude: 10.4245,
    longitude: -75.5518,
    monuments: [
      {
        id: 'm3',
        name: 'Catedral de Cartagena',
        description: 'Catedral Basílica Metropolitana Santa Catalina de Alejandría.',
        period: 'Siglo XVI',
      },
    ],
  },
  {
    id: '3',
    name: 'Calle de la Factoría',
    period: 'Siglo XVIII',
    description: 'Calle comercial del periodo colonial español.',
    history:
      'La Calle de la Factoría albergó los principales almacenes y casas de comercio durante la época virreinal. Su nombre proviene de las factorías (almacenes) que allí se establecieron.',
    latitude: 10.4225,
    longitude: -75.5495,
    monuments: [
      {
        id: 'm4',
        name: 'Edificio de la Aduana',
        description: 'Antiguo edificio de la Real Aduana, hoy sede de la Alcaldía.',
        period: 'Siglo XVIII',
      },
    ],
  },
  {
    id: '4',
    name: 'Calle del Sargento Mayor',
    period: 'Siglo XVII',
    description: 'Calle residencial con hermosos balcones coloniales.',
    history:
      'Debe su nombre a un alto oficial militar que habitó en esta calle durante el siglo XVII. Conserva algunos de los mejores ejemplos de arquitectura doméstica colonial.',
    latitude: 10.4218,
    longitude: -75.5525,
    monuments: [
      {
        id: 'm5',
        name: 'Casa de Rafael Núñez',
        description: 'Antigua residencia del expresidente Rafael Núñez, hoy museo.',
        period: 'Siglo XIX',
      },
    ],
  },
  {
    id: '5',
    name: 'Calle de San Agustín',
    period: 'Siglo XVI',
    description: 'Una de las calles más antiguas, cerca del convento del mismo nombre.',
    history:
      'Esta calle conecta el convento de San Agustín con la plaza principal. Ha sido escenario de importantes eventos históricos y conserva su trazado original.',
    latitude: 10.4238,
    longitude: -75.553,
    monuments: [
      {
        id: 'm6',
        name: 'Convento de San Agustín',
        description: 'Antiguo convento agustino del siglo XVI, hoy sede de la Universidad de Cartagena.',
        period: 'Siglo XVI',
      },
    ],
  },
  {
    id: '6',
    name: 'Calle de la Universidad',
    period: 'Siglo XVIII',
    description: 'Calle que alberga la sede principal de la Universidad de Cartagena.',
    history:
      'La Calle de la Universidad debe su nombre a la Universidad de Cartagena, fundada en 1827. El edificio principal ocupa lo que fue el Convento de San Agustín.',
    latitude: 10.4242,
    longitude: -75.5535,
    monuments: [
      {
        id: 'm7',
        name: 'Universidad de Cartagena',
        description: 'Claustro principal de la Universidad, joya arquitectónica del siglo XVIII.',
        period: 'Siglo XVIII',
      },
    ],
  },
  {
    id: '7',
    name: 'Calle del Coliseo',
    period: 'Siglo XIX',
    description: 'Calle que albergó el antiguo teatro Coliseo de Cartagena.',
    history:
      'Esta calle fue el centro cultural de Cartagena durante el siglo XIX, cuando el Teatro Coliseo (hoy Teatro Heredia) era el epicentro de la vida artística.',
    latitude: 10.422,
    longitude: -75.5485,
    monuments: [
      {
        id: 'm8',
        name: 'Teatro Heredia',
        description: 'Teatro municipal, joya arquitectónica del neoclásico republicano.',
        period: 'Siglo XIX',
      },
    ],
  },
  {
    id: '8',
    name: 'Calle Larga',
    period: 'Siglo XVI',
    description: 'Una de las calles más extensas del Centro Histórico.',
    history:
      'La Calle Larga debe su nombre a su extenso recorrido, que atraviesa gran parte del Centro Histórico. Fue una de las primeras calles trazadas en la ciudad amurallada.',
    latitude: 10.4215,
    longitude: -75.551,
    monuments: [
      {
        id: 'm9',
        name: 'Bóvedas de la Muralla',
        description: 'Conjunto de bóvedas construidas en la muralla que servían como almacenes.',
        period: 'Siglo XVIII',
      },
    ],
  },
];
