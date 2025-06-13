"use client"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const TermsOfService = () => {
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 bg-white">
      <div className="mb-8">
        <button onClick={() => router.back()} className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
      </div>

      <h1 className="text-3xl font-bold text-orange-600 mb-6">Terms and Conditions</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold mb-4">PURPOSE:</h2>
          <p className="mb-4">
            KANOONI KARWAYAHI is designed to serve as a preliminary medium of contact and exchange of information for
            its users, members, or visitors who have a genuine and bona fide intention to engage in contact for
            legitimate legal services, legal career enhancement, or knowledge sharing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">USE TO BE IN CONFORMITY WITH THE PURPOSE:</h2>
          <p className="mb-4">
            KANOONI KARWAYAHI (including related products and services, whether paid or not) is intended solely for the
            stated Purpose and for the exclusive use of the subscriber or registered user. Any act of copying,
            downloading, recreating, sharing passwords, sublicensing, or sharing in a manner not consistent with these
            terms is considered misuse of the platform, service, or product. KANOONI KARWAYAHI reserves the right to
            take appropriate action to protect its revenue, reputation, and interests, which may include suspending your
            access and pursuing legal action for damages. If you are found copying, misusing, or transmitting data,
            photographs, graphics, or other information on KANOONI KARWAYAHI for purposes other than the stated bona
            fide Purpose, we reserve the right to take any action deemed appropriate, including stopping access and
            seeking damages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">GENERAL SITE USE:</h2>
          <p className="mb-4">
            The site is a public site with free access. KANOONI KARWAYAHI assumes no liability for the authenticity or
            quality of responses you may receive. It is the responsibility of each user or entity to independently
            verify the genuineness of all responses and conduct their own background checks.
          </p>
          <p className="mb-4">
            You give us permission to use information about actions you take on KANOONI KARWAYAHI in connection with
            ads, offers, and other content (whether sponsored or not) displayed across our services, without any
            compensation to you. We use data and information about you to make relevant suggestions and recommendations
            to you and others.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">THIRD-PARTY LINKS:</h2>
          <p className="mb-4">
            The platform may contain links to third-party websites, provided solely for your convenience. The presence
            of these links does not imply endorsement of their content. If you choose to access these third-party
            websites, you do so at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">ACCURACY AND RESPONSIBILITY:</h2>
          <p className="mb-4">
            By using this platform, you agree to provide only true and accurate information. If you create a profile,
            you undertake to keep this information up to date. KANOONI KARWAYAHI is not responsible for inaccuracies in
            information provided by users, nor does it guarantee the confidentiality of information shared by users or
            posted on its website or related domains. Users are expected to further research any information presented
            on the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">PRIVACY AND DATA SHARING:</h2>
          <p className="mb-4">
            KANOONI KARWAYAHI does not share personally identifiable data of individuals with other companies/entities
            without obtaining consent, except with agents working on our behalf. We may share information in response to
            legal processes, such as court orders or subpoenas. You agree not to use the services in a manner that
            impairs the functioning or interests of KANOONI KARWAYAHI. You agree not to duplicate, download, publish,
            modify, or distribute material from KANOONI KARWAYAHI unless specifically authorized by us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Personal Use Only</h2>
          <p className="mb-4">
            Users undertake to use KANOONI KARWAYAHI solely for their personal, legitimate legal purposes. Using content
            from KANOONI KARWAYAHI for derivative works with a commercial motive without prior written consent from
            KANOONI KARWAYAHI is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">No Spam or Unsolicited Content</h2>
          <p className="mb-4">
            Users agree not to use the services offered by KANOONI KARWAYAHI to upload, post, email, transmit, or
            otherwise make available, either directly or indirectly, any unsolicited bulk email or unsolicited
            commercial email. KANOONI KARWAYAHI reserves the right to monitor, filter, and block emails sent using our
            servers to ensure adherence to International Best Practices in controlling and eliminating spam.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">No Excessive Posting or Spamming</h2>
          <p className="mb-4">
            Users agree not to spam or indiscriminately and repeatedly post content (such as job listings, legal
            opportunities, or marketing messages). Any violation of this clause may result in immediate termination of
            all services without notice and forfeiture of any fees paid.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Prohibited Content</h2>
          <p className="mb-4">
            Users shall not upload, post, transmit, publish, or distribute any material that is unlawful, harmful,
            threatening, abusive, harassing, defamatory, libelous, vulgar, obscene, racially or ethnically offensive, or
            otherwise objectionable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Accuracy of Information</h2>
          <p className="mb-4">
            Users expressly affirm that any resume, profile, or information they submit to KANOONI KARWAYAHI is correct,
            complete, and does not contain false, misleading, or manipulated data. KANOONI KARWAYAHI disclaims any
            liability arising from inaccurate or false information submitted by users. Further, users agree to indemnify
            KANOONI KARWAYAHI for all losses resulting from false, misleading, or otherwise objectionable information
            they provide.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Account and Transaction Security</h2>
          <p className="mb-4">
            Users are solely responsible for maintaining the confidentiality of their account credentials and for all
            activities conducted under their account. KANOONI KARWAYAHI does not assume any responsibility or liability
            for any misuse of credit/debit cards or other payment instruments used by the subscriber during online or
            offline transactions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Compliance with Applicable Laws</h2>
          <p className="mb-4">
            Users of KANOONI KARWAYAHI agree to comply with the Information Technology Act, 2000, and all associated
            rules, regulations, and guidelines while using the platform. Any violation of such laws will make the user
            solely responsible for the resulting civil or criminal liability.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Licenses and Intellectual Property Rights</h2>
          <p className="mb-4">
            Users are solely responsible for obtaining, at their own cost, all necessary licenses, permits, consents,
            approvals, and intellectual property rights required for their use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">User Representations, Warranties, and Restrictions</h2>
          <p className="mb-4">By using KANOONI KARWAYAHI, you represent, warrant, and agree that you will not:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>
              Access the platform for the purpose of extracting content to train any machine learning or AI model
              without prior written permission.
            </li>
            <li>Violate any applicable local, state, national, or international laws, statutes, or regulations.</li>
            <li>Interfere with or disrupt computer networks connected to KANOONI KARWAYAHI.</li>
            <li>
              Impersonate any other person or entity, or falsely claim employment by or affiliation with another person
              or entity.
            </li>
            <li>Forge headers or otherwise manipulate identifiers to disguise the origin of user information.</li>
            <li>
              Interfere with another user's use of KANOONI KARWAYAHI, including stalking, threatening, or harassing
              another user.
            </li>
            <li>Attempt to gain unauthorized access to the computer systems of others via KANOONI KARWAYAHI.</li>
            <li>
              Reproduce, copy, modify, sell, store, distribute, or otherwise exploit KANOONI KARWAYAHI or its content
              for commercial purposes without express written consent.
            </li>
            <li>
              Use the site or its content to create derivative works for commercial purposes without prior written
              consent.
            </li>
            <li>Use any device, software, or routine to interfere with the proper working of KANOONI KARWAYAHI.</li>
            <li>Impose an unreasonable or disproportionately large load on KANOONI KARWAYAHI's infrastructure.</li>
            <li>
              Spam KANOONI KARWAYAHI by indiscriminately and repeatedly posting content or forwarding mail that may be
              considered spam.
            </li>
            <li>Access data not intended for you or log into accounts you are not authorized to access.</li>
            <li>
              Reverse engineer, decompile, disassemble, decipher, or otherwise attempt to derive the source code for any
              part of the site.
            </li>
            <li>Engage in "framing," "mirroring," or otherwise simulating the appearance or function of the site.</li>
            <li>Probe, scan, or test the vulnerability of a system or network.</li>
            <li>Use automated or manual means to crawl or scrape content from KANOONI KARWAYAHI.</li>
            <li>Circumvent technological barriers that prevent automated crawling or scraping.</li>
            <li>Access KANOONI KARWAYAHI except through the interfaces provided.</li>
            <li>Attempt to breach security or authentication measures without proper authorization.</li>
            <li>Provide deep links to KANOONI KARWAYAHI without prior written permission.</li>
          </ul>
          <p className="mt-4 mb-4">Host, modify, upload, post, transmit, publish, or distribute material:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Without the necessary rights and licenses.</li>
            <li>
              That infringes on the rights of any third party (including copyright, trademark, patent, rights of privacy
              or publicity, or any other proprietary right).
            </li>
            <li>
              Containing viruses or malicious code intended to disrupt the functioning of KANOONI KARWAYAHI or others'
              systems.
            </li>
            <li>
              That is grossly harmful, harassing, invasive of privacy, hateful, disparaging, related to money laundering
              or otherwise unlawful.
            </li>
            <li>
              That may be seen as threatening, abusive, defamatory, vulgar, obscene, or racially or ethnically
              offensive.
            </li>
            <li>That encourages criminal conduct or violates applicable law.</li>
            <li>That misleads the recipient about the origin of the content or is grossly offensive or menacing.</li>
            <li>That belongs to another person and for which you lack appropriate rights.</li>
            <li>That harms minors in any way.</li>
            <li>
              That threatens India's unity, integrity, defence, security, or sovereignty; harms friendly relations with
              foreign states; or causes incitement to commit any cognizable offence or obstructs investigation of any
              offence or insults another nation.
            </li>
          </ul>
          <p className="mt-4 mb-4">
            You further agree not to sublicense, assign, or transfer any license granted to you by KANOONI KARWAYAHI,
            and acknowledge that any such attempt will be void.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Protection of Intellectual Property and Data Integrity</h2>
          <p className="mb-4">
            The User shall not infringe upon the intellectual property rights of any person or entity, nor shall they
            download or retain any information from any computer system with the intent to do so.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Operational Integrity and Liability Disclaimer</h2>
          <p className="mb-4">
            KANOONI KARWAYAHI (hereinafter referred to as "the Platform") will make its best efforts to ensure
            operational reliability. However, it does not warrant that its website or any of its affiliates or linked
            systems are free from operational errors, viruses, computer contaminants, worms, or other harmful
            components. User subscriptions are subject to usage quotas as applicable. Email addresses provided in
            contact details must be genuine and accessible only by authorized personnel.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Use of Official Email Domains</h2>
          <p className="mb-4">
            The Client must use only email addresses associated with an officially owned domain when registering
            sub-users or conducting activities on their account, including sending emails or posting jobs. Use of
            non-official domains is strictly prohibited, and violation may result in suspension or termination of
            services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Data Disclosure and Transactions</h2>
          <p className="mb-4">
            KANOONI KARWAYAHI shall not be liable for any losses due to inadvertent or otherwise disclosure of user
            information, including credit/debit card transactions. Users assume all risks associated with such
            disclosures.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Payments and Refunds</h2>
          <p className="mb-4">
            Payments for services are on a 100% advance basis. Refunds, if any, are at the sole discretion of KANOONI
            KARWAYAHI and are not guaranteed in terms of timelines or amounts. Server uptime or performance is not
            guaranteed and is on a best-effort basis, with liability limited to refund of the amount paid. Free services
            are not covered by any liability. KANOONI KARWAYAHI reserves the right to modify or change disclaimers or
            terms without prior notice. All relevant terms, whether mentioned or not, shall be deemed to apply.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Third-Party Services</h2>
          <p className="mb-4">
            For online courses provided by third-party providers (e.g., Sunrise Mentors Private Limited), any disputes
            post-subscription must be directed to the third party (contact@codingninjas.com) for resolution.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Scope of Service</h2>
          <p className="mb-4">
            Unless specified otherwise, the Platform's sole obligation is to provide access to its online portal for the
            duration of the subscription period. Any usage limits set forth do not constitute additional performance
            obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Set-Off Rights</h2>
          <p className="mb-4">
            KANOONI KARWAYAHI retains the right to set off any amounts payable by a user against any outstanding amounts
            owed by the user under any other agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Data Publication</h2>
          <p className="mb-4">
            KANOONI KARWAYAHI reserves the right to post user data on its site or affiliate sites as deemed appropriate,
            at no additional cost.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">No Exclusivity or Non-Poaching</h2>
          <p className="mb-4">
            The agreement between the Platform and the user is not a non-poach agreement nor should it be construed as
            such. KANOONI KARWAYAHI is a public site, and posted information enters the public domain unless
            specifically designated as private.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">No Agency</h2>
          <p className="mb-4">
            KANOONI KARWAYAHI is not an agent for any subscriber or user, and has no agents except those expressly
            listed on its homepage.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Legal Proceedings and Responsibility</h2>
          <p className="mb-4">
            KANOONI KARWAYAHI will not be a party to disputes between users or between users and third parties. If named
            in legal proceedings, costs will be recovered from the initiating party, though KANOONI KARWAYAHI will
            comply with valid court orders. The Platform operates from Noida, India, and makes no warranties about the
            appropriateness of its content in other locations. Users outside India are responsible for complying with
            their local laws, including export/import regulations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Spam and Malicious Content</h2>
          <p className="mb-4">
            KANOONI KARWAYAHI is not liable for spam or malicious content received through external emails or links to
            its site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Governing Law and Dispute Resolution</h2>
          <p className="mb-4">
            These Terms and Conditions are governed by the laws of the Republic of India. Any disputes shall be resolved
            by arbitration in New Delhi, India, under the Arbitration & Conciliation Act, 1996 (as amended). The
            decision of the arbitrator shall be final and binding. Exclusive jurisdiction for any other matters lies
            with the courts in New Delhi, India.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Indemnity</h2>
          <p className="mb-4">
            By accepting these Terms and Conditions, you agree to indemnify and hold harmless KANOONI KARWAYAHI, its
            directors, officers, employees, agents, subsidiaries, affiliates, and other partners from any damages or
            liabilities arising out of your use of the services, including but not limited to your submitted information
            or any related matter.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Goods and Services Tax (GST)</h2>
          <p className="mb-4">
            Any references to taxes herein shall include GST from the date of its implementation in India. Any
            additional tax liability due to GST or changes in tax rates will be recovered from the subscriber/user in
            addition to the agreed fees.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Privacy Policy and Compliance</h2>
          <p className="mb-4">
            The usage of KANOONI KARWAYAHI is also subject to the Privacy Policy available through the site's designated
            link. Non-compliance with these Terms or the Privacy Policy may result in termination of usage rights and
            removal of any offending information.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} KANOONI KARWAYAHI. All rights reserved.
      </div>
    </div>
  )
}

export default TermsOfService
