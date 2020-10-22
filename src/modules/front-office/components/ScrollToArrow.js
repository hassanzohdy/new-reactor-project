import React from 'react';
import ScrollTo from 'reactor/components/ScrollTo';

export default function ScrollToArrow({id = 'content'}) {
    return <ScrollTo className="down" id={id}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="36" height="26" viewBox="0 0 36 26">
            <image id="Layer_17" data-name="Layer 17" width="36" height="26" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAaCAYAAADfcP5FAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAJKADAAQAAAABAAAAGgAAAAAX18chAAACfklEQVRIDcWXPW/UQBCGfSiIOgUF/ASuQUhJQVrogO6ghQaKlAiRhoIuUSS6K0JDy0cZOnoKjiJIhJ8AxUlQA5GO5zU7d+P1ru1zIFlpbmd3ZmfGj8e2bvD95bX9oigerN5595X51MaPV9fPk3x8hp8byGc27p9WNeQekfsQGQ0gNHOFvEU/MVpGRYVYDSLkx4nR8lR8ATEhb/svtFJUfNKYkLf9c1o5Kj5pEyHvdyxabVR8ohShiXcIumgdhCtMmPNbLVRquVKEzhL+IfIUOZdI1YlWC5XfxH2GPEF++Rw1Qrwgj5AdnK4gH7xz0Ft7q4XKJ+Ksk2MLUWGVUSvIrDh/Qd9AtpCfth/mVeY9Eu8jF80mKshr1hK9ef1Qcl3oGrEPvMHryVvGgSPvRJIh6xfImt8P+pR5M+hj5rgQmdQr94h7qIUN4q6gVyilCH3E8bId0hwCXUVN0VIBbVQ2EsXoIt8jlZEiJAdVXTYdgSpXQLGXsInWOtI01Ct3OV+5PYFK9qERoVvItyiynrTHyCRBq6m3FCbbK8QyKtv4xU/wlL3bg9lsVuCoJpVT6ou/DK1eVMj7BtmE5rQsiEU5KGyEMkbUF/GYsJFrzEfBeZegSz8QnFFB5agUpJ2+tP6GW/wSR09QtlewzaksThVFrSAzEvAm+h5ywfbcnLw1ZudsU+NP8dPtmVOxc5qzBcm4LK2+VJTLRmNB5tSFFr76JuVeB41ULI/mTgXJkaLU6Gr4kdbRsE9L/CjLLdkr0fn5snNBdqKFlrlp7kzFH0p9Ory9ptOM+ts0RJ7XjIsNURnmGnfhVteWJuRDJGj1ouJjHqsgBXK9pWX5tpXSd/wB60g6YlTnTXcAAAAASUVORK5CYII=" />
        </svg>
    </ScrollTo>
}