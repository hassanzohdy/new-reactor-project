import React from 'react';

export default function GoogleMap({width = 600, height = 450}) {
    return <iframe title="Map" src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.255336292073!2d39.16377798466168!3d21.614971772882125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d0af7cea0fa9%3A0x8312313a754cf493!2z2KfZhNmF2LfYudmFINin2YTZhdi12LHZiiDYp9mE2KzYr9mK2K8g2YTZhNmF2LTZiNmK2KfYqg!5e0!3m2!1sar!2seg!4v1595769607156!5m2!1sar!2seg`} width={width} height={height} frameBorder="0" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>;
}