document.addEventListener('DOMContentLoaded', () => {
    // REEMPLAZAR ESTA URL CON LA QUE TE ENTREGA GOOGLE APPS SCRIPT
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwi7EJuiOe6-5cygAI01m_mrdQLRoAEH7isBl-JE3bJG5zb8jzCOiWo7507bKbJDptC/exec';

    const stepConsent = document.getElementById('step-consent');
    const stepDemographics = document.getElementById('step-demographics');
    const stepInstructions = document.getElementById('step-instructions');
    const stepBlock1 = document.getElementById('step-block-1');
    const stepTransition = document.getElementById('step-transition');
    const stepBlock2 = document.getElementById('step-block-2');
    const stepFinal = document.getElementById('step-final');
    const stepExit = document.getElementById('step-exit');

    const consentForm = document.getElementById('consentForm');
    const demographicsForm = document.getElementById('demographicsForm');
    const btnStartListening = document.getElementById('btn-start-listening');
    const evaluationForm1 = document.getElementById('evaluationForm1');
    const btnStartBlock2 = document.getElementById('btn-start-block2');
    const evaluationForm2 = document.getElementById('evaluationForm2');
    const btnSubmitFinal = document.getElementById('btn-submit-final');

    const fragmentCounter1 = document.getElementById('fragment-counter-1');
    const audioSource1 = document.getElementById('audioSource1');
    const audioPlayer1 = document.getElementById('audioPlayer1');

    const fragmentCounter2 = document.getElementById('fragment-counter-2');
    const audioSource2 = document.getElementById('audioSource2');
    const audioPlayer2 = document.getElementById('audioPlayer2');
    const authorshipBanner = document.getElementById('authorship-banner');
    const conexionLabel2 = document.getElementById('conexion-label-2');

    const participantData = {
        responsesBlock1: [],
        responsesBlock2: []
    };

    const playlist = [
        { id: 1, file: "G3_IA.wav", autoria: "IA", textoAutoria: "generado con inteligencia artificial" },
        { id: 2, file: "G1_H.wav", autoria: "Humana", textoAutoria: "creado por humanos" },
        { id: 3, file: "G5_H.wav", autoria: "Humana", textoAutoria: "creado por humanos" },
        { id: 4, file: "G2_IA.wav", autoria: "IA", textoAutoria: "generado con inteligencia artificial" },
        { id: 5, file: "G4_H.wav", autoria: "Humana", textoAutoria: "creado por humanos" },
        { id: 6, file: "G1_IA.wav", autoria: "IA", textoAutoria: "generado con inteligencia artificial" },
        { id: 7, file: "G3_H.wav", autoria: "Humana", textoAutoria: "creado por humanos" },
        { id: 8, file: "G5_IA.wav", autoria: "IA", textoAutoria: "generado con inteligencia artificial" },
        { id: 9, file: "G2_H.wav", autoria: "Humana", textoAutoria: "creado por humanos" },
        { id: 10, file: "G4_IA.wav", autoria: "IA", textoAutoria: "generado con inteligencia artificial" }
    ];

    let currentFragmentIndex = 0;

    // 1. Consentimiento
    consentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedOption = document.querySelector('input[name="consent"]:checked');
        if (!selectedOption) return;

        if (selectedOption.value === 'yes') {
            participantData.consent = true;
            stepConsent.classList.add('hidden');
            stepDemographics.classList.remove('hidden');
        } else {
            stepConsent.classList.add('hidden');
            stepExit.classList.remove('hidden');
        }
    });

    // 2. Datos demográficos
    demographicsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        participantData.edad = document.getElementById('edad').value;
        participantData.genero = document.getElementById('genero').value;
        participantData.formacionMusical = document.getElementById('formacion_musical').value;
        participantData.escuchaIA = document.getElementById('escucha_ia').value;

        stepDemographics.classList.add('hidden');
        stepInstructions.classList.remove('hidden');
    });

    // 3. Inicio del Bloque 1
    btnStartListening.addEventListener('click', () => {
        stepInstructions.classList.add('hidden');
        stepBlock1.classList.remove('hidden');
        loadFragmentBlock1(currentFragmentIndex);
    });

    function loadFragmentBlock1(index) {
        const item = playlist[index];
        fragmentCounter1.textContent = `Fragmento ${index + 1} de 10`;
        audioSource1.src = `audio/${item.file}`;
        audioPlayer1.load();
        evaluationForm1.reset();
    }

    // Evaluación Bloque 1
    evaluationForm1.addEventListener('submit', (event) => {
        event.preventDefault();

        const origen = document.querySelector('input[name="origen"]:checked').value;
        const agradable = document.querySelector('input[name="agradable"]:checked').value;
        const calmado = document.querySelector('input[name="calmado"]:checked').value;
        const conexion = document.querySelector('input[name="conexion"]:checked').value;

        participantData.responsesBlock1.push({
            fragmentoNumero: currentFragmentIndex + 1,
            archivo: playlist[currentFragmentIndex].file,
            origenPercibido: origen,
            agradable: parseInt(agradable),
            calmado: parseInt(calmado),
            conexionEmocional: parseInt(conexion)
        });

        currentFragmentIndex++;

        if (currentFragmentIndex < playlist.length) {
            loadFragmentBlock1(currentFragmentIndex);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            stepBlock1.classList.add('hidden');
            stepTransition.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // 4. Inicio del Bloque 2
    btnStartBlock2.addEventListener('click', () => {
        currentFragmentIndex = 0;
        stepTransition.classList.add('hidden');
        stepBlock2.classList.remove('hidden');
        loadFragmentBlock2(currentFragmentIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function loadFragmentBlock2(index) {
        const item = playlist[index];
        fragmentCounter2.textContent = `Fragmento ${index + 1} de 10`;
        audioSource2.src = `audio/${item.file}`;
        audioPlayer2.load();

        authorshipBanner.textContent = `Información de Autoría: Este fragmento fue ${item.textoAutoria}.`;
        conexionLabel2.textContent = `Sabiendo que este fragmento fue ${item.textoAutoria}, ¿qué tan fuerte es tu conexión emocional con él?`;

        if (index === playlist.length - 1) {
            btnSubmitFinal.textContent = "Finalizar Estudio";
        } else {
            btnSubmitFinal.textContent = "Siguiente Fragmento";
        }

        evaluationForm2.reset();
    }

    // Evaluación Bloque 2 y envío final
    evaluationForm2.addEventListener('submit', (event) => {
        event.preventDefault();

        const conexion2 = document.querySelector('input[name="conexion2"]:checked').value;

        participantData.responsesBlock2.push({
            fragmentoNumero: currentFragmentIndex + 1,
            archivo: playlist[currentFragmentIndex].file,
            autoriaReal: playlist[currentFragmentIndex].autoria,
            conexionEmocionalRevelada: parseInt(conexion2)
        });

        currentFragmentIndex++;

        if (currentFragmentIndex < playlist.length) {
            loadFragmentBlock2(currentFragmentIndex);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // Envío de datos a Google Sheets
            btnSubmitFinal.disabled = true;
            btnSubmitFinal.textContent = "Enviando respuestas...";

            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(participantData)
            })
            .then(() => {
                stepBlock2.classList.add('hidden');
                stepFinal.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Error al guardar datos:', error);
                stepBlock2.classList.add('hidden');
                stepFinal.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    });
});