function showContent(id) {
    // Hide all content elements
    const contentElements = document.querySelectorAll('[id^=content]');
    for (const content of contentElements) {
        content.style.display = 'none';
    }

    // Show the selected content element
    document.getElementById(id).style.display = 'block';
}