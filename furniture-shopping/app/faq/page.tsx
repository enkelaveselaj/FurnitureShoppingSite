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
          backgroundImage: "linear-gradient(135deg, rgba(44, 24, 16, 0.9), rgba(139, 69, 19, 0.8)), url('https://images.unsplash.com/photo-1586022076324-8b6e0c5e2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-custom min-h-[50vh] flex items-center justify-center text-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
          <div className="text-center space-y-6 relative z-10">
            <div className="inline-block mb-4">
              <span className="bg-[var(--accent)] text-white text-sm font-semibold px-6 py-2 rounded-full uppercase tracking-wider shadow-lg">
                Help Center
              </span>
            </div>
            <h1 className="hero-title text-white mb-6">
              Frequently Asked <span className="text-[var(--accent)]">Questions</span>
            </h1>
            <p className="hero-subtitle text-gray-100 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Find answers to common questions about our furniture, ordering, and services.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section bg-gradient-to-br from-white to-[var(--light)] py-20">
        <div className="container-custom py-8">
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Filter by category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-[var(--primary)] text-white shadow-lg hover:bg-[var(--secondary)]'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-[var(--accent)] hover:text-[var(--accent)]'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h3>
                        <span className="inline-block px-3 py-1 bg-[var(--light)] text-[var(--primary)] text-xs font-medium rounded-full mt-2">
                          {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <svg
                          className={`w-6 h-6 text-[var(--accent)] transition-transform duration-300 ${
                            expandedItems.includes(index) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

            <div className="mt-16 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] rounded-2xl shadow-2xl p-8 text-center text-white">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-100 mb-6">
                  Can't find the answer you're looking for? Our customer support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg"
                  >
                    Contact Support
                  </Link>
                  <Link
                    href="/products"
                    className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full border-2 border-white transition-colors duration-300"
                  >
                    Browse Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
