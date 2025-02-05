export function initMetia({ video, audio }, dom) {
    navigator.mediaDevices.getUserMedia({ video, audio })
            .then(stream => {
                console.log(stream);
                dom.srcObject = stream
            })
            .catch(error => {
                console.error('Error accessing media devices.', error);
            });
}