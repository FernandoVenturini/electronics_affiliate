// TechDeals Pro - Main Application Logic

class TechDealsApp {
    constructor() {
        this.products = [];
        this.blogPosts = [];
        this.comparisonItems = [];
        this.currentPage = 1;
        this.productsPerPage = 6;
        
        // Initialize the application
        this.init();
    }

    async init() {
        try {
            await this.loadInitialData();
            this.setupEventListeners();
            this.renderProducts();
            this.renderBlogPosts();
            this.initSocialSharing();
            console.log('TechDeals Pro initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    async loadInitialData() {
        // Sample product data (in a real app, this would come from an API)
        this.products = [
            {
                id: '1',
                name: 'Sony WH-1000XM5 Wireless Headphones',
                price: 399.99,
                originalPrice: 449.99,
                rating: 4.8,
                imageUrl: 'https://m.media-amazon.com/images/I/51FgbLyCYOL._AC_SX679_.jpg',
                affiliateLink: 'https://amazon.com/dp/B09XS7JWHH?tag=techdeals-20',
                description: 'Industry-leading noise canceling with Dual Noise Sensor technology',
                pros: ['Excellent noise cancellation', 'Long battery life', 'Premium build quality'],
                cons: ['Expensive', 'Touch controls can be sensitive'],
                category: 'audio',
                brand: 'Sony',
                features: {
                    'Battery Life': '30 hours',
                    'Noise Cancellation': 'Yes',
                    'Wireless': 'Bluetooth 5.2',
                    'Weight': '250g'
                }
            },
            {
                id: '2',
                name: 'Apple AirPods Pro (2nd Gen)',
                price: 249.99,
                originalPrice: 279.99,
                rating: 4.7,
                imageUrl: 'https://m.media-amazon.com/images/I/51R8U4qEfAL._AC_UY218_.jpg',
                affiliateLink: 'https://amazon.com/dp/B0BDHWDR12?tag=techdeals-20',
                description: 'Active Noise Cancellation with Adaptive Transparency',
                pros: ['Seamless Apple integration', 'Great sound quality', 'Comfortable fit'],
                cons: ['Only works best with Apple devices', 'Case can be slippery'],
                category: 'audio',
                brand: 'Apple',
                features: {
                    'Battery Life': '6 hours + 24 with case',
                    'Noise Cancellation': 'Yes',
                    'Wireless': 'Bluetooth 5.3',
                    'Weight': '5.3g each'
                }
            },
            {
                id: '3',
                name: 'Samsung Galaxy S24 Ultra',
                price: 1199.99,
                originalPrice: 1299.99,
                rating: 4.6,
                imageUrl: 'https://m.media-amazon.com/images/I/51rbUMgPs4L._AC_UY218_.jpg',
                affiliateLink: 'https://amazon.com/dp/B0CMDWC436?tag=techdeals-20',
                description: 'AI-powered smartphone with S Pen and 200MP camera',
                pros: ['Excellent camera system', 'S Pen functionality', 'Premium display'],
                cons: ['Very expensive', 'Large size may not suit everyone'],
                category: 'mobile',
                brand: 'Samsung',
                features: {
                    'Display': '6.8" Dynamic AMOLED',
                    'Camera': '200MP main',
                    'Storage': '256GB',
                    'RAM': '12GB'
                }
            },
            {
                id: '4',
                name: 'GoPro HERO12 Black',
                price: 399.99,
                originalPrice: 499.99,
                rating: 4.5,
                imageUrl: 'https://m.media-amazon.com/images/I/41Yf9ZT2pNL._AC_UY218_.jpg',
                affiliateLink: 'https://gopro.com/en/us/shop/cameras/hero12-black/CHDHX-121-master.html?pid=ClickBank',
                description: 'Waterproof action camera with 5.3K video recording',
                pros: ['Excellent stabilization', 'Waterproof design', 'Great for adventures'],
                cons: ['Battery life could be better', 'Small screen'],
                category: 'camera',
                brand: 'GoPro',
                features: {
                    'Video': '5.3K60 / 4K120',
                    'Photo': '27MP',
                    'Waterproof': '10m without housing',
                    'Stabilization': 'HyperSmooth 6.0'
                }
            },
            {
                id: '5',
                name: 'Philips Hue Smart Bulb Starter Kit',
                price: 99.99,
                originalPrice: 129.99,
                rating: 4.4,
                imageUrl: 'https://m.media-amazon.com/images/I/71LCviyY63L._AC_UL320_.jpg',
                affiliateLink: 'https://amazon.com/dp/B07354SP1C?tag=techdeals-20',
                description: 'Smart lighting system with 16 million colors',
                pros: ['Easy setup', 'Great app control', 'Works with voice assistants'],
                cons: ['Requires hub', 'Individual bulbs are expensive'],
                category: 'smart-home',
                brand: 'Philips',
                features: {
                    'Colors': '16 million',
                    'Brightness': '800 lumens',
                    'Connectivity': 'Zigbee',
                    'Voice Control': 'Alexa, Google, Siri'
                }
            },
            {
                id: '6',
                name: 'Logitech MX Master 3S Mouse',
                price: 99.99,
                originalPrice: 119.99,
                rating: 4.7,
                imageUrl: 'https://m.media-amazon.com/images/I/618IJzC-fFL._AC_UY218_.jpg',
                affiliateLink: 'https://amazon.com/dp/B09HM94VDS?tag=techdeals-20',
                description: 'Advanced wireless mouse for productivity',
                pros: ['Excellent ergonomics', 'Great battery life', 'Multi-device support'],
                cons: ['Expensive for a mouse', 'May be too large for some hands'],
                category: 'accessories',
                brand: 'Logitech',
                features: {
                    'DPI': '8000',
                    'Battery': '70 days',
                    'Connectivity': 'Bluetooth/USB-C',
                    'Buttons': '7 customizable'
                }
            }
        ];

        // Sample blog posts
        this.blogPosts = [
            {
                id: '1',
                title: 'Best Wireless Headphones of 2025: Complete Buyer\'s Guide',
                excerpt: 'Discover the top wireless headphones that offer the perfect balance of sound quality, comfort, and features for every budget.',
                publishDate: '2025-01-15',
                imageUrl: 'https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWRmb25lcyUyMHNlbSUyMGZpb3xlbnwwfHwwfHx8MA%3D%3D',
                category: 'Reviews',
                readTime: '8 min read'
            },
            {
                id: '2',
                title: 'Smart Home Setup Guide: Transform Your Home in 2025',
                excerpt: 'Learn how to create the perfect smart home ecosystem with the latest devices and automation tips.',
                publishDate: '2025-01-12',
                imageUrl: 'https://images.unsplash.com/photo-1556922404-e13d9ff95de8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8U21hcnQlMkJIb21lfGVufDB8fDB8fHww',
                category: 'Guides',
                readTime: '12 min read'
            },
            {
                id: '3',
                title: 'Photography Gear Essentials: What You Need to Get Started',
                excerpt: 'From cameras to accessories, here\'s everything you need to begin your photography journey.',
                publishDate: '2025-01-10',
                imageUrl: 'https://plus.unsplash.com/premium_photo-1661605966352-281ef38c55fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UGhvdG9ncmFwaHklMkJHZWFyfGVufDB8fDB8fHww',
                category: 'Guides',
                readTime: '10 min read'
            },
            {
                id: '4',
                title: 'Amazon vs ClickBank: Which Affiliate Program is Better?',
                excerpt: 'Compare the pros and cons of the two major affiliate programs for electronics marketers.',
                publishDate: '2025-01-08',
                imageUrl: 'https://images.unsplash.com/photo-1511548774318-563182fe8d03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QWZmaWxpYXRlJTJCQ29tcGFyaXNvbnxlbnwwfHwwfHx8MA%3D%3D',
                category: 'Business',
                readTime: '6 min read'
            },
            {
                id: '5',
                title: 'Mobile Photography Tips: Get Pro Results with Your Smartphone',
                excerpt: 'Master the art of mobile photography with these professional tips and techniques.',
                publishDate: '2025-01-05',
                imageUrl: 'https://plus.unsplash.com/premium_photo-1667055670863-ad8731824dbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TW9iaWxlJTJCUGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
                category: 'Tips',
                readTime: '7 min read'
            },
            {
                id: '6',
                title: 'Tech Trends 2025: What to Expect This Year',
                excerpt: 'Explore the biggest technology trends that will shape the electronics industry in 2025.',
                publishDate: '2025-01-01',
                imageUrl: 'https://plus.unsplash.com/premium_photo-1728457448731-abfd10761206?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGVjaCUyQlRyZW5kcyUyQjIwMjV8ZW58MHx8MHx8fDA%3D',
                category: 'News',
                readTime: '9 min read'
            }
        ];
    }

    setupEventListeners() {
        // Navigation and search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchProducts(e.target.value);
        });

        // Load more products
        document.getElementById('loadMoreProducts').addEventListener('click', () => {
            this.loadMoreProducts();
        });

        // Newsletter subscription
        document.getElementById('subscribeBtn').addEventListener('click', () => {
            this.subscribeNewsletter();
        });

        // Comparison clear
        document.getElementById('clearComparison').addEventListener('click', () => {
            this.clearComparison();
        });

        // Social sharing
        document.getElementById('shareTwitter').addEventListener('click', (e) => {
            e.preventDefault();
            this.shareOnSocial('twitter');
        });

        document.getElementById('shareFacebook').addEventListener('click', (e) => {
            e.preventDefault();
            this.shareOnSocial('facebook');
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    renderProducts() {
        const productGrid = document.getElementById('productGrid');
        const productsToShow = this.products.slice(0, this.currentPage * this.productsPerPage);
        
        productGrid.innerHTML = '';
        
        productsToShow.forEach(product => {
            const productCard = this.createProductCard(product);
            productGrid.appendChild(productCard);
        });

        // Hide load more button if all products are shown
        const loadMoreBtn = document.getElementById('loadMoreProducts');
        if (productsToShow.length >= this.products.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'card bg-base-100 shadow-xl product-card fade-in-up';
        
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        
        card.innerHTML = `
            <figure class="relative">
                <img src="${product.imageUrl}" alt="${product.name}" class="w-full h-48 object-cover">
                ${discount > 0 ? `<div class="badge badge-secondary absolute top-2 right-2">${discount}% OFF</div>` : ''}
            </figure>
            <div class="card-body">
                <h3 class="card-title text-lg">${product.name}</h3>
                <div class="flex items-center gap-2 mb-2">
                    <div class="rating-stars">
                        ${this.generateStars(product.rating)}
                    </div>
                    <span class="text-sm text-gray-600">(${product.rating})</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">${product.description}</p>
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2">
                        <span class="text-2xl font-bold text-primary">$${product.price}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="text-sm line-through text-gray-500">$${product.originalPrice}</span>` : ''}
                    </div>
                </div>
                <div class="card-actions justify-between">
                    <button class="btn btn-outline btn-sm" onclick="app.addToComparison('${product.id}')">
                        <i class="fas fa-balance-scale mr-1"></i>
                        Compare
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="app.viewProductDetails('${product.id}')">
                        <i class="fas fa-eye mr-1"></i>
                        View Details
                    </button>
                    <a href="${product.affiliateLink}" target="_blank" class="btn btn-accent btn-sm" onclick="app.trackClick('${product.affiliateLink}', '${product.id}')">
                        <i class="fas fa-shopping-cart mr-1"></i>
                        Buy Now
                    </a>
                </div>
            </div>
        `;
        
        return card;
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHTML = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star star"></i>';
        }
        
        // Half star
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt star"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star star empty"></i>';
        }
        
        return starsHTML;
    }

    renderBlogPosts() {
        const blogGrid = document.getElementById('blogGrid');
        
        this.blogPosts.forEach(post => {
            const blogCard = this.createBlogCard(post);
            blogGrid.appendChild(blogCard);
        });
    }

    createBlogCard(post) {
        const card = document.createElement('div');
        card.className = 'card bg-base-100 shadow-xl blog-card fade-in-up';
        
        const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        card.innerHTML = `
            <figure>
                <img src="${post.imageUrl}" alt="${post.title}" class="w-full h-48 object-cover">
            </figure>
            <div class="card-body">
                <div class="flex items-center gap-2 mb-2">
                    <div class="badge badge-outline">${post.category}</div>
                    <span class="text-sm text-gray-500">${post.readTime}</span>
                </div>
                <h3 class="card-title text-lg mb-2">${post.title}</h3>
                <p class="text-sm text-gray-600 mb-4">${post.excerpt}</p>
                <div class="card-actions justify-between items-center">
                    <span class="text-sm text-gray-500">${formattedDate}</span>
                    <button class="btn btn-primary btn-sm" onclick="app.readBlogPost('${post.id}')">
                        <i class="fas fa-arrow-right mr-1"></i>
                        Read More
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }

    loadMoreProducts() {
        this.currentPage++;
        this.renderProducts();
    }

    searchProducts(query) {
        if (!query.trim()) {
            this.renderProducts();
            return;
        }
        
        const filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase())
        );
        
        const productGrid = document.getElementById('productGrid');
        productGrid.innerHTML = '';
        
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<div class="col-span-full text-center py-8"><p class="text-gray-500">No products found matching your search.</p></div>';
            return;
        }
        
        filteredProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }

    addToComparison(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        // Check if already in comparison
        if (this.comparisonItems.find(item => item.productId === productId)) {
            this.showToast('Product already in comparison');
            return;
        }
        
        // Limit to 3 products for comparison
        if (this.comparisonItems.length >= 3) {
            this.showToast('Maximum 3 products can be compared');
            return;
        }
        
        this.comparisonItems.push({
            productId: productId,
            features: product.features,
            selected: true
        });
        
        this.renderComparisonTable();
        this.showToast('Product added to comparison');
    }

    removeFromComparison(productId) {
        this.comparisonItems = this.comparisonItems.filter(item => item.productId !== productId);
        this.renderComparisonTable();
        this.showToast('Product removed from comparison');
    }

    clearComparison() {
        this.comparisonItems = [];
        this.renderComparisonTable();
        this.showToast('Comparison cleared');
    }

    renderComparisonTable() {
        const comparisonTable = document.getElementById('comparisonTable');
        
        if (this.comparisonItems.length === 0) {
            comparisonTable.innerHTML = '<p class="text-center text-gray-500 py-8">Select products from reviews to compare them here</p>';
            return;
        }
        
        const products = this.comparisonItems.map(item => 
            this.products.find(p => p.id === item.productId)
        );
        
        // Get all unique features
        const allFeatures = new Set();
        this.comparisonItems.forEach(item => {
            Object.keys(item.features).forEach(feature => allFeatures.add(feature));
        });
        
        let tableHTML = `
            <table class="table table-zebra comparison-table">
                <thead>
                    <tr>
                        <th>Feature</th>
                        ${products.map(product => `
                            <th class="text-center">
                                <div class="flex flex-col items-center">
                                    <img src="${product.imageUrl}" alt="${product.name}" class="w-16 h-16 object-cover rounded mb-2">
                                    <span class="text-sm font-semibold">${product.name}</span>
                                    <span class="text-lg font-bold text-primary">$${product.price}</span>
                                    <button class="btn btn-xs btn-error mt-2" onclick="app.removeFromComparison('${product.id}')">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
        `;
        
        Array.from(allFeatures).forEach(feature => {
            tableHTML += `
                <tr>
                    <td class="font-semibold">${feature}</td>
                    ${products.map(product => {
                        const value = product.features[feature] || 'N/A';
                        return `<td class="text-center">${value}</td>`;
                    }).join('')}
                </tr>
            `;
        });
        
        tableHTML += `
                </tbody>
            </table>
        `;
        
        comparisonTable.innerHTML = tableHTML;
    }

    viewProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const modal = document.getElementById('productModal');
        const modalContent = document.getElementById('productModalContent');
        
        modalContent.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <img src="${product.imageUrl}" alt="${product.name}" class="w-full rounded-lg">
                </div>
                <div>
                    <h2 class="text-2xl font-bold mb-4">${product.name}</h2>
                    <div class="flex items-center gap-2 mb-4">
                        <div class="rating-stars">
                            ${this.generateStars(product.rating)}
                        </div>
                        <span class="text-sm text-gray-600">(${product.rating} stars)</span>
                    </div>
                    <p class="text-gray-600 mb-4">${product.description}</p>
                    
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-2 text-success">Pros:</h3>
                        <ul class="list-disc list-inside text-sm text-gray-600">
                            ${product.pros.map(pro => `<li>${pro}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="mb-6">
                        <h3 class="text-lg font-semibold mb-2 text-error">Cons:</h3>
                        <ul class="list-disc list-inside text-sm text-gray-600">
                            ${product.cons.map(con => `<li>${con}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <span class="text-3xl font-bold text-primary">$${product.price}</span>
                            ${product.originalPrice > product.price ? 
                                `<span class="text-lg line-through text-gray-500 ml-2">$${product.originalPrice}</span>` : ''}
                        </div>
                    </div>
                    
                    <div class="flex gap-2">
                        <button class="btn btn-outline flex-1" onclick="app.addToComparison('${product.id}')">
                            <i class="fas fa-balance-scale mr-2"></i>
                            Add to Compare
                        </button>
                        <a href="${product.affiliateLink}" target="_blank" class="btn btn-primary flex-1" onclick="app.trackClick('${product.affiliateLink}', '${product.id}')">
                            <i class="fas fa-shopping-cart mr-2"></i>
                            Buy Now
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        modal.showModal();
    }

    readBlogPost(postId) {
        // In a real application, this would navigate to the full blog post
        this.showToast('Blog post feature coming soon!');
    }

    async subscribeNewsletter() {
        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput.value.trim();
        
        if (!this.validateEmail(email)) {
            this.showToast('Please enter a valid email address', 'error');
            return;
        }
        
        const subscribeBtn = document.getElementById('subscribeBtn');
        const originalText = subscribeBtn.innerHTML;
        subscribeBtn.innerHTML = '<span class="loading-spinner"></span> Subscribing...';
        subscribeBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            this.showToast('Successfully subscribed to newsletter!', 'success');
            emailInput.value = '';
        } catch (error) {
            this.showToast('Subscription failed. Please try again.', 'error');
        } finally {
            subscribeBtn.innerHTML = originalText;
            subscribeBtn.disabled = false;
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    trackClick(affiliateLink, productId) {
        // Track affiliate link clicks for analytics
        console.log(`Affiliate click tracked: Product ${productId}, Link: ${affiliateLink}`);
        
        // In a real application, you would send this data to your analytics service
        try {
            // Example analytics tracking - check if gtag is available
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'affiliate_click', {
                    'product_id': productId,
                    'affiliate_link': affiliateLink
                });
            }
        } catch (error) {
            console.log('Analytics tracking error:', error);
        }
    }

    initSocialSharing() {
        // Initialize social media sharing functionality
        const currentUrl = window.location.href;
        const siteTitle = 'TechDeals Pro - Best Electronics Reviews & Deals';
        
        // Update social links with proper sharing URLs
        document.getElementById('shareTwitter').href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(siteTitle)}`;
        document.getElementById('shareFacebook').href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    }

    shareOnSocial(platform) {
        const currentUrl = window.location.href;
        const siteTitle = 'TechDeals Pro - Best Electronics Reviews & Deals';
        
        let shareUrl = '';
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(siteTitle)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }

    shareProduct(product, platform) {
        const productUrl = `${window.location.href}#product-${product.id}`;
        const shareText = `Check out this amazing deal: ${product.name} for just $${product.price}!`;
        
        let shareUrl = '';
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(shareText)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('successToast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        
        // Update toast styling based on type
        const alertDiv = toast.querySelector('.alert');
        alertDiv.className = `alert alert-${type}`;
        
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TechDealsApp();
});

// Export for module usage
export { TechDealsApp };