import { FASHION_ITEMS } from "../data/content";
import DIYWorkshop from "../components/DIYWorkshop";
import PageSection from "../components/PageSection";

export default function FashionPage() {
  return (
    <div className="page-content">
      <PageSection title="Punk Fashion Essentials">
        <div className="fashion-grid">
          {FASHION_ITEMS.map((group, index) => (
            <div key={index} className="fashion-group">
              <h3>{group.category}</h3>
              <div>
                {group.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="fashion-item">
                    <span className="fashion-icon">{item.icon}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection title="DIY Workshop">
        <DIYWorkshop />
      </PageSection>
    </div>
  );
}
