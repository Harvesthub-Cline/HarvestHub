// Frontend API service
class HarvestHubAPI {
  constructor(baseURL = 'http://localhost:3000/api/v1') {
    this.baseURL = baseURL;
  }

  async getHomepageData() {
    try {
      const response = await fetch(`${this.baseURL}/homepage`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      return null;
    }
  }

  async getAboutData() {
    try {
      const response = await fetch(`${this.baseURL}/about`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching about data:', error);
      return null;
    }
  }

  async getHowItWorksData() {
    try {
      const response = await fetch(`${this.baseURL}/how-it-works`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching how-it-works data:', error);
      return null;
    }
  }

  async signUp(userData) {
    try {
      const response = await fetch(`${this.baseURL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error during signup:', error);
      return null;
    }
  }

  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      return await response.json();
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    }
  }
}

// Example usage
const api = new HarvestHubAPI();

// Load homepage data
api.getHomepageData().then(data => {
  if (data && data.status === 'success') {
    // Update homepage with data
    document.getElementById('hero-title').textContent = data.data.hero.title;
    document.getElementById('hero-subtitle').textContent = data.data.hero.subtitle;
    
    // Render tutorial categories
    const categoriesContainer = document.getElementById('tutorial-categories');
    data.data.tutorialCategories.forEach(category => {
      const categoryCard = `
        <div class="category-card">
          <i class="${category.icon}"></i>
          <h3>${category.name}</h3>
          <p>${category.description}</p>
          <span class="badge">${category.tutorialCount} tutorials</span>
        </div>
      `;
      categoriesContainer.innerHTML += categoryCard;
    });
  }
});