'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqs: FAQ[] = [
    {
      category: 'ordering',
      question: 'How do I place an order?',
      answer: 'Simply browse our catalogue, select your desired items, add them to your cart, and proceed to checkout. We accept all major credit cards and PayPal for your convenience.'
    },
    {
      category: 'ordering',
      question: 'Can I modify or cancel my order?',
      answer: 'Yes, you can modify or cancel your order within 2 hours of placing it. After that, please contact our customer service for assistance with any changes.'
    },
    {
      category: 'ordering',
      question: 'What payment methods do you accept?',
      answer: 'We accept Visa, MasterCard, American Express, Discover, and PayPal. All transactions are secured with SSL encryption for your safety.'
    },
    {
      category: 'shipping',
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) is available for most items. International shipping may take 10-15 business days.'
    },
    {
      category: 'shipping',
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please contact us for specific information about your country.'
    },
    {
      category: 'shipping',
      question: 'How much does shipping cost?',
      answer: 'Shipping costs vary based on your location and order size. Standard shipping starts at $9.99 for orders under $100. Free shipping is available for orders over $250.'
    },
    {
      category: 'products',
      question: 'What materials are your furniture made from?',
      answer: 'We use high-quality materials including solid wood, genuine leather, premium fabrics, and durable metal hardware. Each product description lists specific materials used.'
    },
    {
      category: 'products',
      question: 'Do you offer custom furniture?',
      answer: 'Yes, we offer custom furniture options for many of our products. Please contact our design team to discuss your specific requirements, timeline, and pricing.'
    },
    {
      category: 'products',
      question: 'How do I care for my furniture?',
      answer: 'Care instructions vary by material. Wood furniture should be dusted regularly and treated with appropriate wood polish. Fabric items should be vacuumed and spot-cleaned as needed.'
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused items in original packaging. Custom orders are final sale. Please contact us to initiate a return and receive a return label.'
    },
    {
      category: 'returns',
      question: 'How do I return or exchange an item?',
      answer: 'To return an item, contact our customer service within 30 days of delivery. We\'ll provide a prepaid return label and process your refund or exchange upon receipt.'
    },
    {
      category: 'warranty',
      question: 'What warranty do you offer?',
      answer: 'All our furniture comes with a 2-year manufacturer\'s warranty covering defects in materials and workmanship. Extended warranty options are available at checkout.'
    },
    {
      category: 'warranty',
      question: 'Does the warranty cover assembly issues?',
      answer: 'The warranty covers manufacturing defects but does not cover damage from improper assembly. We provide detailed assembly instructions and video tutorials for all products.'
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click the "Register" button in the top navigation. Fill in your name, email, and create a password. Account creation takes less than a minute.'
    },
    {
      category: 'account',
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We use industry-standard SSL encryption for all data transmission. Your personal information is never shared with third parties without your explicit consent.'
    },
    {
      category: 'account',
      question: 'Can I track my order?',
      answer: 'Yes! Once logged in, you can track your order status in real-time through your account dashboard or by clicking the "Track Order" link in your confirmation email.'
    }
  ];

  const categories = ['all', 'ordering', 'shipping', 'products', 'returns', 'warranty', 'account'];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="section relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(44, 24, 16, 0.85), rgba(139, 69, 19, 0.75)), url('https://images.unsplash.com/photo-1586022076324-8b6e0c5e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-custom min-h-[40vh] flex items-center justify-center text-white">
          <div className="text-center space-y-6">
            <h1 className="hero-title text-white mb-6">
              Frequently Asked <span className="text-[var(--accent)]">Questions</span>
            </h1>
            <p className="hero-subtitle text-gray-100 max-w-2xl mx-auto text-lg md:text-xl">
              Find answers to common questions about our furniture, ordering, and services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section bg-gradient-to-br from-white to-[var(--light)]">
        <div className="container-custom py-8">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Filter by category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md mt-2">
                        {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          expandedItems.includes(index) ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                {expandedItems.includes(index) && (
                  <div className="px-6 pb-6 border-t border-gray-200">
                    <div className="pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our customer support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200"
                >
                  Contact Support
                </Link>
                <Link
                  href="/products"
                  className="bg-white hover:bg-gray-50 text-gray-900 font-medium px-6 py-3 rounded-md border border-gray-300 transition-colors duration-200"
                >
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
