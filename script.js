document.addEventListener('DOMContentLoaded', function() {
    // Show pricing on service card click
    function showPricing(service) {
        // Hide all pricing divs first
        document.querySelectorAll('.pricing').forEach(div => {
            div.style.display = 'none';
        });
        
        // Show the selected pricing
        document.getElementById(`${service}-pricing`).style.display = 'block';
    }
    
    // Make the showPricing function available globally
    window.showPricing = showPricing;
    
    // Blog functionality
    const addBlogBtn = document.getElementById('add-blog-btn');
    const blogFormContainer = document.getElementById('blog-form-container');
    const saveBlogBtn = document.getElementById('save-blog-btn');
    const blogsContainer = document.getElementById('blogs-container');
    
    // Load saved blogs from localStorage
    loadBlogs();
    
    addBlogBtn.addEventListener('click', function() {
        blogFormContainer.style.display = 'block';
    });
    
    saveBlogBtn.addEventListener('click', function() {
        const title = document.getElementById('blog-title').value.trim();
        const content = document.getElementById('blog-content').value.trim();
        
        if (title && content) {
            saveBlog(title, content);
            document.getElementById('blog-title').value = '';
            document.getElementById('blog-content').value = '';
            blogFormContainer.style.display = 'none';
            loadBlogs();
        } else {
            alert('Please enter both title and content for your blog.');
        }
    });
    
    function saveBlog(title, content) {
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        
        // Check if we're updating an existing blog
        const existingIndex = blogs.findIndex(blog => blog.title === title);
        
        if (existingIndex >= 0) {
            // Update existing blog
            blogs[existingIndex].content = content;
        } else {
            // Add new blog (with 2-blog limit)
            if (blogs.length >= 2) {
                blogs.shift(); // Remove the oldest blog
            }
            blogs.push({ title, content });
        }
        
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }
    
    function loadBlogs() {
        blogsContainer.innerHTML = '';
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        
        if (blogs.length === 0) {
            blogsContainer.innerHTML = '<p>No blogs yet. Add your first blog!</p>';
            addBlogBtn.style.display = 'block'; // Show button when no blogs
            return;
        }
        
        // Display blogs in reverse order (newest first)
        [...blogs].reverse().forEach(blog => {
            const blogElement = document.createElement('div');
            blogElement.className = 'blog-post';
            blogElement.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
                <button class="edit-blog-btn" data-title="${blog.title}">Edit</button>
            `;
            blogsContainer.appendChild(blogElement);
        });
        
        // Add event listeners to edit buttons
        document.querySelectorAll('.edit-blog-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const title = this.getAttribute('data-title');
                const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
                const blog = blogs.find(b => b.title === title);
                
                if (blog) {
                    document.getElementById('blog-title').value = blog.title;
                    document.getElementById('blog-content').value = blog.content;
                    blogFormContainer.style.display = 'block';
                }
            });
        });
        
        // Hide add button if 2 blogs already exist
        if (blogs.length >= 2) {
            addBlogBtn.style.display = 'none';
        } else {
            addBlogBtn.style.display = 'block';
        }
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Initially show all pricing hidden
    document.querySelectorAll('.pricing').forEach(div => {
        div.style.display = 'none';
    });
}); 
// JavaScript
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector("nav");

    toggleBtn.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});

    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            mobileMenuToggle.textContent = '☰';
        });
    });

