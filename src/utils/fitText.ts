function fitTextToContainer(containerId: string): void {
    const container = document.getElementById(containerId) as HTMLElement;
    if (!container) {
        console.warn(`Element with id '${containerId}' not found.`);
        return;
    }
    
    const textElement = container.querySelector('.shrinking-text') as HTMLElement;
    if (!textElement) {
        console.warn(`Element with class 'shrinking-text' not found within #${containerId}`);
        return;
    }

    // Reset any previous scaling before measuring
    textElement.style.transform = 'scale(1)';
    
    const containerWidth = container.offsetWidth;
    const textWidth = textElement.offsetWidth;
    
    // Calculate the scale factor
    const scale = textWidth > containerWidth ? containerWidth / textWidth : 1;
    
    // Apply the scale factor
    textElement.style.transform = `scale(${scale})`;
}

// Call the function on page load
window.onload = () => fitTextToContainer('shrinkingTextContainer');
